#!/usr/bin/env python3
"""获取微博热搜榜并生成按小时归档的 Markdown 文件。"""

from __future__ import annotations

import os
import sys
from datetime import datetime
from pathlib import Path
from urllib.parse import quote
from zoneinfo import ZoneInfo

import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry


WEIBO_API_URL = "https://weibo.com/ajax/statuses/hot_band"
REQUEST_TIMEOUT = int(os.getenv("WEIBO_REQUEST_TIMEOUT", "20"))
CHINA_TZ = ZoneInfo("Asia/Shanghai")
REPOSITORY_ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = Path(
    os.getenv(
        "WEIBO_OUTPUT_DIR",
        str(REPOSITORY_ROOT / "source" / "toplist" / "data"),
    )
)


def china_now() -> datetime:
    """返回北京时间，避免云端运行器使用 UTC 生成错误文件名。"""
    return datetime.now(CHINA_TZ)


def create_http_session() -> requests.Session:
    """创建带有限重试的 HTTP 会话。"""
    session = requests.Session()
    session.trust_env = os.getenv("WEIBO_PROXY_MODE", "direct").lower() == "system"

    proxy = os.getenv("WEIBO_PROXY", "").strip()
    if proxy:
        session.proxies.update({"http": proxy, "https": proxy})

    retries = Retry(
        total=3,
        connect=3,
        read=3,
        backoff_factor=2,
        status_forcelist=(429, 500, 502, 503, 504),
        allowed_methods=("GET",),
    )
    session.mount("https://", HTTPAdapter(max_retries=retries))
    return session


def get_weibo_hot() -> list[dict[str, object]]:
    """从微博接口获取热搜榜前 50 名。"""
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/126.0.0.0 Safari/537.36"
        ),
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
        "Referer": "https://weibo.com/",
    }

    with create_http_session() as session:
        response = session.get(WEIBO_API_URL, headers=headers, timeout=REQUEST_TIMEOUT)
        response.raise_for_status()
        payload = response.json()

    band_list = payload.get("data", {}).get("band_list")
    if not isinstance(band_list, list) or not band_list:
        raise RuntimeError("微博接口没有返回有效的 band_list 数据")

    hot_items: list[dict[str, object]] = []
    for rank, item in enumerate(band_list[:50], 1):
        title = str(item.get("note", "")).strip()
        if not title:
            continue
        hot_items.append(
            {
                "rank": rank,
                "title": title,
                "hot": str(item.get("num", "")).strip(),
                "link": f"https://s.weibo.com/weibo?q=%23{quote(title, safe='')}%23",
            }
        )

    if not hot_items:
        raise RuntimeError("微博接口返回的热搜项目全部为空")
    return hot_items


def save_to_file(hot_items: list[dict[str, object]], captured_at: datetime) -> Path:
    """将热搜数据保存为 UTF-8 Markdown 文件。"""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    output_file = OUTPUT_DIR / f"WB_Top_{captured_at:%Y%m%d_%H}.md"

    lines = [
        "# 微博热搜榜",
        "",
        f"**更新时间**: {captured_at:%Y-%m-%d %H:%M:%S}",
        "",
        "---",
        "",
        "## 热搜榜 Top 50",
        "",
    ]
    for item in hot_items:
        hot = f" ({item['hot']})" if item["hot"] else ""
        lines.append(f"{item['rank']}. [{item['title']}]({item['link']}){hot}")

    lines.extend(
        [
            "",
            "---",
            "",
            f"**总计**: {len(hot_items)} 条热搜",
            "**数据来源**: 微博热搜榜",
            "",
        ]
    )
    output_file.write_text("\n".join(lines), encoding="utf-8", newline="\n")
    return output_file


def main() -> int:
    try:
        captured_at = china_now()
        hot_items = get_weibo_hot()
        output_file = save_to_file(hot_items, captured_at)
        print(f"成功获取 {len(hot_items)} 条热搜")
        print(f"文件已保存到 {output_file}")
        return 0
    except Exception as exc:
        print(f"获取微博热搜失败：{exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())

---
title: OpenClaw Telegram 解决方案
description: "针对 OpenClaw Telegram Bot 无响应和 health 检查失败问题，分析 ClashX、代理规则和 OpenClaw 配置并给出修复方案。"
categories: "AI"
tags:
  - "OpenClaw"
  - "Telegram Bot"
  - "ClashX"
  - "代理配置"
top: 0
abbrlink: 202603116759
date: 2026-03-11 10:46:39
---

# 解决 OpenClaw Telegram Bot 连接问题完整方案

## 📋 问题背景

在使用 OpenClaw 配置 Telegram Bot 时，用户遇到 Bot 无响应的问题。具体表现为：
- 给 Bot 发送 `/start` 命令无反应
- `openclaw health` 显示 `Telegram: failed (unknown) - This operation was aborted`
- 网络环境受限，需要通过代理访问 Telegram API

## 🔍 问题分析

经过诊断，发现以下关键问题：

### 1. ClashX 代理服务配置问题
- ClashX 进程在运行，API 可访问 (`127.0.0.1:9090`)
- 系统代理已设置为 `127.0.0.1:7890` (`networksetup -getwebproxy Wi-Fi` 确认)
- 但代理连接测试失败：`curl -x http://127.0.0.1:7890` 返回 "Connection reset by peer"

### 2. ClashX 规则配置不全
- 现有配置包含 `telegram.org` 规则
- **缺少 `api.telegram.org` 规则**，导致 Telegram Bot API 无法通过代理访问

### 3. OpenClaw 配置问题
- Telegram 配置中 `groupPolicy` 为 "allowlist" 但 `groupAllowFrom` 为空
- 缺少代理环境变量配置
- 有时以 root 用户运行导致网关令牌认证失败

### 4. 网络环境限制
- 所在网络环境无法直接访问 Telegram API
- 必须通过代理服务器中转

## 🛠️ 完整解决方案

### 步骤 1：修复 ClashX 代理连接

```bash
# 1. 完全重启 ClashX
killall ClashX 2>/dev/null
open -a ClashX

# 2. 等待 ClashX 完全启动（检查菜单栏图标）
sleep 5

# 3. 通过 API 检查状态
curl -s http://127.0.0.1:9090/proxies | grep -o '"now":"[^"]*"' | head -5

# 4. 切换到一个可用的代理节点（如香港07）
curl -X PUT -H "Content-Type: application/json" -d '{"name":"香港07"}' http://127.0.0.1:9090/proxies/节点选择
```

### 步骤 2：添加 Telegram API 规则到 ClashX 配置

编辑 ClashX 配置文件，添加 `api.telegram.org` 规则：

```bash
# 备份配置文件
cp ~/.config/clash/饿饭cc云-A计划（10GB）.yaml ~/.config/clash/饿饭cc云-A计划（10GB）.yaml.backup

# 快速添加命令（在 Telegram 规则部分添加 api.telegram.org）
sed -i '' '/telegram.org,节点选择/a\
 - DOMAIN-SUFFIX,api.telegram.org,节点选择' ~/.config/clash/饿饭cc云-A计划（10GB）.yaml
```

**配置文件位置：** `~/.config/clash/饿饭cc云-A计划（10GB）.yaml`

### 步骤 3：为 OpenClaw 配置代理

#### 方案 A：环境变量（推荐）
```bash
# 设置代理环境变量
export HTTP_PROXY="http://127.0.0.1:7890"
export HTTPS_PROXY="http://127.0.0.1:7890"
export ALL_PROXY="socks5://127.0.0.1:7891"

# 永久配置（添加到 ~/.zshrc）
echo 'export HTTP_PROXY="http://127.0.0.1:7890"' >> ~/.zshrc
echo 'export HTTPS_PROXY="http://127.0.0.1:7890"' >> ~/.zshrc
source ~/.zshrc
```

#### 方案 B：OpenClaw 配置（如果支持）
```bash
# 如果 OpenClaw 支持代理配置
openclaw config set network.proxy "http://127.0.0.1:7890"

# 或直接编辑 Telegram 频道配置
openclaw config set channels.telegram.proxy "http://127.0.0.1:7890"
```

### 步骤 4：修复 OpenClaw Telegram 配置

```bash
# 添加 groupAllowFrom 到 Telegram 配置（解决警告）
python3 -c "
import json
with open('/Users/xyli/.openclaw/openclaw.json', 'r') as f:
    data = json.load(f)

if 'channels' in data and 'telegram' in data['channels']:
    data['channels']['telegram']['groupAllowFrom'] = ['5975504516']
    
    with open('/Users/xyli/.openclaw/openclaw.json', 'w') as f:
        json.dump(data, f, indent=2)
    print('Configuration updated successfully')
"
```

### 步骤 5：重启并验证

```bash
# 1. 重启 OpenClaw 网关
openclaw gateway restart

# 2. 等待 15 秒后检查状态
sleep 15 && openclaw health

# 3. 查看 Telegram 连接日志
openclaw logs | grep -i "telegram\\|connected\\|failed" | tail -20

# 4. 测试代理连接（使用环境变量）
env HTTP_PROXY="http://127.0.0.1:7890" HTTPS_PROXY="http://127.0.0.1:7890" \
  curl -s "https://api.telegram.org/botTOKEN/getMe"
```

## 🔧 故障排除

| 问题 | 解决方案 |
|------|----------|
| **ClashX 菜单栏无响应** | 点击菜单栏 ClashX 图标 → 确保"设置为系统代理"已开启 |
| **代理测试仍失败** | 尝试 ClashX 菜单 → 模式 → 切换为"全局模式"测试 |
| **OpenClaw 仍显示 failed** | 检查 OpenClaw 日志：`openclaw logs \| grep -A10 -B10 telegram` |
| **环境变量未生效** | 重启终端或执行 `exec $SHELL` |
| **规则未生效** | 重启 ClashX 并清除 DNS 缓存：`sudo dscacheutil -flushcache` |
| **网关令牌认证失败** | 不要以 root 用户运行 OpenClaw，使用普通用户权限 |

## 📋 验证清单

1. **ClashX 状态验证**
   - [ ] 菜单栏图标显示代理已启用
   - [ ] `curl -s http://127.0.0.1:9090` 返回 `{"hello":"clash"}`

2. **代理连接验证**
   - [ ] `env HTTP_PROXY=... curl https://httpbin.org/ip` 返回代理服务器 IP（非本地）
   - [ ] `curl -x ... https://www.google.com` 能够访问

3. **Telegram API 验证**
   - [ ] `curl -x ... https://api.telegram.org/botTOKEN/getMe` 返回 `{"ok":true,...}`

4. **OpenClaw 健康验证**
   - [ ] `openclaw health` 显示 `Telegram: connected`
   - [ ] `openclaw doctor` 无 Telegram 相关警告

5. **Bot 功能验证**
   - [ ] 发送 `/start` 给 Bot，收到欢迎消息
   - [ ] Bot 能够响应其他命令

## 💡 重要提示

### 1. ClashX 配置要点
- 确保使用的是正确的配置文件：`饿饭cc云-A计划（10GB）.yaml`
- 如果"规则模式"不行，临时切换为"全局模式"测试
- 定期更新订阅确保节点可用

### 2. OpenClaw 运行要点
- **不要以 root 用户运行**：OpenClaw 设计在普通用户权限下运行
- 每次修改配置后必须重启：`openclaw gateway restart`
- 检查网关令牌配置：`gateway.auth.token` 必须正确设置

### 3. 网络环境要点
- 确保没有其他代理工具冲突（如 VPN、其他代理软件）
- 检查防火墙设置，确保端口 7890 和 9090 可访问
- 如果使用企业网络，可能需要额外配置

### 4. 配置文件位置
- **OpenClaw 配置**：`/Users/xyli/.openclaw/openclaw.json`
- **ClashX 配置**：`/Users/xyli/.config/clash/饿饭cc云-A计划（10GB）.yaml`
- **环境变量**：`~/.zshrc` 或 `~/.bash_profile`

## 🔄 操作顺序总结

1. **重启 ClashX** → 确保代理服务正常运行
2. **添加 API 规则** → 确保 `api.telegram.org` 可通过代理访问
3. **设置环境变量** → 为 OpenClaw 配置代理
4. **修复 OpenClaw 配置** → 添加 `groupAllowFrom` 字段
5. **重启 OpenClaw** → 应用所有配置更改
6. **全面验证** → 按照验证清单检查每个环节

## 📞 进一步帮助

如果按照本方案操作后问题仍未解决：

1. **查看详细日志**
   ```bash
   # ClashX 日志（通过菜单栏查看）
   # OpenClaw 详细日志
   openclaw logs --level debug | grep -i telegram
   ```

2. **检查网络连通性**
   ```bash
   # 测试基础网络
   ping api.telegram.org
   # 测试代理连接
   curl -v --proxy http://127.0.0.1:7890 https://api.telegram.org
   ```

3. **重置配置**
   ```bash
   # 备份后重置 OpenClaw 配置
   cp ~/.openclaw/openclaw.json ~/.openclaw/openclaw.json.backup
   openclaw reset
   ```

4. **寻求社区帮助**
   - OpenClaw 官方文档：`openclaw docs`
   - GitHub Issues：相关项目的问题页面
   - 技术社区讨论

---

**最后更新：** 2026年3月9日  
**适用环境：** macOS (Darwin 23.1.0)  
**软件版本：** OpenClaw 2026.3.8, ClashX 最新版  
**作者：** iFlow CLI 助手

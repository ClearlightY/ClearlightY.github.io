---
title: Git Bash Gemini 代理配置说明
top: 0
abbrlink: 202603289138
date: 2026-03-28 20:53:54
categories: #根据文章去分类
tags: #根据文章给出对应Tag
---

﻿# 在 Git Bash 中为 Gemini 持久配置代理

## 背景

在 Git Bash 中使用 Gemini 时，如果每次打开终端都要手动执行以下命令：

```bash
export http_proxy="http://127.0.0.1:10808"
export https_proxy="http://127.0.0.1:10808"
export HTTP_PROXY="http://127.0.0.1:10808"
export HTTPS_PROXY="http://127.0.0.1:10808"
```

说明当前代理环境变量只是临时生效，并没有写入 Git Bash 的启动配置文件。

## 问题原因

你执行 `source ~/.bashrc` 时出现下面的报错：

```bash
bash: /c/Users/12531/.bashrc: No such file or directory
```

这并不是代理配置有问题，而是因为当前用户目录下还没有 `.bashrc` 文件。

## 解决方案

### 1. 创建 `~/.bashrc`

在 Git Bash 中执行：

```bash
cat > ~/.bashrc <<'EOF'
export http_proxy="http://127.0.0.1:10808"
export https_proxy="http://127.0.0.1:10808"
export HTTP_PROXY="http://127.0.0.1:10808"
export HTTPS_PROXY="http://127.0.0.1:10808"
EOF
```

这一步会在当前用户目录下创建 `.bashrc` 文件，并把代理配置写进去。

### 2. 立即加载配置

继续执行：

```bash
source ~/.bashrc
```

执行后，当前窗口就会立刻使用这些代理环境变量。

### 3. 验证是否生效

可以用以下命令检查：

```bash
echo $http_proxy
```

如果输出如下内容，则表示配置成功：

```bash
http://127.0.0.1:10808
```

## 建议补充配置

为了让 Git Bash 在登录场景下也稳定加载 `.bashrc`，建议再创建一个 `~/.bash_profile`：

```bash
cat > ~/.bash_profile <<'EOF'
if [ -f ~/.bashrc ]; then
  . ~/.bashrc
fi
EOF
```

这样做的好处是：

- 新开的 Git Bash 窗口通常会自动加载代理配置
- 不需要每次手动执行 `export`
- 配置集中在 `.bashrc` 中，后续维护更方便

## 最终效果

完成以上设置后，Gemini 在 Git Bash 中运行时就会自动带上代理，不需要每次手动输入：

```bash
export http_proxy="http://127.0.0.1:10808"
```

## 相关文件说明

- `~/.bashrc`：用于保存每次启动 shell 时需要加载的环境变量
- `~/.bash_profile`：用于在登录 shell 中加载 `.bashrc`

在你的 Windows 环境中，这两个文件通常对应：

- `/c/Users/12531/.bashrc`
- `/c/Users/12531/.bash_profile`

## 总结

如果 Gemini 需要通过本地代理访问网络，最稳妥的做法是把代理变量写入 Git Bash 的启动文件，而不是每次手动执行 `export`。你这次报错的根本原因只是 `.bashrc` 文件还不存在，创建后即可正常使用。

---
title: OpenClaw 配置 Deepseek 3.2 模型指南
description: "详细说明在 OpenClaw 中配置 Deepseek 3.2 模型、API 密钥、提供商参数、默认模型和验证步骤。"
categories: "AI"
tags:
  - "OpenClaw"
  - "Deepseek"
  - "API配置"
  - "AI模型"
top: 0
abbrlink: 202603111916
date: 2026-03-11 10:46:39
---

## 📋 概述

本文档详细介绍如何在 OpenClaw 中配置 Deepseek 3.2 模型，包括 `deepseek-chat`（非思考模式）和 `deepseek-reasoner`（思考模式）。通过本指南，您可以将 OpenClaw 的默认模型从 openrouter 切换为原生的 Deepseek API。

## 🎯 前提条件

- OpenClaw 已安装并正常运行
- 有效的 Deepseek 账户
- 网络连接正常（如需代理，已正确配置）

## 🔑 第一步：获取 Deepseek API 密钥

1. 访问 [Deepseek 平台](https://platform.deepseek.com/api_keys)
2. 注册/登录您的账户
3. 点击"创建新的 API 密钥"
4. 复制生成的 API 密钥（格式：`sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`）
5. 妥善保存密钥，不要泄露给他人

## ⚙️ 第二步：修改 OpenClaw 配置文件

配置文件位置：`/Users/xyli/.openclaw/openclaw.json`

### 2.1 备份当前配置（推荐）

```bash
cp /Users/xyli/.openclaw/openclaw.json /Users/xyli/.openclaw/openclaw.json.backup.$(date +%Y%m%d)
```

### 2.2 添加 Deepseek 提供商配置

在 `models.providers` 部分添加以下配置：

```json
"deepseek": {
  "baseUrl": "https://api.deepseek.com",
  "api": "openai-completions",
  "apiKey": "sk-您的Deepseek API密钥",  // 替换为您的实际密钥
  "models": [
    {
      "id": "deepseek-chat",
      "name": "DeepSeek-V3.2 Chat",
      "reasoning": false,
      "input": ["text"],
      "cost": {
        "input": 0,
        "output": 0,
        "cacheRead": 0,
        "cacheWrite": 0
      },
      "contextWindow": 128000,
      "maxTokens": 8192
    },
    {
      "id": "deepseek-reasoner",
      "name": "DeepSeek-V3.2 Reasoner",
      "reasoning": true,
      "input": ["text"],
      "cost": {
        "input": 0,
        "output": 0,
        "cacheRead": 0,
        "cacheWrite": 0
      },
      "contextWindow": 128000,
      "maxTokens": 8192
    }
  ]
}
```

### 2.3 添加 Deepseek 认证配置

在 `auth.profiles` 部分添加：

```json
"deepseek:default": {
  "provider": "deepseek",
  "mode": "api_key"
}
```

### 2.4 修改默认模型配置

#### 更新 `agents.defaults.model`：

```json
"model": {
  "primary": "deepseek/deepseek-chat",
  "fallbacks": [
    "deepseek/deepseek-reasoner",
    "kimi-coding/k2p5",
    "qwen-portal/coder-model",
    "qwen-portal/vision-model"
  ]
}
```

#### 更新 `agents.defaults.models`：

```json
"deepseek/deepseek-chat": {
  "alias": "DeepSeek Chat"
},
"deepseek/deepseek-reasoner": {
  "alias": "DeepSeek Reasoner"
}
```

#### 更新 `agents.list`：

```json
"list": [
  {
    "id": "main",
    "model": "deepseek/deepseek-chat"
  }
]
```

### 2.5 移除 openrouter 配置

从以下位置移除所有 `openrouter/` 和 `vercel-ai-gateway/` 相关条目：
- `agents.defaults.model.fallbacks`
- `agents.defaults.models`

## 🔧 第三步：使用脚本自动配置（可选）

如果您希望快速应用所有更改，可以使用以下 Python 脚本：

```python
#!/usr/bin/env python3
import json
import sys

# 读取当前配置
with open('/Users/xyli/.openclaw/openclaw.json', 'r') as f:
    config = json.load(f)

# 1. 添加 deepseek 提供商
deepseek_provider = {
    "baseUrl": "https://api.deepseek.com",
    "api": "openai-completions",
    "apiKey": "sk-您的Deepseek API密钥",  # 替换为实际密钥
    "models": [
        {
            "id": "deepseek-chat",
            "name": "DeepSeek-V3.2 Chat",
            "reasoning": False,
            "input": ["text"],
            "cost": {"input": 0, "output": 0, "cacheRead": 0, "cacheWrite": 0},
            "contextWindow": 128000,
            "maxTokens": 8192
        },
        {
            "id": "deepseek-reasoner",
            "name": "DeepSeek-V3.2 Reasoner",
            "reasoning": True,
            "input": ["text"],
            "cost": {"input": 0, "output": 0, "cacheRead": 0, "cacheWrite": 0},
            "contextWindow": 128000,
            "maxTokens": 8192
        }
    ]
}

config["models"]["providers"]["deepseek"] = deepseek_provider

# 2. 添加 deepseek 认证配置
config["auth"]["profiles"]["deepseek:default"] = {
    "provider": "deepseek",
    "mode": "api_key"
}

# 3. 修改 agents.defaults.model
fallbacks = config["agents"]["defaults"]["model"]["fallbacks"]
new_fallbacks = []
for fb in fallbacks:
    if not fb.startswith("openrouter/") and not fb.startswith("vercel-ai-gateway/"):
        new_fallbacks.append(fb)
new_fallbacks.insert(0, "deepseek/deepseek-reasoner")
config["agents"]["defaults"]["model"]["fallbacks"] = new_fallbacks
config["agents"]["defaults"]["model"]["primary"] = "deepseek/deepseek-chat"

# 4. 修改 agents.defaults.models
models = config["agents"]["defaults"]["models"]
keys_to_remove = []
for key in models.keys():
    if key.startswith("openrouter/") or key.startswith("vercel-ai-gateway/"):
        keys_to_remove.append(key)
for key in keys_to_remove:
    del models[key]

models["deepseek/deepseek-chat"] = {"alias": "DeepSeek Chat"}
models["deepseek/deepseek-reasoner"] = {"alias": "DeepSeek Reasoner"}

# 5. 修改 agents.list[0].model
config["agents"]["list"][0]["model"] = "deepseek/deepseek-chat"

# 写回文件
with open('/Users/xyli/.openclaw/openclaw.json', 'w') as f:
    json.dump(config, f, indent=2)

print("Deepseek 配置已成功添加。请将 apiKey 替换为您的实际密钥。")
```

## ✅ 第四步：验证配置

### 4.1 重启 OpenClaw 网关

```bash
openclaw gateway restart
```

### 4.2 检查模型列表

```bash
openclaw models list
```

预期输出应包含：
- `deepseek/deepseek-chat` (DeepSeek Chat)
- `deepseek/deepseek-reasoner` (DeepSeek Reasoner)

### 4.3 测试模型连接

```bash
# 测试 deepseek-chat
openclaw agent --model deepseek/deepseek-chat --message "Hello" --dry-run

# 测试 deepseek-reasoner
openclaw agent --model deepseek/deepseek-reasoner --message "请解决这个数学问题：1+1=?" --dry-run
```

### 4.4 检查健康状态

```bash
openclaw health
```

确保所有组件状态正常。

## 🔍 第五步：故障排除

### 问题 1：认证失败

**症状**：`401 Unauthorized` 或 `Invalid API key`

**解决方案**：
1. 检查 API 密钥是否正确
2. 确认密钥是否有访问权限
3. 重新生成 API 密钥并更新配置

### 问题 2：连接超时

**症状**：`Connection timeout` 或 `Network error`

**解决方案**：
1. 检查网络连接
2. 如果使用代理，确保代理配置正确
3. 检查 Telegram 配置中的代理设置：

```json
"telegram": {
  "proxy": "http://127.0.0.1:7890"  // 确保此地址与您的代理一致
}
```

### 问题 3：模型未找到

**症状**：`Model not found` 或 `Unknown model`

**解决方案**：
1. 确认模型 ID 拼写正确：`deepseek-chat` 或 `deepseek-reasoner`
2. 重启 OpenClaw 网关：`openclaw gateway restart`
3. 检查配置文件格式是否正确

### 问题 4：配置未生效

**解决方案**：
1. 确认配置文件路径正确：`/Users/xyli/.openclaw/openclaw.json`
2. 检查 JSON 格式是否正确（可使用 `jq` 验证）
3. 重启 OpenClaw 服务

## 📝 第六步：使用说明

### 6.1 模型选择

- **常规对话**：使用 `deepseek-chat`（非思考模式）
- **复杂推理**：使用 `deepseek-reasoner`（思考模式）

### 6.2 命令行使用

```bash
# 使用 deepseek-chat
openclaw agent --model deepseek/deepseek-chat --message "你的问题"

# 使用 deepseek-reasoner
openclaw agent --model deepseek/deepseek-reasoner --message "复杂推理问题"
```

### 6.3 模型切换

如果需要临时切换模型，可以使用 `--model` 参数：

```bash
openclaw agent --model deepseek/deepseek-reasoner --message "请分析这个代码..."
```

## ⚠️ 注意事项

### 7.1 安全性

- **不要**将 API 密钥提交到版本控制系统
- **不要**在公共场合分享配置文件
- 定期轮换 API 密钥

### 7.2 成本管理

- Deepseek API 可能有使用限制或费用
- 监控 API 使用情况
- 设置使用限额（如适用）

### 7.3 网络配置

- 如果在中国大陆使用，可能需要配置代理
- 确保代理规则包含 `api.deepseek.com`
- 测试网络连接：`curl -v https://api.deepseek.com`

### 7.4 备份策略

- 定期备份配置文件
- 使用版本控制管理配置变更
- 记录重要的配置修改

## 🔄 恢复原始配置

如果需要恢复之前的配置：

```bash
# 从备份恢复
cp /Users/xyli/.openclaw/openclaw.json.backup.deepseek /Users/xyli/.openclaw/openclaw.json

# 重启网关
openclaw gateway restart
```

## 📞 支持与帮助

如果遇到问题：

1. 检查 OpenClaw 日志：`openclaw logs`
2. 查看 Deepseek API 文档：[https://api-docs.deepseek.com/](https://api-docs.deepseek.com/)
3. 在 OpenClaw 社区寻求帮助

---

**文档版本**：1.0  
**最后更新**：2026年3月10日  
**适用版本**：OpenClaw 2026.3.8  
**配置文件路径**：`/Users/xyli/.openclaw/openclaw.json`
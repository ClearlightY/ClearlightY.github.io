---
title: Hexo 静态博客框架使用教程
top: 0
abbrlink: 202603101900
date: 2026-03-10 19:00:00
categories: Hexo
tags: 教程
---


## 1. 简介

Hexo 是一个快速、简洁且高效的静态博客框架，基于 Node.js 开发。它使用 Markdown（或其他标记语言）解析文章，并生成静态网页，可以轻松部署到 GitHub Pages、Netlify、Vercel 等平台。

**优点**：
- 生成速度快
- 支持 Markdown
- 丰富的主题和插件
- 一键部署

## 2. 环境准备

### 2.1 安装 Node.js
Hexo 基于 Node.js，因此需要先安装 Node.js（建议使用 LTS 版本）。

1. 访问 [Node.js 官网](https://nodejs.org/zh-cn/) 下载安装包。
2. 运行安装程序，按默认选项安装即可。
3. 安装完成后，打开命令行（CMD 或 PowerShell），检查是否安装成功：
   ```bash
   node -v
   npm -v
   ```
   如果显示版本号，说明安装成功。

### 2.2 安装 Git
Git 用于版本控制和部署。

1. 访问 [Git 官网](https://git-scm.com/) 下载安装包。
2. 按默认选项安装。
3. 安装完成后，检查是否安装成功：
   ```bash
   git --version
   ```

## 3. 安装 Hexo

在命令行中执行以下命令，全局安装 Hexo 命令行工具：

```bash
npm install -g hexo-cli
```

安装完成后，检查版本：

```bash
hexo -v
```

## 4. 初始化博客

1. 选择一个目录作为博客的根目录，例如 `D:\Blog`。
2. 在命令行中进入该目录，执行初始化命令：
   ```bash
   hexo init myblog
   ```
   这会在当前目录下创建一个名为 `myblog` 的文件夹，并自动生成博客的初始文件。
3. 进入博客目录：
   ```bash
   cd myblog
   ```
4. 安装依赖：
   ```bash
   npm install
   ```

## 5. 目录结构说明

初始化后的目录结构如下：

```
myblog/
├── _config.yml       # 站点配置文件
├── package.json      # 项目依赖配置
├── scaffolds/        # 模板文件夹
├── source/           # 资源文件夹
│   ├── _posts/       # 文章目录
│   └── _drafts/      # 草稿目录
├── themes/           # 主题文件夹
└── public/           # 生成的静态文件（执行生成命令后出现）
```

## 6. 配置站点

编辑 `_config.yml` 文件，配置博客的基本信息。

```yaml
# Site
title: 我的博客
subtitle: 欢迎来到我的博客
description: 这是一个使用 Hexo 搭建的静态博客
keywords: 博客, Hexo, 静态网站
author: 你的名字
language: zh-CN
timezone: Asia/Shanghai

# URL
url: https://yourname.github.io
root: /
permalink: :year/:month/:day/:title/
permalink_defaults:
pretty_urls:
  trailing_index: true
  trailing_html: true

# Deployment
deploy:
  type: git
  repo: https://github.com/yourname/yourname.github.io.git
  branch: main
```

**注意**：`deploy` 部分用于部署到 GitHub Pages，需要提前创建好仓库。

## 7. 创建文章和页面

### 7.1 创建新文章
使用以下命令创建一篇新文章：

```bash
hexo new "文章标题"
```

该命令会在 `source/_posts` 目录下生成一个 Markdown 文件，文件名格式为 `文章标题.md`。

打开该文件，可以看到 Front‑Matter 和内容区域：

```markdown
---
title: 文章标题
date: 2026-03-10 14:00:00
tags:
---
这里是文章内容，使用 **Markdown** 语法编写。
```

### 7.2 创建页面
如果需要创建“关于”、“归档”等独立页面，可以使用：

```bash
hexo new page "about"
```

这会在 `source/about` 目录下生成 `index.md` 文件，编辑该文件即可。

## 8. 生成静态文件

编写完文章后，执行以下命令生成静态文件：

```bash
hexo generate
# 或简写
hexo g
```

生成的静态文件会保存在 `public` 目录中。

## 9. 本地预览

在部署之前，可以在本地启动一个服务器预览博客：

```bash
hexo server
# 或简写
hexo s
```

默认访问地址为 `http://localhost:4000`。在浏览器中打开该地址，即可查看博客效果。

## 10. 部署到 GitHub Pages

### 10.1 创建 GitHub 仓库
1. 登录 GitHub，创建一个名为 `你的用户名.github.io` 的仓库（例如 `yourname.github.io`）。
2. 仓库必须设置为 public。

### 10.2 配置部署信息
在 `_config.yml` 中已经配置了 `deploy` 部分，确保 `repo` 填写正确。

### 10.3 安装部署插件
在博客目录下执行：

```bash
npm install hexo-deployer-git --save
```

### 10.4 执行部署
```bash
hexo deploy
# 或简写
hexo d
```

该命令会将 `public` 目录中的内容推送到 GitHub 仓库的指定分支（默认为 `main`）。

### 10.5 访问博客
部署完成后，等待几分钟，即可通过 `https://你的用户名.github.io` 访问你的博客。

## 11. 主题安装与配置

Hexo 有丰富的主题可供选择，例如 Next、Butterfly、Matery 等。

### 11.1 下载主题
以 Next 主题为例，在博客目录下执行：

```bash
git clone https://github.com/theme-next/hexo-theme-next themes/next
```

### 11.2 启用主题
修改 `_config.yml` 中的 `theme` 字段：

```yaml
theme: next
```

### 11.3 配置主题
每个主题都有自己的配置文件，通常位于 `themes/next/_config.yml`。根据主题文档进行配置。

## 12. 常用命令总结

| 命令 | 说明 |
|------|------|
| `hexo init [folder]` | 初始化博客 |
| `hexo new "标题"` | 创建新文章 |
| `hexo new page "页面名"` | 创建新页面 |
| `hexo generate` | 生成静态文件 |
| `hexo server` | 启动本地服务器 |
| `hexo deploy` | 部署到远程仓库 |
| `hexo clean` | 清除缓存和已生成的文件 |
| `hexo list` | 列出所有可用命令 |

**常用组合**：
- 本地写作并预览：`hexo new "标题"` → 编辑文章 → `hexo s`
- 生成并部署：`hexo g -d` 或 `hexo d -g`

## 13. 故障排除

### 13.1 端口占用
如果 `hexo server` 提示端口 4000 被占用，可以指定其他端口：

```bash
hexo s -p 5000
```

### 13.2 部署失败
- 检查 `_config.yml` 中的 `deploy` 配置是否正确。
- 确保已安装 `hexo-deployer-git` 插件。
- 检查 Git 仓库的权限（SSH 或 HTTPS）。

### 13.3 主题不生效
- 执行 `hexo clean` 后重新生成。
- 检查 `theme` 名称是否与主题文件夹名称一致。

### 13.4 图片无法显示
将图片放在 `source/images` 目录下，在文章中引用：

```markdown
![图片说明](/images/图片文件名.jpg)
```

## 14. 进阶功能

- **插件系统**：Hexo 有丰富的插件，可以扩展功能，如搜索、评论、SEO 优化等。
- **自定义模板**：修改 `scaffolds` 中的模板文件，定制新文章的默认结构。
- **多语言支持**：在 `_config.yml` 中配置 `language`，并在主题中启用多语言。

## 15. 资源推荐

- [Hexo 官方文档](https://hexo.io/zh-cn/docs/)
- [Hexo 主题列表](https://hexo.io/themes/)
- [Markdown 语法指南](https://www.markdownguide.org/)

---

**Happy Blogging！** 🚀
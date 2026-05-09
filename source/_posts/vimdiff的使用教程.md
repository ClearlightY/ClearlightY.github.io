---
title: vimdiff的使用教程
description: "介绍 vimdiff 的文件对比启动方式、窗口切换、分割调整和常用差异比较操作。"
categories: "开发工具"
tags:
  - "vimdiff"
  - "Vim"
  - "文件对比"
  - "命令行"
top: 0
abbrlink: 21655
date: 2020-05-21 13:52:13
---

# 1. 使用方法

```shell
$ vimdiff file_left file right

// 左右竖屏
$ vimdiff -d file_left file_right

// 上下竖屏
$ vimdiff -o file_left file_right
```



除了上面三种方法外, 还可以先启动一个文件, 然后通过`ex模式`的打开另一个文件进行对比

```shell
$ vim file_left

:vertical diffsplit file_right
```



交换两个窗口的位置或者改变窗口的分割方式, 可以使用下面命令

1. Ctrl+w	K (把当前窗口移到最上边)

2. Ctrl+


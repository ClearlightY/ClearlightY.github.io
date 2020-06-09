---
title: vimdiff的使用教程
top: 0
categories: Linux
tags: vim
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


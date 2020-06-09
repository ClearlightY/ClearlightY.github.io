---
title: 获取PC已连接过wifi密码的方法
top: 0
categories: skill
tags: win10
abbrlink: 59758
date: 2020-06-09 13:52:19
---

win10系统打开cmd命令窗口
打开方式:
- win+r打开运行后, 输入cmd
- win键,直接输入cmd

打开命令提示符窗口后, 按照下面命令操作
- 输入查看连接过的WiFi命令，输入：`netsh wlan show profile`
- 选择要查看的WiFi的密码，输入：`netsh wlan show profile name="wifi名称" key=clear`

![image-20200609135418660](https://gitee.com/clearlightY/mapdepot/raw/master/img/20200609135427.png)

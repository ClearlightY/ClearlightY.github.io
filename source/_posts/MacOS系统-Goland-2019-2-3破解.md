---
title: MacOS系统 Goland 2019.2.3破解
top: 0
categories: 资源分享
tags: JetBrains产品激活
abbrlink: 407cdecb
date: 2021-06-01 18:27:28
---

# MacOS系统 Goland 2019.2.3破解

## 1. 软件下载

下载地址：<https://www.jetbrains.com/go/download/other.html>
![官網下載界面](https://gitee.com/clearlightY/mapdepot/raw/master/img/20210601183011.png)


## 2. 破解步骤

破解Jar包下载地址：<https://clearlight.lanzoui.com/i5v6p8f>

将Jar包保存到一个位置中（配置后就不要随意更改这个文件的位置了）。

打开安装好的Goland，先免费体验，进入软件后，` Click IDE menu "Help" -> "Edit Custom VM Options..."`

如图，将破解Jar包的绝对路径按照`-javaagent:绝对路径`写在文件最后
![Goland_Vm Options界面](https://gitee.com/clearlightY/mapdepot/raw/master/img/20210601183019.png)


> Ps：如果破解Jar包路径填错或者Jar包文件位置有变动都会导致Goland软件无法打开。不要慌，Goland的vm options文件/User/用户`名/Library/Preferences/GoLand2019.2`位置中，打开文件后编辑正确的Jar包路径或者删除刚刚配置的`-javaagent:绝对路径`软件即可正常打开。
>
> ![Mac中Vm Options位置](MacOS%E7%B3%BB%E7%BB%9F-Goland-2019-2-3%E7%A0%B4%E8%A7%A3.assets/20210528000938654.png)


配置好后，重启Goland，如图进行配置。License server address：`http://fls.jetbrains-agent.com`

![選擇License server激活](https://gitee.com/clearlightY/mapdepot/raw/master/img/20210601183022.png)


Active后，即可激活成功～
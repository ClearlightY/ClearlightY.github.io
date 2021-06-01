---
title: Mac配置Go环境
top: 0
categories: Skill
tags: Mac_Go
abbrlink: f058495d
date: 2021-06-01 21:06:50
---

# Mac配置Go环境

## 1. 下载并安装Go

下载地址：<https://golang.org/dl/>

![官網下載界面](https://gitee.com/clearlightY/mapdepot/raw/master/img/20210601210758.png)

安装后Go位置：users/local/go
![Go的安裝位置](https://gitee.com/clearlightY/mapdepot/raw/master/img/20210601210808.png)



## 2. 配置环境变量

如图，进入用户主目录，查看隐藏文件，直接`vim .bash_profile`
![配置環境變量](https://gitee.com/clearlightY/mapdepot/raw/master/img/20210601210812.png)

按`i`键进入编辑模式，复制下面内容后粘贴后，`:wq`保存并退出

```properties
export GOPATH=/Users/lcore/dev/code/go
  
export GOBIN=$GOPATH/binexport

PATH=$PATH:$GOBIN
```

当前目录下执行`source ./.bash_profile`

## 3. 查看是否安装成功

`go env`: 查看环境

`go version`:查看go版本号
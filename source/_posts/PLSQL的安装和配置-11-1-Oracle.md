---
title: PLSQL的安装和配置 - v11.1 Oracle
top: 0
categories: 资源分享
tags: PLSQL developer
abbrlink: 45769
date: 2020-11-01 01:03:05
---

# 一. 工具分享

[PL/SQL v11.1免安装破解版](https://clearlight.lanzous.com/iX8jQhxc9vc)

[客户端插件](https://clearlight.lanzous.com/iCWXvhxcjzg)



# 二. 客户端插件

打开plsql, 先点击“取消”

打开软件，打开菜单 “工具”——》“首选项”——》“连接”

编辑“Oracle主目录名”，“OCI库“这两项，其中主instantclient_11_2目录名为，刚才放在plsql安装目录里的instantclient_11_2文件夹，oci库为文件夹下的oci.dll文件

如下两行内容，我的配置如下截图(注意: 根据实际安装路径进行配置)

- Oracle主目录名: D:\dev\PLSQL\instantclient_12_1\oci.dll

- OCI库: D:\dev\PLSQL\instantclient_12_1\oci.dll

![image-20201101010857280](https://gitee.com/clearlightY/mapdepot/raw/master/img/20201101010917.png)

# 三. 查询显示中文乱码

电脑中增加如下环境变量即可解决

变量名: `NLS_LANG`

变量值: `SIMPLIFIED CHINESE_CHINA.ZHS16GBK`

![image-20201101011141125](https://gitee.com/clearlightY/mapdepot/raw/master/img/20201101011145.png)



---

> 参考链接: [plsql安装与配置](https://blog.csdn.net/u011089412/article/details/78209058)
---
title: Redis的安装 - Linux/Windows
top: 0
categories: Skill
tags: Linux_Redis
abbrlink: 54105
date: 2020-04-22 23:19:30
---

# Linux系统

1.`wget http://download.redis.io/releases/redis-5.0.0.tar.gz`

2.`tar zxvf redis-5.0.0.tar.gz -C /opt`

3.`cd redis-5.0.0`

4.`make`

5.![image-20200422204323207](https://gitee.com/clearlightY/mapdepot/raw/master/img/20200422231929.png)

6.指定安装目录

​	`make PREFIX=/usr/local/redis install`

7.`cd redis/bin`

8.启动

​	`./redis-server`

 9.打开客户端

​	`./redis-cli`



# Windows系统

软件下载地址: [Redis 3.2 .msi](https://clearlight.lanzous.com/ibs8kif)

下载后 ,解压 一直下一步, 其中有一个设置size, 可以改为1024M



## 启动

项目根目录执行

启动服务: `redis-server.exe redis.windows.conf`

启动程序: `cmd在Redis的根目录中执行`
			  	`redis-cli.exe`






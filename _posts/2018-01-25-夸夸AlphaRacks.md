---
layout: post
title:  "夸夸AlphaRacks公司"

date:   2018-1-25 22:55:13
tags:
- 网络
- CentOS
description: ''
color: 'rgb(98,170,255)'
---

### 写篇小日记

​	感冒了几天，没有来写博客，就天天在家里看看剧。也没有注意到自己的VPS的情况。今天想用用SSR发现，居然不能用了。居然见鬼了。！！！

​	然后想起来前几天看到说这几天好像在开什么会，墙应该又高了，我的ip肯定被注意到了，是应该注意点啊。

​	为了验证一下自己的想法，进了一个ip分析的网站，在这里分享给大家—— [IPIP](https://www.ipip.net)。

​	用了ping工具发现原来的ip居然在国内任何一个地方的丢包率全为100%。尴尬又无奈。

​	我只好抱着试一试的心态在此建了个服务单，给老美发邮件。“Excuse me!  Can you change a IP for me? This IP is not accessible in China.” 这次他完全就是秒回我。而且和我说给我换了个ip。外加一句经典的话，“Please check now.” 他又让我check一下。那就check，用他新IP在Xshell里连了一下，完全OJB有用。这效率还真是可以啊。想起国内的云，发封邮件要好久才会回，这远在大洋彼岸的美帝，回我这么迅速，算是很良心了。

​	希望这次别再被“河蟹”了，还有上次说的BBR，我在这次没有实现，而且网速更慢了，还是等下次的谷歌云或者是亚马逊云在详细的写吧。先贴一点OpenVZ下用BBR会用到的命令。



------



**Google BBR安装脚本**

```shell
wget https://raw.githubusercontent.com/kuoruan/shell-scripts/master/ovz-bbr/ovz-bbr-installer.sh

chmod +x ovz-bbr-installer.sh

./ovz-bbr-installer.sh

```



1、安装过程中会要求输入需要加速的端口号，请按自己的需求输入（比如加速Web服务，则输入80）

2、可能需要配置 “公网接口名称”，即你服务器上具有公网 IP 的接口名称。搬瓦工 OpenVZ 上默认都是 venet0



这个名称可以通过ifconfig命令查询得到，如果执行ifconfig命令提示无此命令，请先安装net-tools工具包。

**net-tools工具包：**

```shell
yum install net-tools -y
```



**判断BBR是否正常工作**

判断 bbr 是否正常启动可以尝试 ping 10.0.0.2，如果能通，说明 bbr 已经启动。



**启动、停止、重启bbr、查看bbr服务状态**

```shell
systemctl {start|stop|restart|status} haproxy-lkl
```



**配置bbr加速端口**

（在安装的时候只输入了一个端口，但是实际可以支持加速多个端口），如需修改加速端口，请修改以下文件，每行一个端口号，或者端口范围

```shell
vi /usr/local/haproxy-lkl/etc/port-rules
```



**卸载bbr**

```shell
./ovz-bbr-installer.sh uninstall
```



------



好了，感冒还没彻底好，我要回到温暖的被窝了。。。。

​	如果看到这篇文章还有什么疑问想要寻求帮助的，欢迎联系本人。微博、qq、微信在文章末尾处。欢迎来告诉我你的想法。

​	如需转载，请注明出处，谢谢。

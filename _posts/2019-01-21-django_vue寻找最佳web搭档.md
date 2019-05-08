---
layout: post
title:  "django_vue寻找最佳web搭档"
date:   2019-01-21 23:37:13
tags:
- python
- Django
- 工作总结
- vue
description: ''
color: '#41b883'
cover: 'http://blogimg.since1105.wang/django_vue.png'
---
> 打造一个前后端都舒适的开发环境 —— `django_vue`

上了班以后，vue用的多了，慢慢就变成了一个vue重度用户，开发如果不用类似vue这种的MVVM框架，写起东西来总感觉不够称手。所以再django框架中嵌入一个vue，岂不是美滋滋。

现在都2019年了，赶个时髦，vue就选择`vue-cli3`。

### 1、本机安装 node 和 vue-cli3

装好node，vue官网看看，瞬间就能装好 vue-cli3。[戳我官网](https://cli.vuejs.org/)

### 2、在项目中搭建 vue

打开 pyCharm ，进入项目的 Terminal 。执行以下命令：

```bash
vue create spa
# 创建一个名为 spa（Single Page Application —— 单页应用） 的 vue 项目
# 虽然名为单页，但是之后通过django和vue的相关配置，实现多页开发。
```

进入创建spa项目的环节

![1](http://blogimg.since1105.wang/2019_01_16_1.png)

第一次新建项目选择， > Manually Sel.... 最后这个

![1](http://blogimg.since1105.wang/2019_01_16_2.png)

在列表中选择可能在项目中会用到的部分依赖，按需选择没必要全部安装。当然，漏装某个依赖也没事，以后需要用到的时候在手动安装就好了。操作方式：

```
上下切换依赖
空格选择依赖
回车进入下一步
```

这里我选择的是 （Babel，Router，Vuex，CSS Pre-processors/css预加载器）

之前如果选择了，`CSS Pre-processors`，下一步就选择将会用到的预加载器。

![1](http://blogimg.since1105.wang/2019_01_16_3.png)

看具体需要。

![1](http://blogimg.since1105.wang/2019_01_16_4.png)

最后，他会询问是否将之前的选择和配置记录下来方便下一次新建时可以直接选择。那就好的吧，给这个配置命个名，确定就好了。

最后，安装vue搭建完成后，在项目目录下会有一个spa文件夹，这就是今后撸前端代码的地方。

![1](http://blogimg.since1105.wang/2019_01_16_5.png)

### 3、扩充项目目录

vue3.0之后，简略了vue的目录结构，什么config文件夹啊什么的都没了。他以一个最简的形式帮你搭好了目录。但是，最简对于我们这个项目来说肯定是不够的，至少还缺了个 `static` 文件夹用于存放开发环境的静态文件 、 一个关键的 `vue.conf.js` vue的配置文件 和 一个多页文件夹 `pages`。

手动在 `django` 整个大项目的根下添加文件夹 `static` 用作静态文件的备用存储位置 和 `templates` 作为django模板的存放位置。
在 `spa` 根下添加文件 `vue.conf.js` 下一步就会用到。
在 `spa/src` 下创建文件夹 `pages` ，在 `pages` 里再添加一个单页小应用的文件夹，并取名，之后在里面添加相应的vue文件，目录格式如下。

![1](http://blogimg.since1105.wang/2019_01_16_6.png)

这个文件夹作为多页下的一个小 `spa`

然后，将 `spa` 文件夹除去 `node_modules` 文件夹外，其他全部通过 `shift + ctrl + alt + x` 手动上传至服务器上。

### 4、配置 `vue.conf.js` 文件

面对一个空文件，肯定是懵的。查查各种资料，看看高人的代码后，下面是我的配置

```javascript
var glob = require('glob')
var path = require('path')
var root = path.dirname(__dirname)

var pagesPath = path.resolve(__dirname, './src/pages')
var searchPages = function () {
  var pages = {}
  var entryFiles = glob.sync(pagesPath + '/*/entry.js')
  entryFiles.forEach((filePath) => {
    var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.length)
    var basename = path.basename(path.dirname(filePath))
    var htmlName = basename + '.html'
    pages[basename] = {
      entry: filePath,
      template: filePath.replace(filename, htmlName),
      filename: htmlName
    }
  })
  console.log(pages)
  return pages
}
var pages = {}

var isProd = function () {
  return process.env.NODE_ENV === 'production'
}
var getBasePath = function () {
  return isProd() ? '/spa/' : '/dev/'
}

var devServer = {
  public: 'www.since1105.wang:8080',
  host: '0.0.0.0',
  port: 8080,
  compress: true,
  publicPath: '/dev/',
  disableHostCheck: true,
  allowedHosts: [
    '.abc.com',
  ]
}

module.exports = {
  pages: Object.assign({}, pages, searchPages()),
  baseUrl: getBasePath(),
  outputDir: path.join(root, 'templates', 'spa'),
  assetsDir: './static/',
  devServer: devServer,
}
```

#### 解释如下：

[`isProd`](javascript:;) ：用于区分 开发环境 或是 生产环境

[`getBasePath`](javascript:;) ：在开发环境下，页面根目录为 `dev` ，生产环境（打包编译后），根目录则为 `spa`

[`devServer`](javascript:;) ：开发服务器的设置，根据实际情况改为相应的参数

[`searchPages`](javascript:;) ：玫举出在多页文件夹 `/spa/src/pages` 下符合条件的单页应用，并为每个单页配置一个pages的对象，用于打包项目时的配置使用。这是这个项目能多页的精华部分。

[`module.exports`](javascript:;)：pages > 单页的配置 、 baseUrl > 区分开发和生产的根路径 、 outputDir > 打包输出的文件位置 、 devServer > 开发服务器的配置

### 5、配置模板

在项目根下的 `templates` 文件夹下添加与单页小应用的相同名字的文件夹（最好相同吧，为了统一好管理记录）。并在文件夹下创建 `***.html` 文件。这对于项目来说也是一个关键点。这可以作为spa的模板文件，之后再讲这个。

关于这个 `html` ：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
  <title>home</title>
</head>
<body>
<div id="app"></div>
<!-- 在这里引用 vue 的开发环境的地址下的 js 文件 这是你能用模板做热更新的关键 -->
<script src="/dev/home.js"></script>
</body>
</html>
```

以上是模板的主要内容，其中 `script` 相当重要。当然了，不用这个模板也是可以的。运行完 `npm run serve` 之后，比如我的就可以直接访问 `http://域名/dev/home.html` 也是一样的。使用模板的话在我看来有以下这些好处：

> 1、便于页面的管理 <br> 2、用模板继承可以随意在 django 的模板中拼接 vue 代码 <br> 3、可以在 django 的 views.py 中稍微配置一下就可以用线上域名随意切换热更和线上项目的，比如这样配置

```python
from django.shortcuts import render
def djangoapp(request):
    context = {}
    dev = request.GET.get('dev')
    if not dev:
        return render(request, 'spa/home.html', context=context)
    return render(request, 'home/home.html', context=context)
# 根据自己的路由配置还原上述的代码
# 当线上路径为 http://你的域名/ 时，这时候你就可以用 http://你的域名/?dev=1 来访问热更新页面，很方便
```

## 遇到的问题总结

### 一、`vue.config.js` 的配置

在配置`vue.config.js` 文件时，由于 vue 基础没打好吧，之前上手撸代码的时候没有很扎实，所以对 开发环境 和 生产环境 的不够理解，所以导致了开发和生产的路径为同一个路径。导致了不管访问什么环境，静态文件的获取永远都是404。刚开始以为是 `nginx` 的配置问题。后来发现，问题似乎并没有这么简单。所以，在上面我就特别强调了一下 开发环境 和 生产环境 的问题。

### 二、`nginx` 的配置

下面贴一下 `nginx` 的代码：

```editorconfig
upstream adjango_home {
    server 127.0.0.1:8000;
}
upstream adjango_spa {
    server 127.0.0.1:8080;
}

server {
    listen 80;
    root /var/www/adjango;

    server_name www.abc.com abc.com;

    # Add index.php to the list if you are using PHP
    index index.html index.htm ;

    location / {
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Credentials' 'true';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS,PATCH,PUT';
        add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
        proxy_set_header HTTP_X_FORWARDED_PROTO https;
        proxy_pass http://adjango_home;
        client_max_body_size 2m;
        include proxy_params;
    }

    location /dev {
        proxy_set_header HTTP_X_FORWARDED_PROTO https;
        proxy_pass http://adjango_spa;
        client_max_body_size 2m;
        include proxy_params;
    }

    location /static/ {
        alias /var/www/adjango/static/;
    }

    location /spa/static/css/ {
        alias /var/www/adjango/templates/spa/static/css/;
    }
    location /spa/static/js/ {
        alias /var/www/adjango/templates/spa/static/js/;
    }
    location /spa/static/img/ {
        alias /var/www/adjango/templates/spa/static/img/;
    }

}
```

差不多就这样吧，下次想起什么来再补充吧。。。。
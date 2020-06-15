---
title: 文件上传并校验文件 - Vue+Django开发
top: 0
categories: 实习
tags: Vue Django
abbrlink: 17143
date: 2020-06-12 11:17:34
---

# 一. 创建Django项目

```shell
# 创建项目
django-admin startproject mysite
# 创建应用
py manage.py startapp fileUpload
# 运行项目
py manage.py runserver
```





# 二. 创建Vue项目

## 2.1 使用vue-cli脚手架创建新项目

```shell
# 全局安装vue-cli工具
npm install vue-cli -g
# 创建新项目
vue init webpack vue-project
# 运行项目
npm run dev

# 项目正常启动, 安装vue辅助工具
npm install vue-router --save
npm install vuex --save
npm install vue-resource --save
```

## 2.2 添加子组件

**在 components 文件下创建一个自己的 组件文件（FileUpload.vue）**

```vue
<template>
    <div class="upload">
        {{ name }}
    </div>
</template>

<script>
export default {
    name:"upload",
    data() {
        return {
            name: "上传文件"
        }
    },
}
</script>

<style scoped>

</style>
```

**子组件创建好后 就要注册它，只有注册了才能使用**

### 2.2.1 注册分为: 全局注册和局部注册

1. 全局注册

   ![image-20200612135102455](https://gitee.com/clearlightY/mapdepot/raw/master/img/20200612135110.png)

   ![image-20200612135152664](https://gitee.com/clearlightY/mapdepot/raw/master/img/20200612135154.png)

2. 局部注册

Tip: [vue——解决“You may use special comments to disable some warnings. Use // eslint-disable-next-line to ignore the next line. Use /* eslint-disable */ to ignore all warnings in a file. ”](https://www.cnblogs.com/gaoquanquan/p/9550169.html)

> **在build/webpack.base.conf.js文件中，注释或者删除掉：module->rules中有关eslint的规则**
>
> ```js
> module: {
>   rules: [
>     //...(config.dev.useEslint ? [createLintingRule()] : []), // 注释或者删除
>     {
>       test: /\.vue$/,
>       loader: 'vue-loader',
>       options: vueLoaderConfig
>     },
>     ...
>     }
>   ]
> }
> ```
>
> **然后 npm run dev 就能正常运行了**



## 文件上传的Djangode views.py代码

```python
import os

from django.http import HttpResponse
from django.middleware.csrf import get_token
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods


@require_http_methods(["GET", "POST"])
def index(request):
    response = {}
    try:
        if request.method == 'GET':
            a = get_token(request)
            # print(a)
        if request.method == 'POST':
            req = request.FILES.get('file')
            print(req)
            print(req.size)
            # for chunk in req.chunks():
            #     print(chunk)
            content = []
	    # 逐行读取文件内容, 并且消除换行
            for line in req.read().splitlines():
                print(line)
		# 将每行内容添加到list中
                content.append(line)
            destination = open(
                os.path.join("f://vue", req.name),
                'wb+')  # 打开特定的文件进行二进制的写操作
            for chunk in req.chunks():  # 分块写入文件
                destination.write(chunk)
            destination.close()
            print(content[2])
            response['code'] = 200
    except Exception as e:
        response['code'] = 1
    return HttpResponse(response)

# Create your views here.
# def index(request):
#     request_method = request.FILES.get('file')
#     print(request_method)
#     print(request_method.size)
#     return HttpResponse("200")

```

---
title: 文件上传并校验文件 - Vue+Django开发
top: 0
date: 2020-06-12 11:17:34
categories: 实习
tags: Vue Django
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
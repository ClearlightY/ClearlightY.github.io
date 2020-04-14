---
title: 响应式中@media的注意事项
categories: 前端
tags: 响应式
date: 2020-03-27 13:53:54
---

## 响应式开发注意事项

https://www.kancloud.cn/xiak/quanduan/839151

#### 移动优先：媒体查询代码的书写顺序

> **注意移动优先，任何时候，媒体查询代码都有写在后面，否则因为css覆盖特性而可能不会生效，而不在媒体查询之内的代码默认就为移动端的。** （媒体查询代码的书写顺序对css覆盖特性的影响和普通代码是一样的）

```html
.login-btn {
    border: 1px #828282 solid;
    padding: 5px 12px !important;
    border-radius: 15px;
    font-size: 15px;
    margin-top: 18px;
}

/* 平板时的导航样式 768px <= x < 992px */
@media  (min-width: 768px) and (max-width: 992px) {
    .navbar .container {
        width: 100%;
    }
    .navbar-nav>li>a {
        padding: 20px;
    }
    .login-btn {
        // 如果顺序不对，这里会被覆盖
        margin-top: 13px;
    }
}

--------------------------

要特别注意以下书写规则，不按照这个规则书写，会有问题

@media  (min-width: a){}

@media  (min-width: b){}

@media  (min-width: c){}

这里 a < b < c



@media  (max-width: a){}

@media  (max-width: b){}

@media  (max-width: c){}

这里 c < b < a
```






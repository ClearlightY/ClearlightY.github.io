---
title: 侧栏中的posts打开的链接错误 /archives/%7C%7C%20archive/ - Hexo建站
date: 2020-03-05 17:53:31
tags: Hexo
---
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200305174327105.png)
**当鼠标移到posts时, 访问的链接是`域名/archives/%7C%7C%20archive/`, 可见后面的多余了, 问题就是删除后面多余字符**

## 解决多余字符
posts的`class="site-state-item site-state-posts"`

打开`博客根目录/themes/next/layout/_macro/sidebar.swig`, 搜索class的值, 快速定位错误位置.

**修改之前:**
```html
 {% if config.archive_dir != '/' and site.posts.length > 0 %}
              <div class="site-state-item site-state-posts">
              {% if theme.menu.archives %}
                <a href="{{ url_for(theme.menu.archives).split('||')[0] | trim }}">
              {% else %}
                <a href="{{ url_for(config.archive_dir) }}">
              {% endif %}
                  <span class="site-state-item-count">{{ site.posts.length }}</span>
                  <span class="site-state-item-name">{{ __('state.posts') }}</span>
                </a>
              </div>
 {% endif %}
```

**修改之后:**
```html
{% if config.archive_dir != '/' and site.posts.length > 0 %}
              <div class="site-state-item site-state-posts">
                <a href="{{ url_for(config.archive_dir) }}">
                  <span class="site-state-item-count">{{ site.posts.length }}</span>
                  <span class="site-state-item-name">{{ __('state.posts') }}</span>
                </a>
              </div>
{% endif %}
```

<font color=red>将中间的判断删掉, 保留下面else的内容即可解决该问题</font>

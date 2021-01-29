---
title: Hexo Fluid主题 细节优化
top: 0
abbrlink: fluid_details
date: 2021-01-23 15:16:26
categories: Hexo
tags: Fluid
---

# 一、版权声明优化

需要调整的文件位置, 如图:

![版权声明优化文件位置](https://gitee.com/clearlightY/mapdepot/raw/master/img/20210123154612.png)

在`post.ejs`搜索`copyright`, 对应的代码段如下图:

![需要注释的版权声明代码](https://gitee.com/clearlightY/mapdepot/raw/master/img/20210123154735.png)

将其注释掉, 然后修改为下面的代码

```ejs
<% if(theme.post.copyright.enable && theme.post.copyright.content && page.copyright !== false) { %><p class="note note-warning">
                <strong>本文作者: </strong><a href="<%- url_for() %>"><%- theme.about.name || config.author || config.title %></a> <br>
                <strong>本文链接: </strong><a href="<%- full_url_for(page.path) %>"><%- 		  full_url_for(page.path) %></a> <br>
                <strong>版权声明: </strong><%- theme.post.copyright.content %>
                   </p>
                   <% } %>
```

最终显示效果:

![最终效果](https://gitee.com/clearlightY/mapdepot/raw/master/img/20210123155257.png)

# 二、Tag的使用

![Tag的使用](https://gitee.com/clearlightY/mapdepot/raw/master/img/20210123160715.png)

<p class="note note-primary">测试内容</p>

# 三、页脚优化

修改页脚内容代码文件位置：

![image-20210123165816096](https://gitee.com/clearlightY/mapdepot/raw/master/img/20210123165817.png)

本人代码详情如下内容：

```ejs
<footer class="text-center mt-5 py-3">
  
  <%- theme.footer.content %> 
  <!-- 添加网站运行时间 -->
  <div class="footer-content">
    <div>
      <span id="timeDate">载入天数...</span>
      <span id="times">载入时分秒...</span>
      <script>
      var now = new Date();
      function createtime(){
          var grt= new Date("04/03/2020 00:00:00");//此处修改你的建站时间或者网站上线时间
          now.setTime(now.getTime()+250);
          days = (now - grt ) / 1000 / 60 / 60 / 24;
          dnum = Math.floor(days);
          hours = (now - grt ) / 1000 / 60 / 60 - (24 * dnum);
          hnum = Math.floor(hours);
          if(String(hnum).length ==1 ){
              hnum = "0" + hnum;
          }
          minutes = (now - grt ) / 1000 /60 - (24 * 60 * dnum) - (60 * hnum);
          mnum = Math.floor(minutes);
          if(String(mnum).length ==1 ){
                    mnum = "0" + mnum;
          }
          seconds = (now - grt ) / 1000 - (24 * 60 * 60 * dnum) - (60 * 60 * hnum) - (60 * mnum);
          snum = Math.round(seconds);
          if(String(snum).length ==1 ){
                    snum = "0" + snum;
          }
          document.getElementById("timeDate").innerHTML = "🚀 &nbsp"+dnum+"&nbsp天";  //此次自定义显示内容
          document.getElementById("times").innerHTML = hnum + "&nbsp小时&nbsp" + mnum + "&nbsp分&nbsp" + snum + "&nbsp秒";
      }  //此次自定义显示内容
      setInterval("createtime()",250);
      </script>
    </div>
  </div>
  <!-- 统计访问量信息 -->
  <%- partial('_partial/statistics.ejs') %>
  <!-- 个人和备案信息 -->
  <div>©2020-2021<a href="https://clearlight.blog.csdn.net/">ClearlightY</a> <a href="http://beian.miit.gov.cn/">冀ICP备19019307号-2</a></div>
   <!-- <%- partial('_partial/beian.ejs') %> -->
  <% if(theme.web_analytics.cnzz) { %>
    <!-- cnzz Analytics Icon -->
    <span id="cnzz_stat_icon_<%- theme.web_analytics.cnzz %>" style="display: none"></span>
  <% } %>
</footer>

<!-- SCRIPTS -->
<%- partial('_partial/scripts.ejs') %>

```

![页脚最终效果](https://gitee.com/clearlightY/mapdepot/raw/master/img/20210123170122.png)



> 参考文章: 
>
> - [Hexo's Fluid 主题私人定制（持续更新）](https://erenship.com/posts/40222.html)
---
title: project_problem_record
top: 0
date: 2020-04-16 22:35:52
categories: question
tags: jsp ssm
---

1.P14 `${options.optionSiteTitle}`

2.P63 `<a href="/" title="欢迎您光临本站！" tabindex="-1">${options.optionSiteTitle}</a>`

>html中的tabIndex属性可以设置键盘中的TAB键在控件中的移动顺序,即焦点的顺序。
>把控件的tabIndex属性设成1到32767的一个值，就可以把这个控件加入到TAB键的序列中。
>这样，当浏览者使用TAB键在网页控件中移动时，将首先移动到具有最小tabIndex属性值的控件上，最后在具有最大tabIndex属性值的控件上结束移动。
>如果有两个控件的tabIndex属性相同，则以控件在html代码中出现的顺序为准。 
>默认的tabIndex属性为 0 ，将排列在在所有指定tabIndex的控件之后。 
>而若把tabIndex属性设为一个负值（如tabIndex="-1"），那么这个链接将被排除在TAB键的序列之外。   如果最初选择了[Tab]键，带这个输入栏的网页会将光标移动到firstName栏。 
>————————————————
>原文链接：https://blog.csdn.net/qq_32849999/article/details/83823591



3.cookie的问题



4.P80 `value="<%=username%>"`



5.P80 input标签中size属性

> **对于 '<input type="text">` ，size 属性定义的是可见的字符数**
>
> ` maxlength="10"`属性为可以输入的最大字符数



6.label标签以及属性for `<label for="user_pass">`

>`<label> `标签为 input 元素定义标注（标记）。label 元素不会向用户呈现任何特殊效果。不过，它为鼠标用户改进了可用性。如果您在 label 元素内点击文本，就会触发此控件。就是说，当用户选择该标签时，浏览器就会自动将焦点转到和标签相关的表单控件上。`<label>` 标签的 for 属性应当与相关元素的 id 属性相同。
>
>---
>
><https://www.w3school.com.cn/tags/tag_label.asp>



7.P87 input标签中的value="1"



8.

```js
function wp_attempt_focus(){
    		/*setTimeout() 是属于 window 的方法，该方法用于在指定的毫秒数后调用函数或计算表达式。*/
            setTimeout( function(){ try{
                d = document.getElementById('user_login');
                /*focus() 方法用于给予该元素焦点。这样用户不必点击它，就能编辑显示的文本了。*/
                d.focus();
                /*select() 方法用于选取文本域中的内容。*/
                d.select();
            } catch(e){}
            }, 200);
        }

        wp_attempt_focus();
        if(typeof wpOnload=='function')wpOnload();
```



9.P134 ajax中的`data: $("#loginForm").serialize()`

> **serialize() 方法通过序列化表单值，创建 URL 编码文本字符串。**
>
> 您可以选择一个或多个表单元素（比如 input 及/或 文本框），或者 form 元素本身。
>
> 序列化的值可在生成 AJAX 请求时用于 URL 查询字符串中。
>
> 用法: `$(selector).serialize()`
>
> ![image-20200416014629263](https://gitee.com/clearlightY/mapdepot/raw/master/img/20200416014638.png)
>
> ---
>
> <https://www.w3school.com.cn/jquery/ajax_serialize.asp>

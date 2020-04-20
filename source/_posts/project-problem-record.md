---
title: project_problem_record
top: 0
categories: question
tags: jsp ssm
abbrlink: 5056
date: 2020-04-16 22:35:52
---

1.P14 `${options.optionSiteTitle}`

>EL: Expression Language, 可以替代JSP页面中的JAVA代码
>
>servlet(增加数据)-> JSP(显示数据)
>
>EL示例:
>
>> ${requestScope.student.address.schoolAddress}
>>
>> ${域对象.域对象中的属性.属性.属性.级联属性}
>
>EL操作符:
>
>- 点操作符 `.` --使用方便
>
>- 中括号操作符 `[]` --功能强大: 可以包含特殊字符(. 、 -), 可以访问数据, 获取变量值
>
>  例如存在变量name, 则可以${requestScope[name] }
>
>
>
>EL表达式的隐式对象(不需要new就能使用的对象, 自带的对象)
>
>- a. 作用于访问对象(EL域对象): pageScope	requestScope	sessionScope	applicationScope
>
>  如果不指定域对象, 则默认会根据 从小到大的顺序 依次取值
>
>- b. 参数访问对象: 获取表单数据( request.getParameter() ->`${param.name}`、request.getParameterValues() -> `${paramValues.name[0]}` )
>
>  也可以传 超链接中的值: a.jsp?a=b&c=d 或者 地址栏中的值 a.jsp?a=b&c=d
>
>- c. JSP隐式对象: pageContext 获取其他的jsp隐式对象; 因此如果要在EL中使用JSP的隐式对象, 可以通过pageContext间接获取, 例如`${pageContext.request}`
>
>  获取的方法:(去掉get 首字母小写 去掉括号 即可)
>
>  - \${pageContext.getSession()} -> ​\${pageContext.session}
>  - \${pageContext.getResponse} -> \${pageContext.response}`
>
>  

2.P63 `<a href="/" title="欢迎您光临本站！" tabindex="-1">${options.optionSiteTitle}</a>`

>html中的tabIndex属性可以设置键盘中的TAB键在控件中的移动顺序,即焦点的顺序。
> 把控件的tabIndex属性设成1到32767的一个值，就可以把这个控件加入到TAB键的序列中。
> 这样，当浏览者使用TAB键在网页控件中移动时，将首先移动到具有最小tabIndex属性值的控件上，最后在具有最大tabIndex属性值的控件上结束移动。
>如果有两个控件的tabIndex属性相同，则以控件在html代码中出现的顺序为准。 
> 默认的tabIndex属性为 0 ，将排列在在所有指定tabIndex的控件之后。 
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





10.JSTL

**核心标签库: 通用标签库, 条件标签库, 迭代标签库**

a. 通用标签库

\<c:set>赋值

i: 在某个作用于之中(4个范围对象), 给某个变量赋值

`<c:set var="变量名" value="变量值" scope="4个范围对象的作用于" />`

eg: \<c:set var="name" value="zhangsan" scope="request" />

ii: 在某个作用于之中(4个范围对象), 给某个对象的属性赋值(此种写法, 不能指定scope属性)

`<c:set target="对象" property="对象的属性" value="赋值" />`

eg: \<c:set target="${requestScope.student}" property="sname" value"zxx" />

给map对象赋值: \<c:set target="${requestScope.countries}" property="cn" value="中国" />

注意: \<c:set>可以给不存在的变量赋值 (但不能给不存在的对象赋值)



\<c:out>取值

传统EL: `${requestScope.student }`

c:out方式: \<c:out value="${requestScope.student }" />

c:out显示不存在的数据并设置默认值: \<c:cout value="${requestScope.stu }" default="zs-sss" />



\<c:out value='\<a href="https://www.baidu.com">百度</a>` escapeXml="true" />

\<c:out value='<a href="https://www.baidu.com"'>百度</a> escapedXml="false" />

![image-20200420212526370](https://gitee.com/clearlightY/mapdepot/raw/master/img/20200420212535.png)



\<c:remove>移除

\<c:remove var="a" scope="request" />



**注意: 后面的test引号中不要加多余的空格!**比如EL表达式之后加个空格->将会当做字符串处理

\<c:if test="${10>2}" var="result" scope="request">

${requestScope.result}

\</c:if>



\<c:set var="role" value="学生" scope="request" />

```jsp
<c:choose>
	<c:when test="..."> </c:when>
    <c:when test="..."> </c:when>
    <c:otherwise> </c:otherwise>
</c:choose>


```



foreach的两种形式

```jsp
<c:forEach begin="0" end="5" step="1" varStatus="status">
	${status.index}
</c:forEach>
---
<c:forEach var="name" items="${requestScope.names}">
    ${name}
</c:forEach>
---
<c:forEach var="student" items="${requestScope.students }">
    ${student.sname}-${student.sno}
</c:forEach>
```





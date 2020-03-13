---
title: MyBatis入门(二)
top: 0
abbrlink: 33725
date: 2020-03-12 14:41:00
categories: Java框架
tags: MyBatis
---

# MyBatis入门(二)



## 一、MyBatis如何通过XML方式对JDBC实现封装

![MyBatis_all](MyBatis_all.png)



## 二、MyBatis的CRUD

## 修改操作

step1、编写dao接口和方法

```
void updateUser(User user);
```

step2、修改映射文件

![1571043760801](1571043760801.png)

step3、测试即可

![1571043830811](1571043830811.png)

## 删除操作

step1、编写dao接口

```
void delUser(Integer uid);
```

step2、映射文件

![1571044142787](1571044142787.png)

step3、测试

![1571044205710](1571044205710.png)



## 查询所有的记录

### 情况一：结果集的字段名（非表的字段名）和实体类属性名一致

step1、编写dao接口

```
List<User> findAllUsers1();
```

step2、映射文件

![1571044564929](1571044564929.png)

step3、测试即可

![1571044635199](1571044635199.png)



### 情况二：结果集的字段名（非表的字段名）和实体类属性不一致

step1、dao接口

```
List<User> findAllUsers2();
```

step2、映射文件

手动映射名称不一致的情况

![1571044965358](1571044965358.png)

step3、测试类

![1571044779971](1571044779971.png)

## 条件查询

### 情况一：只有一个简单类型的参数

step1、dao接口

```
User findUserByUid(Integer uid);
```

step2、映射文件

![1571046361233](1571046361233.png)

step3、测试

![1571046416787](1571046416787.png)

### 情况二：有多个简单类型的参数

step1、dao接口

```
User findUserByUidUsername(Integer uid,String username);
```

step2、映射文件

![1571046645444](1571046645444.png)



自己指定参数名称

![1571046737598](1571046737598.png)

step3、测试类

![1571046656518](1571046656518.png)

### 情况三：使用VO对象进行封装多个参数

VO：Value Object，专门封装数据的（类似POJO）。

step1、把查询条件封装到一个VO对象中

![1571046852101](1571046852101.png)

step2、编写dao接口

```
User findUserByUidUsername1(UserVO vo);
```

step3、映射文件

![1571046911114](1571046911114.png)

step4、测试类

![1571047010724](1571047010724.png)

## 模糊查询

### 方式一：

step1、dao接口

```
List<User> findUserByUsername1(String username);
```

step2、映射文件

![1571047205911](1571047205911.png)

step3、测试类

![1571047298046](1571047298046.png)

### 方式二：（推荐）

> concat函数，不同的数据库是不同的。MySQL的concat可以支持多个字符串进行拼接。Oracle的concat支持2个字符串进行拼接。

step1、dao接口

```
List<User> findUserByUsername2(String username);
```

step2、映射文件

![1571047409500](1571047409500.png)

step3、测试类

![1571047456882](1571047456882.png)

### 方式三：（了解）

step1、dao接口

```
List<User> findUserByUsername3(String username);
```

step2、映射文件

![1571047713267](1571047713267.png)

step3、测试

![1571047726523](1571047726523.png)

> #{username}和${username}的区别是什么？
>
> #表示占位符
>
> $表示字符串拼接，存在SQL注入的问题，不建议使用。

# 关于映射文件

| 标签                           | 属性          | 说明                                                         |
| ------------------------------ | ------------- | ------------------------------------------------------------ |
| mapper                         | namespace     | 唯一的区分不同的配置文件。在使用代理方式的dao编码时，取值要和Dao接口名称保持一致 |
| insert、delete、update、select | id            | 文件中要求唯一。在使用代理方式的dao编码时，取值要和dao接口的方法保持一致 |
| insert、delete、update、select | parameterType | 指定参数的类型。Integer存在别名：int、integer。绝大多数情况可以省略该属性。因为MyBatis能反射出类型。 |
| insert、delete、update、select | resultType    | 指定实体的类型。在结果集的字段名和实体类属性名一致时使用。自动映射。 |
| insert、delete、update、select | resultMap     | 一般要配合resultMap标签使用。指向手动映射的id的取值          |
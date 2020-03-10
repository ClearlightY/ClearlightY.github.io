---
title: MyBatis入门(一)
top: 0
categories: Java框架
tags: MyBatis
abbrlink: 17177
date: 2020-03-10 22:22:39
---

**MyBatis是一个`持久层`框架**



**它封装了`jdbc`操作的很多细节, 使开发者只需关注sql语句本身, 而无需关注注册驱动, 创建连接等繁杂过程.**



**它使用了ORM思想实现了结果集的封装.**

> ORM(Object Relational Mapping): 对象关系映射
>
> > 就是把`数据库表`和`实体类及实体类的属性`对应起来
> >
> > 让我们可以操作实体类就实现操作数据库表.

## 一. MyBatis环境搭建

第一步: 创建Maven工程并导入坐标

```xml
<dependencies>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.4.6</version>
        </dependency>

        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.47</version>
            <scope>runtime</scope>
        </dependency>

        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
            <version>1.2.12</version>
        </dependency>
    </dependencies>
```



第二步: 创建实体类和dao的接口

`User实体类`:

```java
package top.clearlight.domain;

import java.util.Date;

public class User {

    private Integer id;
    private String username;
    private Date birthday;
    private String sex;
    private String address;

    // toString() 和 getter和setter方法
}
```

`UserDao接口`:

```java
package top.clearlight.dao;

import top.clearlight.domain.User;

import java.util.List;

/**
 * 用户的持久层接口
 */
public interface UserDao {

    /**
     * 查询所有操作
     */
    List<User> findAll();

}
```

第三步: 创建MyBatis的主配置文件

`SqlMapConfig.xml`

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<!--MyBatis的主配置文件-->
<configuration>
    <!-- 配置环境-->
    <environments default="mysql">
        <!--  配置mysql的环境-->
        <environment id="mysql">
            <!-- 配置事务的类型-->
            <transactionManager type="JDBC"></transactionManager>
            <!--   配置数据源(连接池)-->
            <dataSource type="POOLED">
                <!--   配置连接数据库的4个基本信息 -->
                <property name="driver" value="com.mysql.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/stu"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>
        </environment>
    </environments>

    <!--   指定映射配置文件的位置, 映射配置文件指的是每个dao独立的配置文件-->
    <mappers>
        <mapper resource="top/clearlight/dao/UserDao.xml"/>
    </mappers>
</configuration>
```

第四步: 创建映射配置文件

`resources→top→clearlight→dao→UserDao.xml`:

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="top.clearlight.dao.UserDao">
    <!--配置查询所有 id为指定的方法 resultType为返回的数据集的封装类型-->
    <select id="findAll" resultType="top.clearlight.domain.User">
        select *
        from user
    </select>
</mapper>
```



**注意事项:**

1. 创建`UserDao.xml` 和 `UserDao.java` 时是为了和之前的知识一致, 

   在`MyBatis`中它把持久层的操作接口名称和映射文件也叫做: Mapper

   所以: `UserDao` 和 `UserMapper` 是一样的

2. 在idea中创建目录的时候, 它和包是不一样的

   包在创建时: `top.clearlight.dao`它是三级结构

   目录在创建时: `top.clearlight.dao`它是一级目录

3. `MyBatis`的映射配置文件位置必须和`dao`接口的包结构相同

4. 映射配置文件的`mapper`标签`namespace属性`的取值必须是`dao接口`的全限定类名

5. 映射配置文件的操作配置(select), id属性的取值必须是`dao接口`的方法名

当遵从第三四五点之后, 开发中就无需再写`dao`的实现类



`测试类`

![1583847823526](1583847823526.png)

**注意事项:**

- 不要忘记在映射配置中告知MyBatis要封装到那个实体类中

  配置的方式: 指定实体类的全限定类名



MyBatis基于注解的入门案例:

把`UserDao.xml`移除, 在`dao接口`的方法上使用@Select注解, 并且指定SQL语句

`UserDao接口`:

```java
public interface UserDao {

    /**
     * 查询所有操作
     */
    @Select("select * from user")
    List<User> findAll();
}
```

同时需要在`SqlMapConfig.xml`中的`mapper`配置时, 使用class属性指定dao接口的全限定类名

`SqlMapConfig.xml`:

```xml
 <!--   指定映射配置文件的位置, 映射配置文件指的是每个dao独立的配置文件
           如果使用注解来配置的话, 此处应该使用class属性指定被注解的dao全限定类名
    -->
    <mappers>
<!--        <mapper resource="top/clearlight/dao/UserDao.xml"/>-->
        <mapper class="top.clearlight.dao.UserDao"/>
    </mappers>
```



明确:

	实际开发中, 都是越简便越好, 所以都是采用不写dao实现类的方式.
	
	不管使用XML还是注解配置.
	
	但是MyBatis它是支持写dao实现类的.
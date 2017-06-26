# 学习koa框架

## koa 很多语法基于ECMAScript6,首先需要让编辑器支持ES6
`打开webstorm->File->Settings->Languages & FrameWorkes->勾选ES6即可`

## 注意事项
koa 提供的代码案例中用到async,await 等，需要node.js version >= 7.0.0

## 运行
`node --harmony app.js`

## 参考资料
ES6 参考资料[阮一峰ES6入门](http://es6.ruanyifeng.com/) <br>
KOA 官网 [中文官网](http://koa.bootcss.com/) (这个网站有很多语法错误) <br>
KOA 官网 [英文官网](http://koajs.com/)<br>
CnBlogs [cnblogs](http://www.cnblogs.com/myzy/p/6510113.html) <br>
廖雪峰网站资料 [廖雪峰koa入门](http://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001471087582981d6c0ea265bf241b59a04fa6f61d767f6000)<br>
廖雪峰github [github](https://github.com/michaelliao/learn-javascript)
github [github](https://github.com/hellopao/Blog)

## 测试框架mocha参考资料
[阮一峰mocha案例](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)
[官网指南](https://mochajs.org/#getting-started)

## PS
1. ES6 在前端框架React中也是基于ES6


## 博客项目
[koaBlog](https://github.com/zhengjinwei123/koa_study/tree/master/blog)

##### 1.基于koa2,es6
##### 2.mongodb存储
##### 3.前端采用部分`bootstrap` 插件 + 纯`css3` + `html5` + `requirejs`
##### 4.代码编辑 支持 `markdown` 语法 ,采用`highlight`渲染
##### 5.部署与运行(博客内容显示部分停止更新)

```
1. 在本地启动mongodb服务,不要设置密码,监听端口27017
2. nodejs版本 >=7.0.0
3. 在根目录下 运行 npm install (请先删除目录下的package-lock.json文件)
4. 运行node app.js
5. 打开页面 http://127.0.0.1:9100/ 即可
```
##### 效果:
<img src="https://github.com/zhengjinwei123/koa_study/blob/master/blog/s.png?raw=true" width="600px" height="600px"/>


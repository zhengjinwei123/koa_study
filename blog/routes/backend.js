'use strict';
let AdminControl = require("../controllers/admin");
let ArticleTypeControl = require("../controllers/articleType");
let ArticleControl = require("../controllers/article");
let Auth  =require("../middlewares/auth");

module.exports = function(router){
    router.get('/admin',Auth(),AdminControl.index);// 编辑博客首页
    router.get('/admin/register',AdminControl.showRegister); //账号登录和注册首页
    router.get('/admin/logout',AdminControl.logout); //下线
    router.get('/admin/list',Auth(),AdminControl.list); // 用户列表
    router.get('/admin/:userid',Auth(),AdminControl.fetch); // 某个用户信息

    router.post('/admin/register',AdminControl.create); // 注册账号
    router.post('/admin/articleType/add',ArticleTypeControl.add); //添加文章类型
    router.post('/admin/articleType/fetch',ArticleTypeControl.fetch); //添加文章类型
    router.post('/admin/article/add',ArticleControl.add); //添加文章类型

    router.post('/admin/login',AdminControl.login); // 登录
    router.post('/admin/remove',Auth(),AdminControl.remove); // 删除账号
};
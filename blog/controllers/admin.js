"use strict";

let thunkify = require("thunkify-wrap");
let UserModel = require("../models/user");
let Common = require("../lib/common");

// 首页
exports.index = function *() {
    yield this.render('admin/index', {
        title: "管理后台首页",
        user: this.session.user
    });
};

exports.showRegister = function *() {
    if(this.session && this.session.user){
        return this.redirect("index");
    }else{
        yield this.render('admin/register', {
            title: "用户注册",
            user: this.session.user
        });
    }
};

// 用户注册
exports.create = function *() {
    let param = this.request.body;
    let email = param['username'], password = param['password'];

    try{
        let result = yield thunkify(UserModel.add, UserModel)(email, Common.md5(password));
        if (!result) {
            this.send("create user failed");
        } else {
            this.send(null);
        }
    }catch(e){
        this.send(e.message);
    }
};


// 登录
exports.login = function *() {
    let param = this.request.body;
    let email = param['username'], password = param['password'];
    let result = yield thunkify(UserModel.fineByEmail, UserModel)(email);

    if (!result) {
        this.send("用户名不存在");
        return;
    } else {
        if (Common.md5(password) === result.password) {
            //登录成功
            this.session.user = email;
            this.send();
            return;
        } else {
            this.send("密码错误");
            return;
        }
    }
};

// 下线
exports.logout = function *(){
    if(this.session && this.session.user){
        this.session.user = null;
    }
    this.redirect("index");
};

// 列表
exports.list = function *() {

};

// 详情
exports.fetch = function *() {

};

// 移除
exports.remove = function *() {

};
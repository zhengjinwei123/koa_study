"use strict";

let Thunkify = require("thunkify-wrap");
let ArticleModel = require("../models/article");
let Common = require("../lib/common");

// 创建文章
exports.add = function *(){
    let error = null;
    try{
        yield Thunkify(ArticleModel.add,ArticleModel)(this.request.body);
    }catch(e){
        error = e.message;
    } finally {
        if(error){
            this.send(error);
        }else{
            this.send(null);
        }
    }
};

// 文章列表
exports.list = function *(){

};
// 文章详情
exports.detail = function *(){

};
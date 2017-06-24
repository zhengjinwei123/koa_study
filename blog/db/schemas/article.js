"use strict";
let Mongoose = require("mongoose");

let ArticleSchema = new Mongoose.Schema({
    user:{type:String,index:true},//用户
    type:{type:String,index:true},//文章类型
    title:{type:String},//文章标题
    content:{type:String},//文章内容
    desc:{type:String},//文章简介,内容的前200个字符
    ctime:{type:Date,default:Date.now()},//创建时间
    mtime:{type:Date,default:Date.now()} //修改时间
});

ArticleSchema.statics.findById = function(id,cb){
    return this.findOne({_id:id},cb);
};

ArticleSchema.statics.add = function(param,cb){
    let model = new this({
        user:param.user,
        type:param.type,
        title:param.title,
        content:param.content,
        desc:param.content.substring(0,100)
    });
    return model.save(cb);
};

module.exports = ArticleSchema;
"use strict";
let Mongoose = require("mongoose");

let ArticleTypeSchema = new Mongoose.Schema({
    user:{type:String,required:true,index:{unique:true}},//用户
    type:{type:Array,default:[]},//文章类型
    ctime:{type:Date,default:Date.now()},//创建时间
    mtime:{type:Date,default:Date.now()} //修改时间
});

ArticleTypeSchema.statics.findById = function(id,cb){
    return this.findOne({_id:id},cb);
};

ArticleTypeSchema.statics.findByUser = function(email,cb){
    return this.findOne({user:email},cb);
};

module.exports = ArticleTypeSchema;
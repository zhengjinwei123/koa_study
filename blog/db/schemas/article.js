"use strict";
let Mongoose = require("mongoose");

let ArticleSchema = new Mongoose.Schema({
    user:{type:String,index:true},
    desc:{type:String},
    content:{type:String},
    ctime:{type:Date,default:Date.now()},
    mtime:{type:Date,default:Date.now()}
});

ArticleSchema.statics.findById = function(id,cb){
    return this.findOne({_id:id},cb);
};

module.exports = ArticleSchema;
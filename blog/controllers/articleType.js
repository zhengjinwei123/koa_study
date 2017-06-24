"use strict";
let Trunkify = require("thunkify-wrap");
let ArticleTypeModel = require("../models/articleType");
let Common = require("../lib/common");

// 新增文章类型
exports.add = function *(){
    let param = this.request.body;
    let email = param["email"];
    let articleType = param['articleType'];

    let error = null;
    let types = [];
    try{
        let existUser = yield Trunkify(ArticleTypeModel.findByUser,ArticleTypeModel)(email);
        if(existUser){
            if(existUser.type.indexOf(articleType.trim()) >= 0){
                error = "此类型已经存在";
            }else{
                existUser.type.push(articleType);
                existUser.mtime = Date.now();
                existUser.markModified("type");
                existUser.markModified("mtime");
                types = existUser.type;
                yield Trunkify(existUser.save,existUser);
            }
        }else{
            let m = new ArticleTypeModel({
                user:email,
                type:[articleType]
            });
            types = [articleType];
            yield Trunkify(m.save,m);
        }
    }catch(e){
        error = e.message;
    }finally {
        if(error){
            this.send(error);
        }else{
            this.send(null,types);
        }
    }
};

// 类型列表
exports.fetch = function *(){
    let param = this.request.body;
    let user = param.user;
    let result = yield Trunkify(ArticleTypeModel.findByUser,ArticleTypeModel)(user);

    if(result){
        this.send(null,result.type);
    }else{
        this.send(null,[]);
    }
};
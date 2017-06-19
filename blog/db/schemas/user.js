"use strict";
let Mongoose = require("mongoose");

let UserSchema = new Mongoose.Schema({
    email:{type:String,required: true, index: {unique: true}},
    password:{type:String}
});

UserSchema.statics.fineByEmail = function(email,cb){
    return this.findOne({email:email},cb);
};

UserSchema.statics.add = function(email,password,cb){
    let newUser = new this({
        email:email,
        password:password
    });
    return newUser.save(cb);
};

module.exports = UserSchema;
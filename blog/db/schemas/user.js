"use strict";
let Mongoose = require("mongoose");

let UserSchema = new Mongoose.Schema({
    email:{type:String,required: true, index: {unique: true}},
    password:{type:String}
});

UserSchema.statics.findByEmail = function(email,cb){
    return this.findOne({email:email},cb);
};

module.exports = UserSchema;
"use strict";

let Util = require("util");

module.exports = function (){
    return function *(next){
        this.send = function(err,data){
            let result = {
                error:err,
                data:data
            };
            this.body = JSON.stringify(result);
        };
        yield next;
    }
};
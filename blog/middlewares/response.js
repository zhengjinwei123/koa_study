"use strict";

let Util = require("util");

module.exports = function (){
    return function *(next){
        this.send = function(res,code,msg){
            let result = {
                retCode:code
            };
            if (res) {
                result = Util._extend(result, { data: res });
            }
            if (code !== 0 && msg) {
                result = Util._extend(result, {
                    retMsg: msg
                });
            }
            this.body = JSON.stringify(result);
        };
        yield next;
    }
};
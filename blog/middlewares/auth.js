"use strict";

module.exports = function () {
    return function *(next) {
        if(!this.session || !this.session.user){
            return this.send("未登录!");
        }
        console.log(this.session.user)
        yield next;
    };
};
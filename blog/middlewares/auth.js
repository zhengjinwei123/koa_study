"use strict";

module.exports = function () {
    return function *(next) {
        if(!this.session || !this.session.user){
            yield this.render('admin/register', {
                title: "注册",
                user: this.session.user
            });
        }else{
            yield next;
        }
    };
};
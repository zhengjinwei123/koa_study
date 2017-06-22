"use strict";

module.exports = function () {
    return function *(next) {
        if(!this.session || !this.session.user){
            yield this.render('admin/index', {
                title: "管理后台首页",
                user: this.session.user
            });
        }
        yield next;
    };
};
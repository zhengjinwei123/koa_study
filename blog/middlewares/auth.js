"use strict";

module.exports = function () {
    return function *(next) {
        if(!this.session || !this.session.user){
            return this.send(null,100,"invalid session");
        }
        yield next;
    };
};
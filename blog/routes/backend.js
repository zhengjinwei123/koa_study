'use strict';
let AdminControl = require("../controllers/admin");
let Auth  =require("../middlewares/auth");

module.exports = function(router){
    router.get('/admin',Auth(),AdminControl.index);
    router.get('/admin/register',AdminControl.showRegister);

    router.post('/admin/register',AdminControl.create);
    router.post('/admin/login',AdminControl.login);
    router.get('/admin/list',Auth(),AdminControl.list);
    router.get('/admin/:userid',Auth(),AdminControl.fetch);
    router.post('/admin/remove',Auth(),AdminControl.remove);
};
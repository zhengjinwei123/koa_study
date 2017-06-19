define(function(require,exports,module){
    let _ = require("underscore");
    let $ = require("jquery");
    require("jgrowl");
    require("showLoading");
    let common = require("common");

    $("#dialog-register").fadeIn(1000);

    // 用户注册响应
    $("#btn-submit-register").on("click",function(){
        let $form = $("#form-register");
        let _data = $form.serializeObject();
        let userName = _data['username'];
        let password = _data['password'];

        if(userName === ''){
            $.jGrowl("用户名必须填写", { life: 1000,position:'bottom-left',theme:'growl1'});
            return false;
        }
        if(!common.isEmail(userName)){
            $.jGrowl("用户名必须是邮箱", { life: 1000,position:'bottom-left',theme:'growl1'});
            return false;
        }
        //判断用户名是否合法
        if(password === ''){
            $.jGrowl("密码必须填写", { life: 1000,position:'bottom-left'});
            return false;
        }

        $form.showLoading();
        $.post("/admin/register",_data,function(data){
            if(data.error){
                $.jGrowl(data.error, { life: 2000,position:'bottom-left'});
            }else{
                $.jGrowl("注册成功", { life: 2000,position:'bottom-left'});
                $("#dialog-register").fadeOut(1000);
                $("#dialog-login").fadeIn(1000);
            }
        },'json').complete(function(){
            $form.hideLoading();
        }).error(function(){
            $.jGrowl("失败,请换个用户名试试", { life: 2000,position:'bottom-left'});
            $form.hideLoading();
        });
    });


    $("#close-win-register").on("click",function(){
        $("#dialog-register").fadeOut(1000);
        $("#dialog-login").fadeIn(1000);
    });

    $("#close-win-login").on("click",function(){
        $("#dialog-login").fadeOut(1000);
        $("#dialog-register").fadeIn(1000);
    });

    // 用户登录响应
    $("#btn-submit-login").on("click",function(){
        let $form = $("#form-login");
        let _data = $form.serializeObject();
        let userName = _data['username'];
        let password = _data['password'];

        if(userName === ''){
            $.jGrowl("用户名必须填写", { life: 1000,position:'bottom-left',theme:'growl1'});
            return false;
        }
        if(!common.isEmail(userName)){
            $.jGrowl("用户名必须是邮箱", { life: 1000,position:'bottom-left',theme:'growl1'});
            return false;
        }
        //判断用户名是否合法
        password = password.trim();
        if(password === ''){
            $.jGrowl("密码必须填写", { life: 1000,position:'bottom-left'});
            return false;
        }

        $form.showLoading();
        $.post("/admin/login",_data,function(data){
            if(data.error){
                $.jGrowl(data.error, { life: 2000,position:'bottom-left'});
            }else{
                $.jGrowl("登录成功", { life: 2000,position:'bottom-left'});
            }
        },'json').complete(function(){
            $form.hideLoading();
        }).error(function(){
            $.jGrowl("服务器位置错误", { life: 2000,position:'bottom-left'});
            $form.hideLoading();
        });
    });
});
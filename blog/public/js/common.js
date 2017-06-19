define(function (require, exports, module) {
    let _ = require('underscore');

    if(!String.prototype.trim) {
        var TRIM_REG = /(^\s*)|(\s*$)/g;
        String.prototype.trim = function() { return this.replace(TRIM_REG, ''); }
    }

    // 浏览器提示
    $(function(){
        let isChrome = navigator.userAgent.toLowerCase().match(/chrome/) != null;
        if (!isChrome) {
            let element = $('#browser_notice_dialog');
            element.modal({backdrop:'static'});
        }
    });

    let fix2num = function(n) {
        return [0, n].join('').slice(-2);
    }
    let timeFormat = function(format, time) {
        let curdate = (time > 0) ? new Date(time) : new Date();
        if( format === undefined ) return curdate;
        format = format.replace(/Y/i, curdate.getFullYear());
        format = format.replace(/m/i, fix2num(curdate.getMonth() + 1));
        format = format.replace(/d/i, fix2num(curdate.getDate()));
        format = format.replace(/H/i, fix2num(curdate.getHours()));
        format = format.replace(/i/i, fix2num(curdate.getMinutes()));
        format = format.replace(/s/i, fix2num(curdate.getSeconds()));
        format = format.replace(/ms/i, curdate.getMilliseconds());
        return format;
    };

    let isEmail = function(mail){
        let filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(filter.test(mail)){
            return true
        }
        return false;
    };

    _.extend(exports, {
        fix2num: fix2num,
        timeFormat: timeFormat,
        isEmail:isEmail
    });

});
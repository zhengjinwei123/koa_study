define(function(require,exports,module){
    let _ = require("underscore");
    let $ = require("jquery");
    require("jgrowl");
    require("showLoading");
    let common = require("common");
    let hljs = require("highLight");
    let marked = require("marked");

    //加载文章类型
    function LoadArticleTypes(){
        let $el = $("body");
        $el.showLoading();
        let email = $("#id-email").text();
        $.post("/admin/articleType/fetch",{
            user:email
        },function(data) {
            if(data.error){
                $.jGrowl(data.error, { life: 2000,position:'bottom-left'});
            }else{
                let types = data.data;
                updateTypesControlView(types);
            }
        },'json').complete(function(){
            $el.hideLoading();
        }).error(function(){
            $el.hideLoading();
            $.jGrowl("服务器未知错误!", { life: 2000,position:'bottom-left'});
        });
    }
    LoadArticleTypes();

    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: true,
        sanitize: true,
        smartLists: true,
        smartypants: true,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });
    $("#work-view > .markdown-view > textarea").on('input', function(){
        let result = $(this).val();
        $("#code").html(marked(result));
        highLightBlock();
    });

    function highLightBlock(){
        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
    }

    $("textarea").on('keydown',function(e){
        if(e.keyCode === 9){
            e.preventDefault();
            let indent = '    ';
            let start = this.selectionStart;
            let end = this.selectionEnd;
            let selected = window.getSelection().toString();
            selected = indent + selected.replace(/\n/g,'\n'+indent);
            this.value = this.value.substring(0,start) + selected + this.value.substring(end);
            this.setSelectionRange(start+indent.length,start+selected.length);
        }
    });

    // 保存
    $(".btn.btn-success.btn-sm").on("click",function(){
        let articleType = $("#article-type").val();
        let articleTitle = $("#article-title").val();
        let content = $("textarea").val();

        if(articleType == -1){
            $.jGrowl("请选择一个类型!", { life: 2000,position:'bottom-left'});
            return false;
        }
        if(_.isEmpty(articleTitle)){
            $.jGrowl("请填写标题", { life: 2000,position:'bottom-left'});
            return false;
        }
        if(_.isEmpty(content)){
            $.jGrowl("文章内容不能为空", { life: 2000,position:'bottom-left'});
            return false;
        }

        let email = $("#id-email").text();
        let $el = $("html");
        $el.showLoading();

        $.post("/admin/article/add",{
            type:articleType,
            content:content,
            title:articleTitle,
            user:email
        },function(data) {
            if(data.error){
                $.jGrowl(data.error, { life: 2000,position:'bottom-left'});
            }else{
                $.jGrowl("发布成功", { life: 2000,position:'bottom-left'});
            }
        },'json').complete(function(){
            $el.hideLoading();
        }).error(function(){
            $el.hideLoading();
            $.jGrowl("服务器未知错误!", { life: 2000,position:'bottom-left'});
        });
    });

    //新增
    $("#add-article-type").on("click",function(){
        $("#dialog-add-type").css({"display":"block"});
        $("#dialog-add-type").animate({"top":"50%"});
    });
    $("#close-win-add-type").on("click",function(){
        $("#dialog-add-type").animate({"top":"-400px"});
    });

    // 新增文章类型响应
    $("#submit-add-type").on("click",function(){
        let _data = $("#form-add-type").serializeObject();
        let articleType = _data['articleType'];
        let email = $("#id-email").text();
        if(_.isEmpty(articleType) || _.isNumber(articleType) || articleType.length < 2){
            $.jGrowl("类型不合法!", { life: 2000,position:'bottom-left'});
            return false;
        }

        let $form = $("#form-add-type");
        $form.showLoading();

        $.post("/admin/articleType/add",{
            articleType:articleType.trim(),
            email:email
        },function(data) {
            if(data.error){
                $.jGrowl(data.error, { life: 2000,position:'bottom-left'});
            }else{
                let types = data.data;
                updateTypesControlView(types);
                $.jGrowl("添加成功", { life: 2000,position:'bottom-left'});
            }
        },'json').complete(function(){
            $form.hideLoading();
        }).error(function(){
            $form.hideLoading();
            $.jGrowl("服务器未知错误!", { life: 2000,position:'bottom-left'});
        });
    });

    // 更新文章类型空间内容
    function updateTypesControlView(types){
        let $types = $("#article-type");
        $types.empty();
        $types.append("<option value='-1'>请选择文章类型</option>");
        for(let i in types){
            $types.append("<option value='"+i+"'>"+types[i]+"</option>");
        }

        // 兼容 selectpicker 加载缓慢的bug
        if($types.selectpicker){
            $types.selectpicker('refresh');
        }else{
            let timer = setInterval(function(){
                if($types.selectpicker){
                    $types.selectpicker('refresh');
                    clearInterval(timer);
                }
            },10);
        }
    }
});
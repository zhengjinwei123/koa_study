define(function(require,exports,module){
    let _ = require("underscore");
    let $ = require("jquery");
    require("jgrowl");
    require("showLoading");
    let common = require("common");
    let hljs = require("highLight");
    let marked = require("marked");

    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });

    let preHtml = "<pre><code class='",afterHtml = "</code></pre>";

    $("#work-view > .markdown-view > textarea").on('input', function(){
        let list = [preHtml];
        list.push("javascript'>");
        list.push("console.log(123);");
        list.push(afterHtml);

        let result = list.join("");
        console.log(result);

        result = $(this).val();
        console.log(result)
        $("#code").html(marked(result));


        highLightBlock();
    });

    function highLightBlock(){
        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
    }
});
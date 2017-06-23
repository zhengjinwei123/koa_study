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
        breaks: true,
        pedantic: true,
        sanitize: true,
        smartLists: true,
        smartypants: true,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });
    // hljs.configure({
    //     tabReplace: '    ', // 4 spaces
    //     classPrefix: ''     // don't append class prefix
    // });
    // hljs.initHighlighting();


    // let preHtml = "<pre><code class='",afterHtml = "</code></pre>";

    $("#work-view > .markdown-view > textarea").on('input', function(){
        // let list = [preHtml];
        // list.push("javascript'>");
        // list.push("console.log(123);");
        // list.push(afterHtml);
        //
        // let result = list.join("");
        // console.log(result);
        //
        let result = $(this).val();
        // console.log(result)
        $("#code").html(marked(result));
        // $(this).html(marked(result));
        highLightBlock();
    });

    function highLightBlock(){
        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
        // $('div.code').each(function(i, block) {
        //     hljs.highlightBlock(block);
        // });
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
    })
});
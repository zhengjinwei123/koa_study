requirejs.config({
    baseUrl: '/js',
    
    map: {
        '*': {
        }
    },
    paths: {
        app:                'app',
        model:              'model',
        view:               'view',
        template:           '../template',
        common:             ['common'],
        jquery:             [ 'jquery-1.11.0.min' ],
        underscore:         [ 'underscore.min' ],
        async:              [ 'async' ],
        bootstrap:          [ 'bootstrap.min' ],
        jgrowl:             [ 'jquery.jgrowl.min' ],
        showLoading:        [ 'jquery.showLoading.min' ],
        jform:              [ 'jquery.form' ],
        datePicker:         [ 'My97DatePicker/WdatePicker' ],
        highcharts:         [ 'highcharts' ],
        bootstrapSelect:    [ 'bootstrap-select/js/bootstrap-select.min' ],
        highLight:          [ 'highlight/highlight.pack'],
        marked:             [ 'marked/marked.min']
    },
    shim: {
        'jquery':           {exports:'$'},
        'underscore':       {exports: '_'},
        'highLight':        {exports: 'hljs'},
        'bootstrap':        {deps: ['jquery']},
        'jgrowl':           {deps: ['jquery']},
        'showLoading':      {deps: ['jquery']},
        'jform':            {deps: ['jquery']},
        'highcharts':       {deps: ['jquery']},
        'bootstrapSelect':  {deps: ['jquery','bootstrap']},
        'cloneya':          {deps: ['jquery']},
        'ztree':            {deps: ['jquery']},
        'common':           {deps: ['jquery','underscore']}
    }
});

require(["jquery","highLight","marked","bootstrapSelect"],function($,hljs,marked,bootstrapSelect){
    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    hljs.initHighlightingOnLoad();

    $('.selectpicker').selectpicker({
        style: 'btn btn-default btn-sm',
        size: 4,
        iconBase: ".glyphicon .glyphicon-heart",
        liveSearch: true,
        actionsBox: true
    });
});
"use strict";

let Marked = require("marked");
let HighLight = require('highlight.js');
Marked.setOptions({
    renderer: new Marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
        return HighLight.highlightAuto(code).value;
    }
});

module.exports = Marked;
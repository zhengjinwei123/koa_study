"use strict";
let Thunkify = require("thunkify-wrap");
let Fs = require("fs");
let Path = require("path");
let Marked = require("../lib/marked");

exports.show = function *(){
    let result = yield  Thunkify(Fs.readFile, Fs)(Path.join(__dirname, "../public/me.md"));

    yield this.render('about/index', {
        title: "about me",
        content: Marked(result.toString())
    })
};
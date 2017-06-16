'use strict';

let AboutControl = require("../controllers/about");
let ArticleControl = require("../controllers/article");

module.exports = function(router){
    router.get("/about",AboutControl.show);

    router.post("/article/list",ArticleControl.list);

    router.post("article/detail",ArticleControl.detail);
};

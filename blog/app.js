"use strict";

let Path = require("path");
let Koa = require("koa");
let Router = require("koa-router");
let BodyParser = require("koa-bodyparser");
let Render = require("koa-views");
let StaticServer = require("koa-static");
let Session = require("koa-generic-session");
let SessionStore = require("koa-session-mongoose");

let BackendRoutes = require("./routes/backend");
let FrontendRoutes = require("./routes/frontend");
let ResponseMiddle = require("./middlewares/response");

let App = new Koa();

let BackendRouter = new Router({
   prefix:'/api'
});

let FrontendRouter = new Router();

App.use(function *(next){
    yield next;
});

let db = require("./db/db");
App.use(Session({
    store:SessionStore.create(),
    collection:'KoaSessions',
    connection:db,
    expires:3600*24*1000,
    model:"KoaSession"
}));

App.use(StaticServer(Path.join(__dirname,"/public")))
    .use(Render(Path.join(__dirname,"./views"),{default:'ejs'}))
    .use(ResponseMiddle())
    .use(BodyParser())
    .use(BackendRouter.routes())
    .use(BackendRouter.allowedMethods())
    .use(FrontendRouter.routes())
    .use(FrontendRouter.allowedMethods());

BackendRoutes(BackendRouter);
FrontendRoutes(FrontendRouter);

let Settings = require("./settings");
App.listen(Settings.port);



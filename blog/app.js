"use strict";

let Path = require("path");
let Koa = require("koa");
let Router = require("koa-router");
let BodyParser = require("koa-bodyparser");
let Render = require("koa-views");
let StaticServer = require("koa-static");
let Session = require("koa-generic-session");
let SessionStore = require("koa-session-mongoose");
const Convert = require('koa-convert');

let BackendRoutes = require("./routes/backend");
let FrontendRoutes = require("./routes/frontend");
let ResponseMiddle = require("./middlewares/response");

let App = new Koa();

App.keys = ['koa', 'blog'];

let BackendRouter = new Router({
   prefix:''
});

let FrontendRouter = new Router();

App.use(async (ctx,next) =>{
    console.log(ctx.request.url);
    await next();
});

let db = require("./db/db");
App.use(Convert(Session({
    store:SessionStore.create(),
    collection:'KoaSessions',
    connection:db,
    expires:3600*24*1000,
    model:"KoaSession"
})));

App.use(Convert(StaticServer(Path.join(__dirname,"/public"))))
    .use(Convert(Render(Path.join(__dirname,"./views"),{default:'ejs'})))
    .use(Convert(ResponseMiddle()))
    .use(Convert(BodyParser()))
    .use(Convert(BackendRouter.routes()))
    .use(Convert(BackendRouter.allowedMethods()))
    .use(Convert(FrontendRouter.routes()))
    .use(Convert(FrontendRouter.allowedMethods()));


BackendRoutes(BackendRouter);
FrontendRoutes(FrontendRouter);

let Settings = require("./settings");

App.on('error',(err,ctx)=>{
    console.error(err,ctx);
});
console.log("already listen on port:"+Settings.port);
App.listen(Settings.port);




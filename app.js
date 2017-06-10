var koa = require("koa");
var app = new koa();


//app.env = 'production';
//
//console.log(app)


app.use(function *(next){
   let start = new Date();
   yield next;
   var ms = new Date()-start;
   this.set('X-Response-Time',ms+'ms');
});

app.use(function *(next){
   let start = new Date();
   yield next;
   var ms = new Date()-start;
   console.log('%s %s - %s',this.method,this.url,ms);
});

app.use(function *(){
   //console.log("method:",this.method);
   //console.log("url:",this.url);
   //console.log("header:",this.header);
   //console.log("response:",this.response);
   //console.log("app:",this.app);
   //console.log("originalUrl:",this.originalUrl);

   //console.log("request:",this.request);

   //console.log("response:",this.response);

   //console.log(this.cookies);
   //this.body  = 'Hello Worldnhehe';
   //this.throw('name required', 400)
   this.body = this.request.path;
   this.body = this.request.querystring;
   this.body = this.request.hostname;
   this.body = this.request.type;
   this.body = this.request.query;

   this.response.body = "123";
   //this.response.redirect("http://www.baidu.com");
   //this.response.attachment(["./app.js"]);
});


app.on('error',function(err,context){
   console.error(err,context);
});
app.listen(3000);
app.listen(3001);
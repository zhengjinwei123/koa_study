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
   console.log("method:",this.method);
   console.log("url:",this.url);
   console.log("header:",this.header);
   console.log("response:",this.response);
   console.log("app:",this.app);
   console.log("originalUrl:",this.originalUrl);

   this.body  = 'Hello Worldnhehe';
});

app.listen(3000);
app.listen(3001);
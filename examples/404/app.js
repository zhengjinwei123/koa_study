const Koa = require('koa');

const app = module.exports = new Koa();

app.use(function *() {
  // we need to explicitly set 404 here
  // so that koa doesn't assign 200 on body=
  this.status = 404;

  switch (this.accepts('html', 'json')) {
    case 'html':
      this.type = 'html';
      this.body = '<p>Page Not Found1</p>';
      break;
    case 'json':
      this.body = {
        message: 'Page Not Found2'
      };
      break;
    default:
      this.type = 'text';
      this.body = 'Page Not Found3';
  }
});

if (!module.parent) app.listen(3000);

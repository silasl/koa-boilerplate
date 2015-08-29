var koa = require('koa');
var logger = require('koa-logger');
var views = require('koa-views');
var assets = require('koa-static');
var pageNotFound = require('../lib/middleware/error/pageNotFound');
var internalServerError = require('../lib/middleware/error/internalServerError');
var indexRoute = require('./routes/index');

var app = koa();

//logger

app.use(logger());

//assets

app.use(assets('./public'));

//jade

app.use(views('./views', {
  default: 'jade'
}));

//routes

app.use(indexRoute);

//errors

app.use(pageNotFound);
app.use(internalServerError);

//let's go!

app.listen(3000);
console.log('listening on port 3000');

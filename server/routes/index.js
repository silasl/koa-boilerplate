var route = require('koa-route');
var indexController = require('../controllers/index');

module.exports = route.get('/', indexController.index);

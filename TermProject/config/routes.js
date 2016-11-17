var app = require('../app');
var favicon = require('serve-favicon');
var express = require('express');

var routes = [
  { path: 'index', url: '/' },
  { path: 'users', url: '/users' }
];

routes.forEach(function(route) {
  var fullPath = '../routes/' +  route.path;
  var routeHandler = require(fullPath)

  app.use(route.url, routeHandler);
});

// uncomment after placing your favicon in /public
app.use(favicon('./public/favicon.ico'));
app.use(express.static('./public'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

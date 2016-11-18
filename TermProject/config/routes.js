var app = require('../app');

var routes = [
  { path: 'index',          url: '/'      },
  { path: 'authentication', url: '/auth'  },
  { path: 'users',          url: '/users' },
  { path: 'events',         url: '/events'}
];

routes.forEach(function(route) {
  var fullPath = '../routes/' + route.path;
  var routeHandler = require(fullPath)

  app.use(route.url, routeHandler);
});

// catch 404 and forward to error handler
app.use(function(_request, _response, next) {
  var error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// error handler
app.use(function(error, request, response, next) {
  // set locals, only providing error in development
  response.locals.message = error.message;
  response.locals.error = request.app.get('env') === 'development' ? error : {};

  // render the error page
  response.status(error.status || 500);
  response.render('error');
});

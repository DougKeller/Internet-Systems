var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var vendorPath = './client/bower_components/';
var scriptPath = './client/javascripts/';

gulp.task('build', function() {
  var scriptDependencies = [
    vendorPath + 'angular/angular.js',
    vendorPath + 'angular-jwt/dist/angular-jwt.js',
    vendorPath + 'angular-ui-router/release/angular-ui-router.js',
    scriptPath + 'angular_modules.js',
    scriptPath + '*.js',
    scriptPath + '**/*.js'
  ];

  return gulp.src(scriptDependencies)
             .pipe(concat('client_app.js'))
             .pipe(gulp.dest('./public'));
});
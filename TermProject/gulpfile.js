var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var vendorPath = './client/bower_components/';
var scriptPath = './client/javascripts/';

gulp.task('build', function() {
  var scriptDependencies = [
    vendorPath + 'angular/angular.js',
    scriptPath + 'angular_modules.js',
    scriptPath + '*.js',
    scriptPath + '**/*.js'
  ];

  return gulp.src(scriptDependencies)
             .pipe(concat('client_app.js'))
             .pipe(uglify())
             .pipe(gulp.dest('./public'));
});
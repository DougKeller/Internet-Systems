var gulp = require('gulp');
var concat = require('gulp-concat');
var nghtml2js = require('gulp-ng-html2js');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');

var vendorPath = './client/bower_components/';
var scriptPath = './client/javascripts/';
var stylesPath = './client/stylesheets/';
var templatePath = './client/templates/';

gulp.task('buildTemplates', function() {
  return gulp.src(templatePath + '**/*.html')
    .pipe(nghtml2js({
      moduleName: 'templates'
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(scriptPath));
});

gulp.task('buildJavascript', function() {
  var scriptDependencies = [
    vendorPath + 'angular/angular.js',
    vendorPath + 'angular-animate/angular-animate.js',
    vendorPath + 'angular-jwt/dist/angular-jwt.js',
    vendorPath + 'angular-ui-router/release/angular-ui-router.js',
    vendorPath + 'angular-bootstrap/ui-bootstrap-tpls.js',
    vendorPath + 'moment/moment.js',
    vendorPath + 'angular-moment/angular-moment.js',
    vendorPath + 'angular-datepicker/dist/angular-datepicker.js',
    scriptPath + 'templates.js',
    scriptPath + 'angular_modules.js',
    scriptPath + '*.js',
    scriptPath + '**/*.js'
  ];

  return gulp.src(scriptDependencies)
             .pipe(concat('application.js'))
             .pipe(gulp.dest('./public'));
});

gulp.task('buildStyles', function() {
  var scriptDependencies = [
    vendorPath + 'angular-bootstrap/ui-bootstrap-csp.css',
    vendorPath + 'bootstrap/dist/css/bootstrap.css',
    vendorPath + 'angular-datepicker/dist/angular-datepicker.css',
    stylesPath + '*.css',
    stylesPath + '**/*.css'
  ];

  return gulp.src(scriptDependencies)
             .pipe(concat('application.css'))
             .pipe(gulp.dest('./public'));
});

gulp.task('buildFonts', function() {
  var scriptDependencies = [
    vendorPath + 'bootstrap/dist/fonts/*.*'
  ];

  return gulp.src(scriptDependencies)
             .pipe(gulp.dest('./public/fonts'));
});

gulp.task('build', ['buildTemplates', 'buildJavascript', 'buildStyles', 'buildFonts']);

gulp.task('start', function() {
  nodemon({
    script: './bin/www',
    tasks: ['build'],
    ext: 'js ejs html css',
    ignore: ['application.js', 'application.css', 'templates.js']
  })
});

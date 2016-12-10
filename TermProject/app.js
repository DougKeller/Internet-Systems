var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

var app = express();

if (app.get('env') === 'development') {
  require('dotenv').config();
}

app.use(express.static('./public'));
app.use(favicon('./public/favicon.ico'));

module.exports = app;

require('./config');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

var app = express();

app.use(express.static('./public'));
app.use(favicon(__dirname + '/public/favicon.ico'));

module.exports = app;

require('./config');
require('dotenv').config();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

var app = express();

app.use(express.static('./public'));
app.use(favicon('./public/favicon.ico'));

module.exports = app;

require('./config');
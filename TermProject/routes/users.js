var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');

var authenticate = require('express-jwt')({ secret: process.env.JWT_SECRET, userProperty: 'userToken' });


router.get('/', authenticate, function(request, response, next) {
  User.find(function(error, users) {
    if (error) {
      return next(error);
    }
    response.json(users);
  });
});

module.exports = router;

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

router.get('/:id', authenticate, function(request, response, next) {
  var userId = request.params.id;
  User.findOne({ _id: userId }, function(error, user) {
    if (error || !user) {
      return next(error);
    }
    response.json(user);
  });
});

module.exports = router;

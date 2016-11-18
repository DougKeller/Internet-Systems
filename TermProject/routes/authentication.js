var express = require('express');
var passport = require('passport');
var router = express.Router();

var jwt = require('jsonwebtoken');
var User = require('mongoose').model('User');

router.post('/login', function(request, response, next) {
  if (!request.body.username || !request.body.password) {
    return response.status(400).json({
      message: 'Invalid Login'
    });
  }

  var authenticate = passport.authenticate('local', function(error, user, info) {
    if (error) {
      return next(error);
    }

    if (user) {
      return response.json({
        token: user.generateJWT()
      });
    } else {
      return response.status(401).json(info);
    }
  });

  authenticate(request, response, next);
});

router.post('/register', function(request, response, next){
  if (!request.body.username || !request.body.password) {
    return response.status(400).json({
      message: 'Please fill out all fields'
    });
  }

  User.findOne({ username: request.body.username }, function(error, user) {
    if (user) {
      return response.status(422).json({
        message: 'This username is already in use.'
      });
    } else {
      user = new User();
      user.firstName = request.body.firstName;
      user.lastName = request.body.lastName;
      user.username = request.body.username;
      user.setPassword(request.body.password);

      user.save(function(error) {
        if (error) {
          return next(error);
        }

        return response.json({
          token: user.generateJWT()
        });
      });
    }
  });
});

module.exports = router;

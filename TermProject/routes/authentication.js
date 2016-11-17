var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
var User = require('mongoose').model('User');

router.post('/login', function(request, response, next){
  if (!request.body.email || !request.body.password){
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

router.post('/signup', function(request, response, next){
  if (!request.body.email || !request.body.password) {
    return response.status(400).json({
      message: 'Please fill out all fields'
    });
  }

  var user = new User();
  user.email = request.body.email;
  user.setPassword(request.body.password);

  user.save(function(error) {
    if (error) {
      return next(error);
    }

    return response.json({
      token: user.generateJWT()
    });
  });
});

module.exports = router;

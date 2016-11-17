var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

var passportConfig = {
  usernameField: 'email'
};

passport.use(new LocalStrategy(
  passportConfig,
  function(email, password, done) {
    User.findOne({ email: email }, function (error, user) {
      if (error) {
        return done(error);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect login.' });
      }
      if (!user.verifyPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

var app = require('../app');
app.use(passport.initialize());
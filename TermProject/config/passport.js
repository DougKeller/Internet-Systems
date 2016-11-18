var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

// var passportConfig = {
//   usernameField: 'username'
// };

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (error, user) {
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
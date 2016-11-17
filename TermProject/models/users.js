var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  email: { type: String, lowercase: true, unique: true },
  passwordHash: String,
  salt: String
});

UserSchema.methods.passwordHashFor = function(password) {
  return crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.setPassword = function(newPassword) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.passwordHash = this.passwordHashFor(newPassword);
};

UserSchema.methods.verifyPassword = function(password) {
  return this.passwordHash === this.passwordHashFor(password);
};

UserSchema.methods.generateJWT = function() {
  var today = new Date();
  var expires = new Date(today);
  var days = 1;

  expires.setDate(today.getDate() + days);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    expires: parseInt(expires.getTime() / 1000),
  }, process.env.JWT_SECRET);
};

mongoose.model('User', UserSchema);
var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
  email: { type: String, lowercase: true, unique: true },
  password_hash: String,
  salt: String
});

mongoose.model('Event', EventSchema);
var mongoose = require('mongoose');

require('../models/users');
require('../models/events');

mongoose.connect('mongodb://localhost/calendar');
mongoose.Promise = require('bluebird');
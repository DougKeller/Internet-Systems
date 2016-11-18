var mongoose = require('mongoose');

require('../models/users');
require('../models/events');

mongoose.connect(process.env.DATABASE);
mongoose.Promise = require('bluebird');
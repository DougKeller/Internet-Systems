var mongoose = require('mongoose');

require('../models/users');

mongoose.connect('mongodb://localhost/calendar');

var express = require('express');
var router = express.Router();
var moment = require('moment');

var mongoose = require('mongoose');
var Event = mongoose.model('Event');

var authenticate = require('express-jwt')({ secret: process.env.JWT_SECRET, userProperty: 'userToken' });

router.post('/', authenticate, function(request, response, next) {
  var permittedAttributes = [
    'title',
    'startTime',
    'endTime',
    'description',
    'recurringStart',
    'recurringEnd',
    'recurringDays',
    'owner'
  ];

  var event = new Event();
  permittedAttributes.forEach(attr => event[attr] = request.body[attr]);
  event.createdAt = event.updatedAt = new Date();

  if (!event.startTime) {
    return response.status(422).json({
      start_time: 'cant\'t be blank'
    });
  }
  if (!event.endTime) {
    event.endTime = event.startTime.clone();
  }

  event.save(function(error) {
    if (error) {
      return next(error);
    }

    return response.json(event);
  })
});

router.get('/', authenticate, function(request, response, next) {
  Event.find(function(error, events) {
    if (error) {
      return next(error);
    }
    response.json(events);
  });
});

router.get('/:id', authenticate, function(request, response, next) {
  var userId = request.params.id;
  Event.findOne({ _id: userId }, function(error, user) {
    if (error || !user) {
      return next(error);
    }
    response.json(user);
  });
});

module.exports = router;

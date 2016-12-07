var express = require('express');
var router = express.Router();
var moment = require('moment');

var mongoose = require('mongoose');
var Event = mongoose.model('Event');

var authenticate = require('express-jwt')({ secret: process.env.JWT_SECRET, userProperty: 'userToken' });

function saveEvent(event, request, response, next) {
  var permittedAttributes = [
    'title',
    'startTime',
    'endTime',
    'description',
    'recurringStart',
    'recurringEnd',
    'recurringDays'
  ];

  permittedAttributes.forEach(attr => event[attr] = request.body[attr]);

  if (event._id) {
    event.createdAt = event.updatedAt = new Date();
  } else {
    event.updatedAt = new Date();
  }

  event.ownerId = request.userToken.id;

  if (!event.startTime) {
    return response.status(422).json({
      start_time: 'cant\'t be blank'
    });
  }

  event.save(function(error) {
    if (error) {
      return next(error);
    }

    return response.json(event);
  });
};

router.post('/', authenticate, function(request, response, next) {
  var event = new Event();
  return saveEvent(event, request, response, next);
});

router.put('/:id', authenticate, function(request, response, next) {
  Event.findOne({ _id: request.params.id }, function(error, event) {
    if (error || !event) {
      return next(error);
    }
    return saveEvent(event, request, response, next);
  });
});

router.get('/', authenticate, function(request, response, next) {
  Event.find({ ownerId: request.userToken.id }, function(error, events) {
    if (error) {
      return next(error);
    }
    response.json(events);
  });
});

router.delete('/:id', authenticate, function(request, response, next) {
  Event.remove({_id: request.params.id}, function(error, events) {
    if (error) {
      return next(error);
    }
    response.json(true);
  });
});

module.exports = router;

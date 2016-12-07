var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
  title: String,
  createdAt: Date,
  updatedAt: Date,
  startTime: Date,
  endTime: Date,
  description: String,
  recurringStart: Date,
  recurringEnd: Date,
  recurringDays: { type: Number, default: 0 },
  ownerId: String
});

EventSchema.set('toJSON', {
  transform: function(_doc, event, _options) {
    delete event.__v;
  }
});

mongoose.model('Event', EventSchema);
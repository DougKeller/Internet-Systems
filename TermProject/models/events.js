var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
  title: String,
  startTime: Date,
  endTime: Date,
  description: String,
  recurringStart: Date,
  recurringEnd: Date,
  recurringDays: { type: Number, default: 0 },
  owner: { type: Schema.Types.ObjectId, ref: 'User' }
});

EventSchema.set('toJSON', {
  transform: function(_doc, event, _options) {
    delete event.__v;
  }
});

mongoose.model('Event', EventSchema);
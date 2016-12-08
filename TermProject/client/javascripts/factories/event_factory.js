angular.module('calendar').factory('EventFactory', ['$http', '$q', '$filter', 'CalendarDays', 'moment',
  function($http, $q, $filter, CalendarDays, moment) {
    function Event(data) {
      angular.extend(this, data);
      var dateFields = ['startTime', 'endTime', 'recurringStart', 'recurringEnd'];
      dateFields.forEach((field) => {
        this[field] = this[field] ? moment(this[field]) : undefined
      });
    }

    Event.find = function(id) {
      var url = '/events/' + id;
      var deferred = $q.defer();

      $http.get(url).then(function(response) {
        var event = new Event(response.data);
        deferred.resolve(event);
      }, function(error) {
        deferred.reject(error);
      });

      return deferred.promise;
    };

    Event.query = function(params) {
      var url = $filter('queryString')('/events', params);
      var deferred = $q.defer();

      $http.get(url, params).then(function(response) {
        var events = response.data.map(event => new Event(event));
        deferred.resolve(events);
      }, function(error) {
        deferred.reject(error);
      });

      return deferred.promise;
    };

    Event.prototype.save = function() {
      if (this.isNew()) {
        var url = '/events';
        return $http.post(url, this)
      } else {
        var url = '/events/' + this._id;
        return $http.put(url, this);
      }
    };

    Event.prototype.delete = function() {
      var url = '/events/' + this._id;
      return $http.delete(url, this);
    };

    Event.prototype.isNew = function() {
      return angular.isUndefined(this._id);
    };

    Event.prototype.isOccurringWithinXHours = function(date, hours) {
      var rangeStart = moment();
      var rangeEnd = moment().add(hours, 'hours');
      var start = this.startTime.clone().set({
        year: date.year(),
        month: date.month(),
        date: date.date()
      });
      return start.isBetween(rangeStart, rangeEnd);
    };

    Event.prototype.isOccurringRelativeTo = function(date) {
      var now = moment();
      var oneHourFromNow = moment().add(1, 'hours');
      var end = this.endTime.clone().set({
        year: date.year(),
        month: date.month(),
        date: date.date()
      });
      return end.isBetween(now, oneHourFromNow);
    };

    Event.prototype.hasOccurredRelativeTo = function(date) {
      var end = this.endTime.clone().set({
        year: date.year(),
        month: date.month(),
        date: date.date()
      });
      return moment().isAfter(end);
    }

    Event.prototype.cssClass = function(date) {
      if (this.isOccurringWithinXHours(date, 1)) {
        return 'occurring-soon';
      }
      if (this.isOccurringWithinXHours(date, 12)) {
        return 'occurring-later';
      }
      if (this.isOccurringRelativeTo(date)) {
        return 'occurring';
      }
      if (this.hasOccurredRelativeTo(date)) {
        return 'occurred';
      };
    };

    Event.prototype.binComp = function(day) {
      return (this.recurringDays & Math.pow(2, day)) > 0;
    };

    var inRange = function(date, min, max) {
      return date.isBetween(min, max, null, '[)');
    };

    var doubleInRange = function(dateMin, dateMax, min, max) {
      var iRange = inRange(dateMin, min, max) || inRange(dateMax, min, max);
      var oRange = inRange(min, dateMin, dateMax) && inRange(max, dateMin, dateMax);
      return iRange || oRange;
    };

    Event.prototype.recurring = function() {
      return angular.isDefined(this.recurringStart) || angular.isDefined(this.recurringEnd);
    };

    Event.prototype.startsAt = function(date, period) {
      if (period === 'day') {
        return true;
      }

      var eventDate = this.startTime.clone().set({
        year: date.year(),
        month: date.month(),
        date: date.date()
      });
      var rangeStart = date.clone().startOf(period);
      var rangeEnd = date.clone().endOf(period);

      return inRange(eventDate, rangeStart, rangeEnd);
    };

    Event.prototype.occursOn = function(date, period) {
      if (this.startTime.isSame(this.endTime)) {
        var start = date.clone().startOf(period);
        var end = date.clone().endOf(period);
        return inRange(this.startTime, start, end);
      }

      var binaryDay = Math.pow(2, date.day());
      var matchesDay = (this.recurringDays & binaryDay) > 0;

      if (!matchesDay && !doubleInRange(this.startTime, this.endTime, date.clone().startOf('day'), date.clone().endOf('day'))) {
        return false;
      }

      var start = this.startTime.clone().set({
        year: date.year(),
        month: date.month(),
        date: date.date()
      }).startOf(period);
      var end = this.endTime.clone().set({
        year: date.year(),
        month: date.month(),
        date: date.date()
      });

      var recStart = this.recurringStart || moment().subtract(1000, 'years');
      var recEnd = this.recurringEnd || moment().add(1000, 'years');

      return inRange(date, start, end) && (!this.recurring() || inRange(date, recStart, recEnd));
    };

    return Event;
  }
]);
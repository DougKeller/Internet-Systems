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
      var url = '/events';
      return $http.post(url, this)
    };

    Event.prototype.isNew = function() {
      return angular.isUndefined(this.id);
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

    Event.prototype.occursOn = function(date, period) {
      function inRange(date, start, end, inclusive) {
        if (inclusive) {
          return date.isBetween(start, end, null, '[]');
        } else {
          return date.isBetween(start, end);
        }
      }
      function onDoubleRange(min, max, start, end) {
        var isInRange = inRange(min, start, end, true) || inRange(min, start, end);
        var isOutRange = min.isBefore(start) && max.isAfter(end);
        return isInRange || isOutRange;
      }

      var start = date.clone().startOf(period);
      var end = date.clone().endOf(period);
      var rangesMatch = onDoubleRange(this.startTime, this.endTime, start, end);

      if (rangesMatch) {
        return true;
      }
      if (!this.recurringStart && !this.recurringEnd) {
        return false;
      }

      start = this.recurringStart || moment().add(2000, 'years');
      end = this.recurringEnd || moment().subtract(2000, 'years');
      var inRecurringRange = inRange(date, start, end, true);

      if (!inRecurringRange) {
        return false;
      }
      if (period === 'day') {
        var binaryDay = Math.pow(2, date.day());
        return (this.recurringDays & binaryDay) > 0;
      }

      var newDate = date.clone().year(this.startTime.year()).month(this.startTime.month()).day(this.startTime.day());
      return inRange(newDate, this.startTime, this.endTime, true) && this.occursOn(date, 'day');
    };

    return Event;
  }
]);
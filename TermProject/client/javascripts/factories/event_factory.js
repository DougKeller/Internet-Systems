angular.module('calendar').factory('EventFactory', ['$http', '$q', '$filter', 'CalendarDays', 'moment',
  function($http, $q, $filter, CalendarDays, moment) {
    function Event(data) {
      angular.extend(this, data);
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

    Event.prototype.isOccurringSoonRelativeTo = function(date) {
      var now = moment();
      var oneHourFromNow = moment().add(1, 'hours');
      var start = this.startTime.clone().set({
        year: date.year(),
        month: date.month(),
        date: date.date()
      });
      return start.isBetween(now, oneHourFromNow);
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
      if (this.isOccurringSoonRelativeTo(date)) {
        return 'occurring-soon';
      }
      if (this.hasOccurredRelativeTo(date)) {
        return 'occurred';
      };
    };

    Event.prototype.occursOn = function(date, period) {
      console.log(period);
      this.startTime = moment();
      this.endTime = moment();
      this.recurringDays = CalendarDays.MONDAY | CalendarDays.SATURDAY;
      console.log(this.recurringDays);
      function inRange(date, start, end) {
        return date.isSameOrAfter(start) && date.isSameOrBefore(end);
      }

      var start = date.clone().startOf(period);
      var end = date.clone().endOf(period);
      var inRange = inRange(this.startTime, start, end) || inRange(this.endTime, start, end);

      var fn = (d) => d.format('MMM DD, YYYY');
      console.log(fn(this.startTime));
      console.log(fn(this.endTime));
      console.log(fn(date));
      console.log('----');

      if (inRange) {
        return true;
      }

      var dateYear = date.year();
      var inRecurringRange;
      if (this.recurringStart && this.recurringEnd) {
        inRecurringRange = inRange(date, this.recurringStart.clone(), this.recurringEnd.clone());
      } else if (this.recurringStart) {
        inRecurringRange = inRange(date, this.recurringStart.clone(), moment().year(dateYear + 1));
      } else if (this.recurringEnd) {
        inRecurringRange = inRange(date, moment().year(dateYear - 1), this.recurringEnd.clone());
      }

      if ((this.recurringStart || this.recurringEnd) && !inRecurringRange) {
        console.log('returning false');
        return false;
      }

      if (period === 'day') {
        var binaryDay = Math.pow(2, date.day());
        return (this.recurringDays & binaryDay) > 0;
      }

      console.log('here');
      var newDate = date.clone().year(this.startTime.year()).month(this.startTime.month()).day(this.startTime.day());
      return inRange(newDate, this.startTime, this.endTime) && this.occursOn(date, 'day');
    };

    return Event;
  }
]);
angular.module('calendar').controller('CalendarController', ['$scope', '$interval', '$stateParams', '$state', '$filter', 'EventFactory', 'currentUser', 'moment', 'sref', 'EventModal',
  function($scope, $interval, $stateParams, $state, $filter, EventFactory, currentUser, moment, sref, EventModal) {
    var params, current;

    function setCurrentDates() {
      var dates = current.dates = [current.start.clone()];
      if (current.period === 'day') {
        return;
      }

      var firstDate = () => dates[0].clone();
      var lastDate = () => dates[dates.length - 1].clone();

      while (firstDate().day() !== 0) {
        var subtracted = firstDate().subtract(1, 'days');
        dates.unshift(subtracted);
      }
      while (lastDate().endOf('day').isBefore(current.end)) {
        dates.push(lastDate().add(1, 'days'));
      }
      while (lastDate().day() !== 6) {
        dates.push(lastDate().add(1, 'days'));
      }

      if (current.period === 'month') {
        var weeks = [];

        while (dates.length > 0) {
          weeks.push(dates.splice(0, 7));
        }

        delete current.dates;
        current.weeks = weeks;
      }
    }

    function setDateDivisions() {
      if (current.period === 'month') {
        return;
      }
      current.dates.forEach(function(date) {
        date.subdivisions = [];
        for (var i = 1; i <= 24; i += 1) {
          date.subdivisions.push(date.clone().add(i, 'hours'));
        }
      });
    }

    function setTitle() {
      switch (current.period) {
        case 'day':
          $scope.title = current.start.format('MMMM D, YYYY');
          break;
        case 'week':
          var start = current.start.format('MMM D, YYYY');
          var end = current.end.format('MMM D, YYYY');
          $scope.title = start + ' - ' + end;
          break;
        case 'month':
          $scope.title = current.start.format('MMMM YYYY');
          break;
      }
    }

    function initialize(date, period) {
      period = period || 'week';
      if (date) {
        date = moment(date, 'MM-DD-YYYY').startOf(period);
      } else {
        date = moment().startOf(period);
      }

      params = {
        period: period,
        date: date.format('MM-DD-YYYY')
      };

      current = {
        start: date.clone(),
        end: date.endOf(period).clone(),
        templateUrl: 'calendar_' + period + '.html',
        period: period
      };

      $scope.customDate = date.clone().startOf(period);
      $scope.current = current;
      setTitle();
      setCurrentDates();
      setDateDivisions();

      var startView = period === 'month' ? 'month' : 'day';
      $scope.pickerConfig = {
        minView: startView,
        startView: startView,
        modelType: 'moment'
      };

      $scope.loadEvents();
    }

    $scope.loadEvents = function() {
      EventFactory.query(params).then(function(events) {
        $scope.events = events;
      });
    };

    $scope.setDate = function(date) {
      $state.go(sref('calendar'), params, { notify: false });
      initialize(moment(date).format('MM-DD-YYYY'), params.period);
    };

    $scope.changeDate = function(amount) {
      var newDate = current.start.add(amount, params.period + 's');
      $scope.setDate(newDate);
    };

    $scope.createEvent = function(date) {
      var newEvent = new EventFactory({
        startTime: date.clone(),
        endTime: date.clone().add(1, 'hours')
      });
      EventModal.edit(newEvent).then($scope.loadEvents);
    };

    $scope.showEvent = function(event) {
      EventModal.show(event).then($scope.loadEvents);
    };

    $scope.eventsForDate = function(date, period) {
      if ($scope.events) {
        console.log($scope.events[0].occursOn(date, period));
      }
      return $filter('filter')($scope.events, (event) => event.occursOn(date, period));
    };

    initialize($stateParams.date, $stateParams.period);
  }
]);
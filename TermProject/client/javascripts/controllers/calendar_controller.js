angular.module('calendar').controller('CalendarController', ['$scope', '$interval', '$stateParams', '$state', 'EventFactory', 'currentUser', 'moment', 'sref',
  function($scope, $interval, $stateParams, $state, EventFactory, currentUser, moment, sref) {
    var options;

    (function() {
      var period = $stateParams.period || 'week';
      var date = $stateParams.date || moment().startOf(period).format('MM-DD-YYYY');
      options = {
        period: period,
        date: date
      };
    })();

    $scope.period = () => { return options.period };
    $scope.startDate = () => { return moment(options.date, 'MM-DD-YYYY').startOf(options.period); };
    $scope.endDate = () => { return moment(options.date, 'MM-DD-YYYY').endOf(options.period); };
    $scope.customDate = $scope.startDate().toDate();

    $scope.loadEvents = function() {
      EventFactory.query(options).then(function(events) {
        $scope.events = events;
      });
    };
    $scope.loadEvents();

    $scope.changeDate = function(amount) {
      var date = $scope.startDate();
      var newDate = date.add(amount, options.period + 's');

      $scope.customDate = newDate.toDate();
      options.date = newDate.format('MM-DD-YYYY');
      $state.go(sref('calendar'), options, { notify: false });
      $scope.loadEvents();
    };

    $scope.setDate = function(date) {
      options.date = moment(date).format('MM-DD-YYYY');
      $state.go(sref('calendar'), options, { notify: false });
      $scope.loadEvents();
    };

    $scope.dateRange = function() {
      if (options.period === 'day') {
        return $scope.startDate().format('MMM DD, YYYY');
      } else {
        var start = $scope.startDate().format('MMM DD, YYYY');
        var end = $scope.endDate().format('MMM DD, YYYY');
        return start + ' - ' + end;
      }
    };

    $scope.visibleDates = function(row) {
      var date = $scope.startDate();
      var dates = [];
      while (date.isSameOrBefore($scope.endDate())) {
        dates.push(date.clone());
        date = date.add(1, 'day');
      }
      return dates;
    };

    var monthDates = {};
    $scope.monthDates = function() {
      if (monthDates[$scope.startDate().format()]) {
        return monthDates[$scope.startDate().format()];
      }

      var date = $scope.startDate();
      var dates = [[]];
      var currentRow = 0;

      while (date.isSameOrBefore($scope.endDate())) {
        dates[currentRow].push(date.clone());
        date = date.add(1, 'days');
        if (date.day() === 0) {
          dates.push([]);
          currentRow += 1;
        }
      }

      while (dates[0][0].day() !== 0) {
        dates[0].unshift(dates[0][0].clone().subtract(1, 'day'))
      }

      var finalRow = dates.length - 1;
      while (dates[finalRow].length < 7) {
        var finalIndex = dates[finalRow].length - 1;
        var finalDate = dates[finalRow][finalIndex].clone();
        dates[finalRow].push(finalDate.add(1, 'day'))
      }

      monthDates[$scope.startDate().format()] = dates;

      return dates;
    };
  }
]);
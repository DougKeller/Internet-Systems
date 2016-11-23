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

    $scope.loadEvents = function() {
      EventFactory.query(options).then(function(events) {
        $scope.events = events;
      });
    };
    $scope.loadEvents();

    $scope.changeDate = function(amount) {
      var date = moment(options.date, 'MM-DD-YYYY');
      var newDate = date.add(amount, options.period + 's');

      options.date = newDate.format('MM-DD-YYYY');
      $state.go(sref('calendar'), options, { notify: false });
      $scope.loadEvents();
    };
  }
]);
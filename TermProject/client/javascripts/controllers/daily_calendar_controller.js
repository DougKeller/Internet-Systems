angular.module('calendar').controller('DailyCalendarController', ['$scope', '$stateParams', 'EventFactory', 'moment',
  function($scope, $stateParams, EventFactory, moment) {
    var date = $stateParams.date || moment().format('MM-DD-YYYY');


    $scope.setEvents = function(date, period) {
      var params = {
        start: moment(date).startOf(period).format(),
        end: moment(date).endOf(period).format()
      };

      EventFactory.query(date).then(function(events) {
        $scope.events = events;
      }, function(error) {

      });
    };

    $scope.setEvents(moment());
  }
]);
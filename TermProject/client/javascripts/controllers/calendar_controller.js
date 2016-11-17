angular.module('calendar').controller('CalendarController', ['$scope', '$interval', 'currentUser', 'moment',
  function($scope, $interval, currentUser, moment) {
    $interval(function() {
      $scope.greeting = moment().format();
    }, 1000);
    $scope.currentUser = currentUser;
  }
]);
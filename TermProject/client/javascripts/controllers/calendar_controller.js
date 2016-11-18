angular.module('calendar').controller('CalendarController', ['$scope', '$interval', '$state', 'EventFactory', 'currentUser', 'moment', 'NotificationService',
  function($scope, $interval, $state, EventFactory, currentUser, moment, NotificationService) {

    NotificationService.success(currentUser.name + '!', 'Welcome back,');

    var loadEvents = function() {
      EventFactory.query().then(function(events) {
        $scope.events = events;
      });
    };
    loadEvents();

    $scope.addNewEvent = function() {
      $scope.newEvent = new EventFactory({
        owner: currentUser
      });
    };

    $scope.cancelNewEvent = function() {
      $scope.newEvent = undefined;
    };

    $scope.saveEvent = function() {
      $scope.newEvent.save().then(function() {
        loadEvents();
        $scope.cancelNewEvent();
      }, function(error) {
        $scope.error = error.message;
      });
    };
  }
]);
angular.module('calendar').controller('EventModalController', ['$scope', 'event', 'defaultState', 'EventFactory', 'NotificationService',
  function($scope, event, defaultState, EventFactory, NotificationService) {
    $scope.state = defaultState;
    $scope.switchState = (state) => $scope.state = state;

    $scope.pickerConfig = { modelType: 'moment' };

    $scope.title = function() {
      if ($scope.state === 'multiple') {
        return 'View Events';
      }
      if ($scope.state === 'view') {
        return $scope.event.title;
      }
      if (event.isNew()) {
        return 'Create an Event';
      }
      return 'Edit ' + event.title;
    };

    $scope.subtitle = function() {
      if ($scope.state === 'view') {
        var start = $scope.event.startTime ? $scope.event.startTime.format('MMMM D, YYYY h:mm a') : '?';
        var end = $scope.event.endTime ? $scope.event.endTime.format('MMMM D, YYYY h:mm a') : '?';
        return start + ' - ' + end;
      }
    };

    $scope.save = function() {
      $scope.event.save().then(function() {
        NotificationService.success($scope.event.title, 'was saved.');
        $scope.$close();
      }, function() {
        NotificationService.error();
      });
    };

    $scope.view = function(viewedEvent) {
      $scope.event = viewedEvent;
      $scope.originalEvent = angular.copy(viewedEvent);
      $scope.switchState('view');
    };

    $scope.edit = function(editedEvent) {
      $scope.event = editedEvent;
      $scope.originalEvent = angular.copy(editedEvent);
      $scope.switchState('edit');
    };

    $scope.cancel = function() {
      if ($scope.events) {
        $scope.switchState('multiple');
      } else if ($scope.event.isNew()) {
        $scope.$close();
      } else {
        $scope.event = $scope.originalEvent;
        $scope.switchState('view');
      }
    };

    if (Array.isArray(event)) {
      if (event.length === 0) {
        event = new EventFactory();
        $scope.switchState('edit');
      } else if (event.length === 1) {
        event = event[0];
      } else {
        $scope.switchState('multiple');
        $scope.events = event;
        event = event[0];
      }
    }

    $scope.event = angular.copy(event);
    $scope.originalEvent = angular.copy(event);
  }
]);
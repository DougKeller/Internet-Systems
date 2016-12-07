angular.module('calendar').controller('EventModalController', ['$scope', 'event', 'defaultState',
  function($scope, event, defaultState) {

    $scope.state = defaultState;
    $scope.switchState = (state) => $scope.state = state;
    $scope.currentState = function() {
      if ($scope.state === 'show') {
        return 'Show';
      }
      return event.isNew() ? 'Create' : 'Edit';
    };
  }
]);
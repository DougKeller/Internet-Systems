angular.module('calendar').controller('RegisterController', ['$scope', '$state', '$http', 'NotificationService',
  function($scope, $state, $http, NotificationService) {
    $scope.user = {};

    $scope.register = function() {
      if ($scope.user.password !== $scope.confirmPassword) {
        $scope.error = 'Passwords do not match.';
        return;
      }

      $http.post('/auth/register', $scope.user).then(function(response) {
        NotificationService.success('Account created!');
        $state.go('root.login');
      }, function(error) {
        $scope.error = error.data.message;
      });
    };
  }
]);
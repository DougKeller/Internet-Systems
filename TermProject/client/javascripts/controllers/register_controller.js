angular.module('calendar').controller('RegisterController', ['$scope', '$state', '$http',
  function($scope, $state, $http) {
    $scope.user = {};

    $scope.register = function() {
      $http.post('/auth/register', $scope.user).then(function(response) {
        $state.go('login');
      }, function(error) {
        $scope.error = error.data.message;
      });
    };
  }
]);
angular.module('calendar').controller('LoginController', ['$scope', '$http', '$state',
  function($scope, $http, $state) {
    $scope.user = {};

    var existingToken = localStorage.getItem('userToken');
    if (existingToken) {
      $state.go('calendar');
    }

    $scope.login = function() {
      $http.post('/auth/login', $scope.user).then(function(response) {
        localStorage.setItem('userToken', response.data.token);

        $state.go('calendar');
      }, function(error) {
        $scope.error = error.data.message;
      });
    };
  }
]);
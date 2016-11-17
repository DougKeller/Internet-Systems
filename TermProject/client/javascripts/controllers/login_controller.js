angular.module('calendar').controller('LoginController', ['$scope', '$http', '$state', 'jwtHelper',
  function($scope, $http, $state, jwtHelper) {
    $scope.user = {};

    $scope.login = function() {
      localStorage.removeItem('userToken');

      $http.post('/auth/login', $scope.user).then(function(response) {
        localStorage.setItem('userToken', response.data.token);

        $state.go('a.calendar');
      }, function(error) {
        $scope.error = error.data.message;
      });
    };
  }
]);
angular.module('calendar').controller('LoginController', ['$scope', '$http',
  function($scope, $http) {
    $scope.foo = 'bar';

    $scope.login = function() {
      console.log('logging in');

      var loginParams = {
        email: $scope.email,
        password: $scope.password
      };

      $http.post('/login', loginParams).then(function(response) {
        console.log(response);
      }, function(error) {
        console.log('Error:', error);
      });
    };
  }
]);
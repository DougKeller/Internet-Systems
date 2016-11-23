angular.module('calendar').controller('LoginController', ['$scope', '$http', '$state', 'NotificationService', 'jwtHelper', 'sref',
  function($scope, $http, $state, NotificationService, jwtHelper, sref) {
    $scope.user = {};

    var getCurrentUserToken = function() {
      var token = localStorage.getItem('userToken');
      if (token) {
        return jwtHelper.decodeToken(token);
      }
    };

    if (getCurrentUserToken()) {
      var expired = Date.now() - getCurrentUserToken().expires <= 0;
      if (!expired) {
        $state.go(sref('calendar'));
      }
    }

    $scope.login = function() {
      localStorage.removeItem('userToken');

      $http.post('/auth/login', $scope.user).then(function(response) {
        localStorage.setItem('userToken', response.data.token);
        var name = getCurrentUserToken().name;

        NotificationService.success('Welcome back,', name + '!');
        $state.go(sref('calendar'));
      }, function(error) {
        $scope.error = error.data.message;
      });
    };
  }
]);
angular.module('calendar').controller('NavigationController', ['$scope', '$state', 'jwtHelper',
  function($scope, $state, jwtHelper) {
    var decodedToken = function() {
      var userToken = localStorage.getItem('userToken');
      if (!userToken) {
        return undefined;
      }
      var token = jwtHelper.decodeToken(userToken);
      return token;
    };

    $scope.isLoggedIn = function() {
      if (!decodedToken()) {
        return false;
      }
      return true;
    };

    $scope.currentUserName = function() {
      if ($scope.isLoggedIn()) {
        return decodedToken().name;
      }
    };

    $scope.logout = function() {
      localStorage.removeItem('userToken');
      $state.go('root.login');
    };
  }
]);
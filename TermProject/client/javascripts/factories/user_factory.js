angular.module('calendar').factory('UserFactory', ['$http', '$q', 'jwtHelper',
  function($http, $q, jwtHelper) {
    function User(data) {
      angular.extend(this, data);
    }

    User.find = function(id) {
      var url = '/users/' + id;
      var deferred = $q.defer();

      $http.get(url).then(function(response) {
        var user = new User(response.data);
        deferred.resolve(user);
      }, function(error) {
        deferred.reject(error);
      });

      return deferred.promise;
    };

    User.loadCurrentUser = function() {
      var userToken = localStorage.getItem('userToken');
      var decodedToken = jwtHelper.decodeToken(userToken);

      if (!decodedToken) {
        return $q.reject();
      }

      var userId = decodedToken.id;
      return this.find(userId);
    };

    return User;
  }
]);
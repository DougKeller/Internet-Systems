angular.module('calendar').factory('AuthenticationInterceptor', ['$q', '$rootScope',
  function($q, $rootScope) {
    return {
      responseError: function(response) {
        var matchesAuthenticatePath = response.config && response.config.url.match(new RegExp('/auth/login'));
        if (!matchesAuthenticatePath && response.status === 401) {
          $rootScope.$broadcast('NotAuthorized');
        }
        return $q.reject(response);
      }
    };
  }
]);

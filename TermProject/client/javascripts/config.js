angular.module('calendar').config(['$stateProvider', '$urlRouterProvider', 'jwtInterceptorProvider', '$httpProvider',
  function($stateProvider, $urlRouterProvider, jwtInterceptorProvider, $httpProvider) {

    jwtInterceptorProvider.tokenGetter = [function() {
      return localStorage.getItem('userToken');
    }];
    $httpProvider.interceptors.push('jwtInterceptor');
    $httpProvider.interceptors.push('AuthenticationInterceptor');

    $urlRouterProvider.otherwise('/login');

    $stateProvider.state('root', {
      abstract: true,
      views: {
        notification: {
          templateUrl: 'templates/notification.html'
        },
        navigation: {
          controller: 'NavigationController',
          templateUrl: 'templates/navigation.html'
        },
        content: {
          template: '<ui-view></ui-view>'
        }
      }
    });
    $stateProvider.state('root.login', {
      url: '/login',
      parent: 'root',
      controller: 'LoginController',
      templateUrl: 'templates/login.html',
    });
    $stateProvider.state('root.register', {
      url: '/register',
      parent: 'root',
      controller: 'RegisterController',
      templateUrl: 'templates/register.html'
    });

    $stateProvider.state('root.authenticated', {
      abstract: true,
      parent: 'root',
      template: '<ui-view></ui-view>',
      resolve: {
        currentUser: function(UserFactory, $q) {
          var deferred = $q.defer();

          UserFactory.loadCurrentUser().then(function(user) {
            deferred.resolve(user);
          }, function() {
            $state.go('root.login');
            deferred.reject();
          });

          return deferred.promise;
        }
      }
    });
    $stateProvider.state('root.authenticated.calendar', {
      url: '/',
      parent: 'root.authenticated',
      controller: 'CalendarController',
      templateUrl: 'templates/calendar.html'
    });
  }
]).run(['$rootScope', '$state', function($rootScope, $state) {
  $rootScope.$on('NotAuthorized', function() {
    $state.go('root.login');
  });
}]);

angular.module('calendar').config(['$stateProvider', '$urlRouterProvider', 'jwtInterceptorProvider', '$httpProvider',
  function($stateProvider, $urlRouterProvider, jwtInterceptorProvider, $httpProvider) {

    jwtInterceptorProvider.tokenGetter = [function() {
      return localStorage.getItem('userToken');
    }];
    $httpProvider.interceptors.push('jwtInterceptor');

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('login', {
      url: '/login',
      controller: 'LoginController',
      templateUrl: 'templates/login.html'
    });
  }
]);

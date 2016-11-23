angular.module('calendar').config(['$stateProvider', '$urlRouterProvider', 'jwtInterceptorProvider', 'srefProvider', '$httpProvider', '$states',
  function($stateProvider, $urlRouterProvider, jwtInterceptorProvider, srefProvider, $httpProvider, $states) {

    jwtInterceptorProvider.tokenGetter = [function() {
      return localStorage.getItem('userToken');
    }];
    $httpProvider.interceptors.push('jwtInterceptor');
    $httpProvider.interceptors.push('AuthenticationInterceptor');

    $urlRouterProvider.otherwise('/login');

    $states.initialize($stateProvider);
    srefProvider.setSrefs($states.sref());
  }
]).run(['$rootScope', '$state', 'sref',
  function($rootScope, $state, sref) {
    $rootScope.$on('NotAuthorized', function() {
      $state.go(sref('login'));
    });
  }
]);

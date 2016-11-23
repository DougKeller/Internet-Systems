angular.module('calendar').service('NotificationService', ['$rootScope', '$timeout',
  function($rootScope, $timeout) {
    var showNotification = function(title, message, type) {
      $rootScope.notification = {
        title: title,
        message: message,
        type: type
      };
      $timeout($rootScope.closeNotification, 3000);
    };

    this.success = function(message, title) {
      showNotification(message, title, 'success');
    };
    this.info = function(message, title) {
      showNotification(message, title, 'info');
    };
    this.error = function(message, title) {
      showNotification(message, title, 'danger');
    };
    this.warn = function(message, title) {
      showNotification(message, title, 'warning');
    };

    $rootScope.closeNotification = function() {
      delete $rootScope.notification;
    };
  }
]);
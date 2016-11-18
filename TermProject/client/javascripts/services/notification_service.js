angular.module('calendar').service('NotificationService', ['$rootScope',
  function($rootScope) {
    var showNotification = function(message, title, type) {
      $rootScope.notification = {
        message: message,
        title: title,
        type: type
      };
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
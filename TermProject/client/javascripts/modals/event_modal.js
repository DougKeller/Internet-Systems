angular.module('calendar').factory('EventModal', ['$q', '$uibModal',
  function($q, $uibModal) {
    function EventModal() {}

    var options = function(event, defaultState) {
      return {
        resolve: {
          event: () => event,
          defaultState: () => defaultState
        },
        controller: 'EventModalController',
        templateUrl: 'event_modal.html'
      };
    };

    EventModal.show = function(event) {
      var deferred = $q.defer();

      var modal = $uibModal.open(options(event, 'view'));
      modal.result.then(deferred.resolve, deferred.reject);

      return deferred.promise;
    };

    EventModal.edit = function(event) {
      var deferred = $q.defer();

      var modal = $uibModal.open(options(event, 'edit'));
      modal.result.then(deferred.resolve, deferred.reject);

      return deferred.promise;
    };

    return EventModal;
  }
]);
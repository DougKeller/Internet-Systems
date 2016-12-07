angular.module('calendar').factory('EventModal', ['$q', '$uibModal',
  function($q, $uibModal) {
    function EventModal() {}

    var options = function(event, defaultState, defaultDate) {
      return {
        resolve: {
          event: () => event,
          defaultState: () => defaultState,
          defaultDate: () => defaultDate
        },
        controller: 'EventModalController',
        templateUrl: 'event_modal.html'
      };
    };

    EventModal.show = function(event, defaultDate) {
      var deferred = $q.defer();

      var modal = $uibModal.open(options(event, 'view', defaultDate));
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
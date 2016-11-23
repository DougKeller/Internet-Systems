angular.module('calendar').factory('EventFactory', ['$http', '$q', '$filter',
  function($http, $q, $filter) {
    function Event(data) {
      angular.extend(this, data);
    }

    Event.find = function(id) {
      var url = '/events/' + id;
      var deferred = $q.defer();

      $http.get(url).then(function(response) {
        var event = new Event(response.data);
        deferred.resolve(event);
      }, function(error) {
        deferred.reject(error);
      });

      return deferred.promise;
    };

    Event.query = function(params) {
      var url = $filter('queryString')('/events', params);
      var deferred = $q.defer();

      $http.get(url, params).then(function(response) {
        var events = response.data.map(event => new Event(event));
        deferred.resolve(events);
      }, function(error) {
        deferred.reject(error);
      });

      return deferred.promise;
    };

    Event.prototype.save = function() {
      var url = '/events';
      return $http.post(url, this)
    };

    return Event;
  }
]);
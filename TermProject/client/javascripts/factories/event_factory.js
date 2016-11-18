angular.module('calendar').factory('EventFactory', ['$http', '$q',
  function($http, $q, jwtHelper) {
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

    Event.query = function() {
      var url = '/events';
      var deferred = $q.defer();

      $http.get(url).then(function(response) {
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
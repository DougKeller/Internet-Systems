angular.module('calendar').filter('queryString', function() {
  return function(url, params) {
    if (params) {
      var queryParams = [];
      for (var prop in params) {
        var param = prop + '=' + params[prop];
        queryParams.push(param);
      }
      url = url + '?' + encodeURI(queryParams.join('&'));
    }
    return url;
  }
});
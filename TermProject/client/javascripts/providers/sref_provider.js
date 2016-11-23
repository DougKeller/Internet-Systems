angular.module('calendar').provider('sref', function() {
  this.setSrefs = (srefs) => {
    this.srefs = srefs;
  };

  this.$get = () => {
    return (state, params) => {
      if (params) {
        var values = [];
        for (var prop in params) {
          values.push("'" + prop + "':'" + params[prop] + "'");
        }
        var paramString = '({' + values.join(',') + '})';
        return this.srefs[state] + paramString;
      } else {
        return this.srefs[state];
      }
    };
  };
});
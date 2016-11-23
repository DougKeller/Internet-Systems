angular.module('calendar').provider('sref', function() {
  this.setSrefs = (srefs) => {
    this.srefs = srefs;
  };

  this.$get = () => {
    return (state) => {
      return this.srefs[state];
    };
  };
});
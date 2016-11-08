angular.module('pa3.directives').directive('customSection', ['$sce',
  function($sce) {
    return {
      require: 'ngModel',
      scope: {
        sectionModel: '=ngModel'
      },
      templateUrl: 'html/custom_section.html',
      link: function(scope) {
      }
    };
  }
]);
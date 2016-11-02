angular.module('pa3.directives').directive('customSection', ['$sce',
  function($sce) {
    return {
      require: 'ngModel',
      scope: {
        ngModel: '='
      },
      template: '<div ng-bind-html="htmlSafeString()"></div>',
      link: function(scope, element, attrs) {
        scope.htmlSafeString = function() {
          return $sce.trustAsHtml(scope.ngModel.toHtmlString());
        };
      }
    };
  }
]);
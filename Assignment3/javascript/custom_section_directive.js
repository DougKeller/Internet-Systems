angular.module('pa3.directives').directive('customSection', ['$sce',
  function($sce) {
    return {
      require: 'ngModel',
      scope: {
        ngModel: '='
      },
      templateUrl: 'html/custom_section.html',
      link: function(scope) {
        scope.fonts = [
          'Cormorant Garamond',
          'Lato',
          'Montserrat',
          'Open Sans',
          'Oswald',
          'Pavanam',
          'Prociono',
          'Raleway',
          'Roboto',
          'Shrikhand',
          'Slabo 27px',
          'Source Sans Pro'
        ];
      }
    };
  }
]);
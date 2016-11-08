angular.module('pa3.directives').directive('customStyle', [
  function() {
    return {
      restrict: 'E',
      scope: {
        style: '=ngModel'
      },
      templateUrl: 'html/custom_style.html',
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

        scope.borderStyles = [
          'None',
          'Dotted',
          'Dashed',
          'Solid',
          'Double',
          'Groove',
          'Ridge',
          'Inset',
          'Outset'
        ];

        scope.fontWeights = [
          'Normal',
          'Bold'
        ];
      }
    };
  }
]);
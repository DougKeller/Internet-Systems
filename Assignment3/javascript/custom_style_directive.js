angular.module('pa3.directives').directive('customStyle', [
  function() {
    return {
      restrict: 'E',
      scope: {
        style: '=ngModel',
        section: '=section'
      },
      templateUrl: 'html/custom_style.html',
      link: function(scope) {
        scope.fonts = [
          'Cormorant Garamond',
          'Lato',
          'Montserrat',
          'Open Sans',
          'Oswald',
          'Prociono',
          'Raleway',
          'Roboto',
          'Shrikhand',
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

        scope.backgroundPositions = [
          'Left',
          'Center',
          'Right'
        ];
      }
    };
  }
]);
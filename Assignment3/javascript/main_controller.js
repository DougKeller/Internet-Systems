angular.module('pa3.controllers').controller('MainController', ['$scope', 'CustomPageFactory', 'CustomSectionFactory',
  function($scope, CustomPageFactory, CustomContentFactory) {
    var stylesheetLink = new CustomContentFactory({
      tag: 'link',
      attributes: {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css?family=Cormorant+Garamond|Lato|Montserrat|Open+Sans|Oswald|Prociono|Raleway|Roboto:100|Shrikhand|Slabo+27px|Source+Sans+Pro'
      }
    });

    $scope.title = new CustomContentFactory({
      tag: 'title',
      content: 'My Awesome Profile!'
    });

    $scope.headerSection = new CustomContentFactory({
      tag: 'head',
      content: [
        stylesheetLink,
        $scope.title
      ]
    });

    $scope.bodySection = new CustomContentFactory({
      tag: 'body'
    });

    $scope.pagePreview;
    $scope.openPreview = function() {
      if ($scope.pagePreview && $scope.pagePreview.isOpen()) {
        $scope.pagePreview.close();
      }

      $scope.pagePreview = new CustomPageFactory({
        name: $scope.title.content,
        content: [
          $scope.headerSection,
          $scope.bodySection
        ]
      });

      $scope.pagePreview.open();
    }

    $scope.closePreview = function() {
      if ($scope.pagePreview && $scope.pagePreview.isOpen()) {
        $scope.pagePreview.close();
      }
    };
  }
]);
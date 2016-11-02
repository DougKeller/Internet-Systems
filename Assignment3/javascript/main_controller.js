angular.module('pa3.controllers').controller('MainController', ['$scope', 'CustomPageFactory', 'CustomContentFactory',
  function($scope, CustomPageFactory, CustomContentFactory) {
    var page = new CustomPageFactory();
    $scope.customPage = page;

    page.addItem(new CustomContentFactory({
      tag: 'a',
      attributes: {
        href: 'http://facebook.com'
      },
      content: [
        'This is a link'
      ]
    }));

    console.log(page);
  }
]);
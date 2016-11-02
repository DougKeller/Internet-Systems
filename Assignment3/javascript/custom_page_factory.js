angular.module('pa3.factories').factory('CustomPageFactory', [
  function() {
    var PageFactory = function() {
      this.width = 800;
      this.height = 600;
      this.content = [];
      this.name = 'Custom Page';
    }

    PageFactory.prototype.toHtmlString = function() {
      var htmlString = '';
      this.content.forEach(function(element) {
        htmlString += element.toHtmlString();
      });

      return htmlString;
    };

    PageFactory.prototype.isOpen = function() {
      return this.openWindow !== undefined;
    };

    PageFactory.prototype.open = function() {
      this.close();

      var dimensions = 'width=' + this.width + ',height=' + this.height;
      this.openWindow = window.open('', this.name, dimensions);
      this.openWindow.document.write(this.toHtmlString());
    };

    PageFactory.prototype.close = function() {
      if (this.isOpen()) {
        this.openWindow.close();
      }
    };

    PageFactory.prototype.addItem = function(item) {
      this.content.push(item);
    };

    return PageFactory;
  }
]);
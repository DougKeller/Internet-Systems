angular.module('pa3.factories').factory('CustomPageFactory', [
  function() {
    var PageFactory = function(options) {
      this.width = 800;
      this.height = 600;
      this.content = [];
      this.name = 'Custom Page';
      angular.extend(this, options);
    }

    PageFactory.prototype.toHtmlString = function() {
      var htmlString = '';
      this.content.forEach(function(element) {
        htmlString += element.toHtmlString();
      });

      return htmlString;
    };

    PageFactory.prototype.isOpen = function() {
      if (this.openWindow && this.openWindow.closed) {
        this.close();
      }
      return this.openWindow && !this.openWindow.closed;
    };

    PageFactory.prototype.open = function() {
      this.close();

      var dimensions = 'width=' + this.width + ',height=' + this.height;
      this.openWindow = window.open('', this.name, dimensions);
      this.openWindow.document.write(this.toHtmlString());
    };

    PageFactory.prototype.close = function() {
      if (this.openWindow) {
        this.openWindow.close();
      }
      this.openWindow = undefined;
    };

    return PageFactory;
  }
]);
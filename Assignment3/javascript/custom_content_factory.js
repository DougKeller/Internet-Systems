angular.module('pa3.factories').factory('CustomContentFactory', [
  function() {
    var ContentFactory = function(options) {
      this.tag = 'div';
      this.attributes = {};
      this.style = {};
      this.content = [];
      angular.extend(this, options);
    };

    ContentFactory.prototype.toHtmlString = function() {
      var htmlString = '<' + this.tag;

      if (Object.keys(this.style).length > 0) {
        htmlString += ' style="';
        for (var prop in this.style) {
          htmlString += prop + ': ' + this.style[prop] + '; ';
        }
        htmlString += '"';
      }

      for (var prop in this.attributes) {
        htmlString += ' ' + prop + '="' + this.attributes[prop] + '"';
      }

      htmlString += '>';

      this.content.forEach(function(element) {
        if (typeof element === 'string') {
          htmlString += element;
        } else {
          htmlString += element.toHtmlString();
        }
      })

      htmlString += '</' + this.tag + '>';
      return htmlString;
    };

    return ContentFactory;
  }
]);
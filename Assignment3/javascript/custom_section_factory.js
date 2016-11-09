angular.module('pa3.factories').factory('CustomSectionFactory', [
  function() {
    var ContentFactory = function(options, parent) {
      this.tag = 'section';
      this.attributes = {};
      this.style = {};
      this.centered = false;
      this.content = [];
      this.parent = parent;
      angular.extend(this, options);

      if (this.tag === 'section' || this.tag === 'body') {
        this.style.padding = '10px';
      }
      if (this.tag === 'a') {
        this.attributes.target = '_blank';
      }
    };

    ContentFactory.prototype.toHtmlString = function() {
      var htmlString = '<' + this.tag;

      htmlString += ' style="' + this.styleString() + '"';

      for (var prop in this.attributes) {
        htmlString += ' ' + prop + '="' + this.attributes[prop] + '"';
      }

      htmlString += '>';

      if (this.centered) {
        htmlString += '<center>';
      }

      if (typeof this.content === 'string') {
        htmlString += this.content;
      } else {
        this.content.forEach(function(element) {
          if (typeof element === 'string') {
            htmlString += element;
          } else {
            htmlString += element.toHtmlString();
          }
        })
      }

      if (this.centered) {
        htmlString += '</center>';
      }

      htmlString += '</' + this.tag + '>';
      return htmlString;
    };

    ContentFactory.prototype.styleString = function() {
      var style = '';
      for (var prop in this.style) {
        style += prop + ': ' + this.style[prop] + '; ';
      }
      return style;
    };

    ContentFactory.prototype.addItem = function(type, index) {
      console.log('adding', type);
      if (angular.isUndefined(index)) {
        index = this.content.length;
      }
      var newItem = new ContentFactory({
        tag: type
      }, this);
      this.content.splice(index, 0, newItem);
    };

    ContentFactory.prototype.removeItem = function(item) {
      var index = this.content.indexOf(item);
      this.content.splice(index, 1);
    };

    ContentFactory.prototype.clear = function() {
      if (this.parent) {
        var index = this.parent.content.indexOf(this);
        this.parent.addItem(this.tag, index);
        this.parent.removeItem(this);
      }
    };

    return ContentFactory;
  }
]);
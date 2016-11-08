angular.module('pa3.factories').factory('CustomSectionFactory', [
  function() {
    var ContentFactory = function(options) {
      this.tag = 'section';
      this.attributes = {};
      this.style = {};
      this.centered = false;
      this.content = [];
      angular.extend(this, options);

      if (this.tag === 'section' || this.tag === 'body') {
        this.style.padding = '10px';
      }

      this.backup = angular.copy(this);
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

    ContentFactory.prototype.clear = function() {
      var newTag = this.tag;
      for (var prop in this) {
        if (prop !== 'tag' && prop !== 'backup') {
          delete this[prop];
        }
      }
      angular.extend(this, this.backup);
      this.tag = newTag;
      if (newTag === 'section' || newTag === 'body') {
        this.style.padding = '10px';
      }
    };

    ContentFactory.prototype.addItem = function(type, index) {
      if (angular.isUndefined(index)) {
        index = this.content.length;
      }
      var newItem = new ContentFactory({
        tag: type,
        parent: this
      });
      this.content.splice(index, 0, newItem);
    };

    ContentFactory.prototype.removeItem = function(item) {
      var index = this.content.indexOf(item);
      this.content.splice(index, 1);
    }

    return ContentFactory;
  }
]);
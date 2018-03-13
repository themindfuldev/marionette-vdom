/*!
marionette-vdom
https://github.com/tiagorg/marionette-vdom

Copyright (c) 2015, Tiago Garcia
This may be freely distributed under the MIT license.
*/
'use strict';

var _ = require('underscore');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var convertHTML = require('html-to-vdom')({
  VNode: require('virtual-dom/vnode/vnode'),
  VText: require('virtual-dom/vnode/vtext')
});

var trim = function( text ) {
	
	return text == null ?
		"" :
		( text + "" ).replace( /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "" );
		
};

module.exports = function(prototype) {

  var _setElement = prototype.setElement;
  var _remove = prototype.remove;

  return {
    setElement: function() {
      _setElement.apply(this, arguments);

      if (this.el) {
        this.rootTemplate = _.template(
          this.el.outerHTML.replace(/>(.|\n)*<\//, '><%= content %></')
        );
      }
    },

    attachElContent: function(html) {
      var newVirtualEl = convertHTML(this.rootTemplate({
        content: trim(html)
      }));
      if (this.virtualEl) {
        var patches = diff(this.virtualEl, newVirtualEl);
        patch(this.el, patches);
      }
      else {
        this.el.innerHTML = trim(html);
      }
      this.virtualEl = newVirtualEl;
      return this;
    },

    remove: function() {
      this.virtualEl = this.rootTemplate = null;
      return _remove.apply(this, arguments);
    }
  };
};

/*!
marionette-vdom
https://github.com/tiagorg/marionette-vdom

Copyright (c) 2015, Tiago Garcia

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
'use strict';

var Backbone = require('backbone');
var _ = require('underscore');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var convertHTML = require('html-to-vdom')({
  VNode: require('virtual-dom/vnode/vnode'),
  VText: require('virtual-dom/vnode/vtext')
});

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
        content: Backbone.$.trim(html)
      }));
      if (this.virtualEl) {
        var patches = diff(this.virtualEl, newVirtualEl);
        patch(this.el, patches);
      }
      else {
        this.$el.html(Backbone.$.trim(html));
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

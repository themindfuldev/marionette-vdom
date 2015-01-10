'use strict';

var Backbone = require('backbone');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');
var convertHTML = require('html-to-vdom')({
  VNode: require('virtual-dom/vnode/vnode'),
  VText: require('virtual-dom/vnode/vtext')
});

module.exports = function(prototype) {

  var _initialize = prototype.initialize;
  var _attachElContent = prototype.attachElContent;
  var _remove = prototype.remove;

  return {
    initialize: function() {
      _initialize.apply(this, arguments);
      if (typeof this.options.enableVDOM !== 'undefined') {
        this.enableVDOM = this.options.enableVDOM;
      }
      else if (typeof this.enableVDOM === 'undefined') {
        this.enableVDOM = false;
      }
    },

    attachElContent: function(html) {
      if (this.enableVDOM) {
        var newVirtualEl = convertHTML(Backbone.$.trim(html));
        if (this.virtualEl) {
          var patches = diff(this.virtualEl, newVirtualEl);
          this.rootEl = patch(this.rootEl, patches);
        }
        else {
          this.rootEl = createElement(newVirtualEl);
          this.$el.html(this.rootEl);
        }
        this.virtualEl = newVirtualEl;
        return this;
      }

      return _attachElContent.apply(this, arguments);
    },

    remove: function() {
      this.virtualEl = this.rootEl = null;
      return _remove.apply(this, arguments);
    }
  }
};

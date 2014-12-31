'use strict';

var Backbone = require('backbone');
var _ = require('underscore');
var Marionette = require('backbone.marionette');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');
var virtualize = require('vdom-virtualize');

module.exports = Marionette.ItemView.extend({
  setElement: function(element, delegate) {
    Marionette.ItemView.prototype.setElement.apply(this, arguments);
    if (this.el) {
      this.virtualEl = virtualize(this.el);

      if (!this.$el.parent().length || this.$el.parent('body').length) {
        this.rootEl = createElement(this.virtualEl);
        this.$el.html(this.rootEl);
      }
    }
    return this;
  },

  attachElContent: function(html) {
    var newVirtualEl = virtualize.fromHTML(html);
    var patches = diff(this.virtualEl, newVirtualEl);
    this.rootEl = patch(this.rootEl, patches);
    this.virtualEl = newVirtualEl;
    return this;
  }
});

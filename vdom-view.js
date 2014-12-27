'use strict';

var Backbone = require('backbone');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');
var VNode = require('virtual-dom/vnode/vnode');
var VText = require('virtual-dom/vnode/vtext');
var convertHTML = require('html-to-vdom')({
  VNode: VNode,
  VText: VText
});

module.exports = Backbone.View.extend({
  setElement: function() {
    Backbone.View.prototype.setElement.apply(this, Array.prototype.slice.call(arguments));
    this.virtualEl = convertHTML(this.el);
    this.virtualEl.tagName = this.el.tagName;
    this.internalEl = createElement(this.virtualEl);
    this.$el.html(this.internalEl);
    return this;
  },

  render: function() {
    var newVirtualEl = convertHTML(this.renderEl());
    var patches = diff(this.virtualEl, newVirtualEl);
    this.internalEl = patch(this.internalEl, patches);
    this.virtualEl = newVirtualEl;
    return this;
  },

  renderEl: function() {
    return this.el;
  }
});

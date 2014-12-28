'use strict';

var Marionette = require('backbone.marionette');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');
var convertHTML = require('html-to-vdom')({
  VNode: require('virtual-dom/vnode/vnode'),
  VText: require('virtual-dom/vnode/vtext')
});

module.exports = Marionette.ItemView.extend({
  setElement: function() {
    Marionette.ItemView.prototype.setElement.apply(this, arguments);
    this.virtualEl = convertHTML(this.el);
    this.virtualEl.tagName = this.el.tagName;
    this.rootEl = createElement(this.virtualEl);
    this.$el.html(this.rootEl);
    return this;
  },

  attachElContent: function(html) {
    var newVirtualEl = convertHTML(html);
    var patches = diff(this.virtualEl, newVirtualEl);
    this.rootEl = patch(this.rootEl, patches);
    this.virtualEl = newVirtualEl;
    return this;
  }
});

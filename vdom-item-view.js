'use strict';

var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');
var convertHTML = require('html-to-vdom')({
  VNode: require('virtual-dom/vnode/vnode'),
  VText: require('virtual-dom/vnode/vtext')
});

module.exports = Marionette.ItemView.extend({
  attachElContent: function(html) {
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
  },

  remove: function() {
    this.virtualEl = this.rootEl = null;
    return Marionette.ItemView.prototype.remove.apply(this, arguments);
  }

});

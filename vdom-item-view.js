'use strict';

//var Backbone = require('backbone');
//var _ = require('underscore');
var Marionette = require('backbone.marionette');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');
var convertHTML = require('html-to-vdom')({
  VNode: require('virtual-dom/vnode/vnode'),
  VText: require('virtual-dom/vnode/vtext')
});

module.exports = Marionette.ItemView.extend({
  // setElement: function(element, delegate) {
  //   if (this.$el) this.undelegateEvents();

  //   var newEl = element instanceof Backbone.$ ? element[0] : Backbone.$(element)[0];

  //   this.virtualEl = convertHTML(this.$el.clone().wrap('<div>').parent().html());
  //   this.el = createElement(this.virtualEl);
  //   this.$el = Backbone.$(this.el);

  //   if (delegate !== false) this.delegateEvents();

  //   _.invoke(this._behaviors, 'proxyViewProperties', this);
  //   return this;
  // },

  setElement: function(element, delegate) {
    Marionette.ItemView.prototype.setElement.apply(this, arguments);
    if (this.el) {
      this.virtualEl = convertHTML(this.$el.clone().wrap('<div>').parent().html());
      this.rootEl = createElement(this.virtualEl);
      this.$el.html(this.rootEl);
    }
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

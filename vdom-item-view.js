'use strict';

var Backbone = require('backbone');
var _ = require('underscore');
var Marionette = require('backbone.marionette');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');
var virtualize = require('vdom-virtualize');

module.exports = Marionette.ItemView.extend({
  // setElement: function(element, delegate) {
  //   if (this.$el) this.undelegateEvents();

  //   var newEl = element instanceof Backbone.$ ? element[0] : Backbone.$(element)[0];

  //   if (newEl) {
  //     this.virtualEl = virtualize(newEl);
  //     this.el = createElement(this.virtualEl);
  //   }
  //   this.$el = Backbone.$(this.el);

  //   if (delegate !== false) this.delegateEvents();

  //   _.invoke(this._behaviors, 'proxyViewProperties', this);
  //   return this;
  // },

  setElement: function(element, delegate) {
    Marionette.ItemView.prototype.setElement.apply(this, arguments);
    if (this.el) {
      this.virtualEl = virtualize(this.el);
      this.rootEl = createElement(this.virtualEl);
      this.$el.html(this.rootEl);
    }
    return this;
  },

  attachElContent: function(html) {
    var newVirtualEl = virtualize.fromHTML(html);
    var patches = diff(this.virtualEl, newVirtualEl);
    //patch(this.el, patches);
    this.rootEl = patch(this.rootEl, patches);
    this.virtualEl = newVirtualEl;
    return this;
  }
});

'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

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
  template: _.template('<p>w<%= content %></p>'),
  initialize: function() {
    this.virtualEl = convertHTML(this.el); // tree
    this.virtualEl.tagName = this.el.tagName;
    this.internalEl = createElement(this.virtualEl); //rootNote
    this.$el.html(this.internalEl);

    this.model && this.model.on('change', this.render, this);
  },
  render: function() {
    var newVirtualEl = convertHTML(this.template(this.model.toJSON()));
    var patches = diff(this.virtualEl, newVirtualEl);
    this.internalEl = patch(this.internalEl, patches);
    this.virtualEl = newVirtualEl;
    return this;
  }
});

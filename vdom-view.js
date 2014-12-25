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
    this.vel = convertHTML(this.el); // tree
    this.el = createElement(this.vel); //rootNote

    this.model && this.model.on('change', this.render, this);
  },
  render: function() {
    var newVel = convertHTML(this.template(this.model.toJSON()));
    var patches = diff(this.vel, newVel);
    this.el = patch(this.el, patches);
    this.vel = newVel;
    return this;
  }
});

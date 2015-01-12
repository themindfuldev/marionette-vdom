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

  var _initialize = prototype.initialize;
  var _remove = prototype.remove;

  return {
    initialize: function() {
      _initialize.apply(this, arguments);
    },

    rootTemplate: _.template('<<%= tag %>><%= content %></<%= tag %>>'),

    attachElContent: function(html) {
      var newVirtualEl = convertHTML(this.rootTemplate({
        tag: this.tagName,
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
      this.virtualEl = null;
      return _remove.apply(this, arguments);
    }
  };
};

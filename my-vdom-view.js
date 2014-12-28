'use strict';

var VDOMView = require('./vdom-item-view');
var _ = require('underscore');

module.exports = VDOMView.extend({
  initialize: function() {
    this.model && this.model.on('change', this.render, this);
  },

  template: _.template('<p>w<%= content %></p>')
});

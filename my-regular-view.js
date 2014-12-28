'use strict';

var Marionette = require('backbone.marionette');
var _ = require('underscore');

module.exports = Marionette.ItemView.extend({
  initialize: function() {
    this.model && this.model.on('change', this.render, this);
  },

  template: _.template('<p>w<%= content %></p>')
});

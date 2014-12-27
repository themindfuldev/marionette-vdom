'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

module.exports = Backbone.View.extend({
  initialize: function() {
    this.model && this.model.on('change', this.render, this);
  },

  template: _.template('<p>w<%= content %></p>'),

  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

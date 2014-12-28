'use strict';

var VDOMItemView = require('./vdom-item-view');
var _ = require('underscore');

module.exports = VDOMItemView.extend({
  template: _.template('<p>w<%= content %></p>'),
  modelEvents: {
    "change": "render"
  }
});

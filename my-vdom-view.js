'use strict';

var VDOMItemView = require('./vdom-item-view');
var _ = require('underscore');

module.exports = VDOMItemView.extend({
  template: _.template('<p><a><b>w<%= content %></b></a></p>'),
  modelEvents: {
    "change": "render"
  }
});

'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
require('./index.js');
var Marionette = require('backbone.marionette');

// Defining Model and View
var Model = Backbone.Model.extend({
  defaults: {
    unit: 'o',
    content: ''
  },
  tick: function() {
    this.set('content', this.get('content').concat(this.get('unit')));
  }
});

var View = Marionette.ItemView.extend({
  template: _.template('<p><a><b>w<%= content %></b></a></p>'),
  modelEvents: {
    "change": "render"
  },
  enableVDOM: true
});

// Instantiating myModel and myView
var myModel = new Model({
  unit: 'aaaaaa'
});

var myView = new View({
  model: myModel
});

// rendering
myView.render().$el.appendTo('body');

setInterval(function() {
  myModel.tick();
}, 1000);

'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;

var VDOMItemView = require('./vdom-item-view');
//var VDOMItemView = require('./vdom-item-view.alternate');

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

var View = VDOMItemView.extend({
  template: _.template('<p><a><b>w<%= content %></b></a></p>'),
  modelEvents: {
    "change": "render"
  }
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

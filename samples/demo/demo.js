'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var VDOMView = require('../../src/index.js').View;

var View = VDOMView.extend({
  events: {
    "input .input": function(e){
      this.model.set('text', e.currentTarget.value)
    }
  },
  modelEvents: {
    "change": "render"
  },
  initialize: function() {
    this.template = _.template('<p>VIEW ' + this.cid + '</br> <b><%= text %></b></br><input class="input" value="<%= text %>"/></br><textarea class="input"><%= text %></textarea></p>');
  }
});

var myModel = new Backbone.Model({text: "Type.. I dare you"})

for(var i = 0; i < 10; ++i)
  (new View({
    model: myModel
  })).render().$el.appendTo('body');


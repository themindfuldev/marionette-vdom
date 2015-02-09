'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var VDOMItemView = require('../index.js').VDOMItemView;

var View = VDOMItemView.extend({
  template: _.template('<p>VIEW <%= cid %> </br> <b><%= text %></b></br><input class="input" value="<%= text %>"/></br><textarea class="input"><%= text %></textarea></p>'),
  events: {
    "input .input": function(e){
      this.model.set('text', e.currentTarget.value)
    }
  },
  templateHelpers: function() {
    return {
      cid: this.cid
    }
  },
  modelEvents: {
    "change": "render"
  },
  enableVDOM: true
});

var myModel = new Backbone.Model({text: "Type.. I dare you"})

for(var i = 0; i < 10; ++i)
  (new View({
    model: myModel
  })).render().$el.appendTo('body');


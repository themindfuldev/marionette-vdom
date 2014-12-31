'use strict';

var $ = require('jquery');
require('backbone').$ = $;

var Model = require('./app-model');
var MyView = require('./my-vdom-view');

var myModel = new Model({
  unit: 'aaaaaa'
});

var myView = new MyView({
  model: myModel
});

myView.render().$el.appendTo('body');

setInterval(function() {
  myModel.tick();
}, 1000);

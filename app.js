'use strict';

var $ = require('jquery');
require('backbone').$ = $;
var VDOMView = require('./vdom-view');
//var VDOMView = require('./app-view');
var Model = require('./app-model');

var myModel = new Model({
  unit: 'aaaaaa'
});

var myView = new VDOMView({
  model: myModel
});
myView.render().$el.appendTo('body');

setInterval(function() {
  myModel.tick();
}, 1000);

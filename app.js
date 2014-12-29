'use strict';

var $ = require('jquery');
require('backbone').$ = $;

var Model = require('./app-model');
var MyView = require('./my-vdom-view');

var myModel = new Model({
  unit: 'aaaaaa'
});

// var VDOMItemView = require('./vdom-item-view');
// var myView = new VDOMItemView();
// myView.setElement('<p><a><b>test</b></a></p>');
// console.log('view.$(a b).html()='+myView.$('a b').html());

var myView = new MyView({
  model: myModel
});

myView.render().$el.appendTo('body');

setInterval(function() {
  myModel.tick();
}, 1000);

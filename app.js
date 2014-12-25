'use strict';

var $ = require('jquery');
require('backbone').$ = $;

//var VDOMView = require('./vdom-view');
var VDOMView = require('./app-view');
var Model = require('./app-model');

var myModel = new Model({
    unit: 'aaaaaa'
});

var el = $('<p>').appendTo('body');

var myView = new VDOMView({
    el: el,
    model: myModel,
});
myView.render();

setInterval(function() {
    myModel.tick();
}, 1000);

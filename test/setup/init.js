var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var chaiJq = require('chai-jq');

chai.use(sinonChai);
chai.use(chaiJq);

global.expect = chai.expect;
global.sinon = sinon;

if (!global.document || !global.window) {
    global.XMLSerializer = require('xmldom').XMLSerializer;
    global.document = require('jsdom').jsdom('<html><head><script></script></head><body></body></html>');
    global.window = document.defaultView;
    global.navigator = global.window.navigator;
}

global.$ = global.jQuery = require('jquery');
global._ = require('underscore');
global.Backbone = require('backbone');
global.Backbone.$ = global.$;
global.MarionetteVDOM = require('../../index.js');
global.Marionette = require('backbone.marionette');
global.VDOMView = global.MarionetteVDOM.View;
global.VDOMCompositeView = global.MarionetteVDOM.CompositeView;

var $body = $(document.body);

var setFixtures = function () {
  _.each(arguments, function (content) {
    $body.append(content);
  });
};

var clearFixtures = function () {
  $body.empty();
};

beforeEach(function () {
  this.sinon = sinon.sandbox.create();
  this.setFixtures   = setFixtures;
  this.clearFixtures = clearFixtures;
});

afterEach(function () {
  this.sinon.restore();
  clearFixtures();
  window.location.hash = '';
  Backbone.history.stop();
  Backbone.history.handlers.length = 0;
});

'use strict';

var Marionette = require('backbone.marionette');
var _ = require('underscore');
var VDOMMixin = require('./vdom-mixin');

var VDOMItemView = Marionette.ItemView.extend({});
_.extend(VDOMItemView.prototype, VDOMMixin(VDOMItemView.prototype));

var VDOMCompositeView = Marionette.CompositeView.extend({});
_.extend(VDOMCompositeView.prototype, VDOMMixin(VDOMCompositeView.prototype));

module.exports = {
  VDOMItemView: VDOMItemView,
  VDOMCompositeView: VDOMCompositeView
};

'use strict';

require('./outer-html');
var Marionette = require('backbone.marionette');
var VDOMMixin = require('./vdom-mixin');
var VDOMItemView = Marionette.ItemView.extend(VDOMMixin(Marionette.ItemView.prototype));
var VDOMCompositeView = Marionette.CompositeView.extend(VDOMMixin(Marionette.CompositeView.prototype));

module.exports = {
  VDOMItemView: VDOMItemView,
  VDOMCompositeView: VDOMCompositeView
};

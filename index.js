'use strict';

var Marionette = require('backbone.marionette');
var _ = require('underscore');
var VDOMMixin = require('./vdom-mixin');

_.extend(Marionette.ItemView.prototype, VDOMMixin(Marionette.ItemView.prototype));
_.extend(Marionette.CompositeView.prototype, VDOMMixin(Marionette.CompositeView.prototype));

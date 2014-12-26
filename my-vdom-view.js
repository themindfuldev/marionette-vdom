var VDOMView = require('./vdom-view');
var _ = require('underscore');

module.exports = VDOMView.extend({
  initialize: function() {
    VDOMView.prototype.initialize.apply(this);
    this.model && this.model.on('change', this.render, this);
  },

  template: _.template('<p>w<%= content %></p>'),

  renderEl: function(){
    return this.template(this.model.toJSON());
  }
});

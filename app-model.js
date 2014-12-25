var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  defaults: {
    unit: 'o',
    content: ''
  },
  tick: function() {
    this.set('content', this.get('content').concat(this.get('unit')));
  }
});

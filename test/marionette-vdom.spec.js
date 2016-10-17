require('./setup/init');

describe('marionette-vdom', function() {
  'use strict';

  var vdomViews = [{
    def: VDOMView,
    name: 'VDOMView'
  }, {
    def: VDOMCompositeView,
    name: 'VDOMCompositeView'
  }];

  _.each(vdomViews, function(vdomView) {

    describe('for ' + vdomView.name, function() {

      beforeEach(function(){
        this.setFixtures('<div id="testElement"><h1></h1></div>');

        this.View = vdomView.def.extend({
          template: _.template('<p><a><b>w<%= content %></b></a></p>'),
          modelEvents: {
            'change': 'render'
          }
        });

        this.Model = Backbone.Model.extend({
          defaults: {
            content: ''
          },
          tick: function() {
            this.set('content', this.get('content').concat(this.get('unit')));
          }
        });

        this.model = new this.Model({
          unit: 'a'
        });
      });

      it('should work when there is no el provided and render() is called before appending', function() {

        var view = new this.View({
          model: this.model
        });

        view.render().$el.appendTo('#testElement h1');
        expect($('#testElement > h1 > div > p > a > b').text()).to.be.eql('w');

        this.model.tick();
        expect($('#testElement > h1 > div > p > a > b').text()).to.be.eql('wa');
      });

      it('should work when there is no el provided and render() is called after appending', function() {

        var view = new this.View({
          model: this.model
        });

        view.$el.appendTo('#testElement h1');
        view.render();
        expect($('#testElement > h1 > div > p > a > b').text()).to.be.eql('w');

        this.model.tick();
        expect($('#testElement > h1 > div > p > a > b').text()).to.be.eql('wa');
      });

      it('should work when there is no el provided and render() is not explicitly called', function() {

        var view = new this.View({
          model: this.model
        });

        view.$el.appendTo('#testElement h1');

        this.model.tick();
        expect($('#testElement > h1 > div > p > a > b').text()).to.be.eql('wa');
      });

      it('should work when el is provided and it is empty', function() {

        var view = new this.View({
          model: this.model,
          el: '#testElement h1'
        });

        view.render().$el.appendTo('#testElement h1');
        expect($('#testElement > h1 > p > a > b').text()).to.be.eql('w');

        this.model.tick();
        expect($('#testElement > h1 > p > a > b').text()).to.be.eql('wa');
      });

      it('should work when el is provided and it is not empty', function() {

        var view = new this.View({
          model: this.model,
          el: '#testElement'
        });

        view.render().$el.appendTo('#testElement h1');
        expect($('#testElement > p > a > b').text()).to.be.eql('w');

        this.model.tick();
        expect($('#testElement > p > a > b').text()).to.be.eql('wa');
      });

      it('should work when the template has more than one root element', function() {

        var NewView = this.View.extend({
          template: _.template('<a>one</a><b>two</b>')
        })

        var view = new NewView({
          el: '#testElement'
        });

        view.render().$el.appendTo('#testElement h1');
        expect($('#testElement > a').text()).to.be.eql('one');
        expect($('#testElement > b').text()).to.be.eql('two');
      });

      it('should work when the template has no root element', function() {

        var NewView = this.View.extend({
          template: _.template('i am a very naught text')
        })

        var view = new NewView({
          el: '#testElement'
        });

        view.render().$el.appendTo('#testElement h1');
        expect($('#testElement').text()).to.be.eql('i am a very naught text');
      });

    });
  });
});

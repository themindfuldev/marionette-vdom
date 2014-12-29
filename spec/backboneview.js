var _     = require('underscore')
var jsdom = require('jsdom').jsdom;

global.document = jsdom('<html><head><script></script></head><body></body></html>', null, {
  FetchExternalResources   : ['script'],
  ProcessExternalResources : ['script'],
  MutationEvents           : '2.0',
  QuerySelector            : false
});

global.window = document.createWindow();
global.navigator = global.window.navigator;

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var chaiJq = require('chai-jq');

chai.use(sinonChai);
chai.use(chaiJq);

global.expect = chai.expect;

var $            = require('jquery');
var Backbone     = require('backbone');
Backbone.$       = $;

var Marionette   = require('backbone.marionette');
var VDOMItemView = require("../vdom-item-view")

var $body = $(document.body);

var setFixtures = function () {
  _.each(arguments, function (content) {
    $body.append(content);
  });
};

var clearFixtures = function() {
  $body.empty();
}

// lol qunit hack
strictEqual = equal = function(v1, v2) {
  expect(v1).to.eql(v2);
}

// lol qunit hack
ok = function(v) {
  expect(!!v).to.eql(true);
}

describe("Backbone.View", function(){
  beforeEach(function() {
    this.sinon = sinon.sandbox.create();
    this.setFixtures   = setFixtures;
    this.clearFixtures = clearFixtures;
  });

  afterEach(function() {
    this.sinon.restore();
    this.clearFixtures();
  });

  it("constructor", function() {
    var view = new VDOMItemView({
      id        : 'test-view',
      className : 'test-view',
      other     : 'non-special-option'
    });

    equal(view.el.id, 'test-view');
    equal(view.el.className, 'test-view');
    equal(view.el.other, void 0);
  });

  it("jQuery", function() {
    var view = new VDOMItemView;
    view.setElement('<p><a><b>test</b></a></p>');
    console.log(view.$el.html());
    strictEqual(view.$('a b').html(), 'test');
  });

  it("initialize", function() {
    var View = VDOMItemView.extend({
      initialize: function() {
        this.one = 1;
      }
    });

    strictEqual(new View().one, 1);
  });

  it("delegateEvents", function() {
    setFixtures("<div id='testElement'><h1></h1></div>");
    var counter1 = 0, counter2 = 0;

    var view = new VDOMItemView({el: '#testElement'});
    view.increment = function(){ counter1++; };
    view.$el.on('click', function(){ counter2++; });

    var events = {'click h1': 'increment'};

    view.delegateEvents(events);
    view.$('h1').trigger('click');
    equal(counter1, 1);
    equal(counter2, 1);

    view.$('h1').trigger('click');
    equal(counter1, 2);
    equal(counter2, 2);

    view.delegateEvents(events);
    view.$('h1').trigger('click');
    equal(counter1, 3);
    equal(counter2, 3);
  });

  it("delegateEvents allows functions for callbacks", function() {
    var view = new VDOMItemView({el: '<p></p>'});
    view.counter = 0;

    var events = {
      click: function() {
        this.counter++;
      }
    };

    view.delegateEvents(events);
    view.$el.trigger('click');
    equal(view.counter, 1);

    view.$el.trigger('click');
    equal(view.counter, 2);

    view.delegateEvents(events);
    view.$el.trigger('click');
    equal(view.counter, 3);
  });


  it("delegateEvents ignore undefined methods", function() {
    var view = new VDOMItemView({el: '<p></p>'});
    view.delegateEvents({'click': 'undefinedMethod'});
    view.$el.trigger('click');
  });

  it("undelegateEvents", function() {
    var counter1 = 0, counter2 = 0;

    setFixtures("<div id='testElement'><h1></h1></div>");
    var view = new VDOMItemView({el: '#testElement'});
    view.increment = function(){ counter1++; };
    view.$el.on('click', function(){ counter2++; });

    var events = {'click h1': 'increment'};

    view.delegateEvents(events);
    view.$('h1').trigger('click');
    equal(counter1, 1);
    equal(counter2, 1);

    view.undelegateEvents();
    view.$('h1').trigger('click');
    equal(counter1, 1);
    equal(counter2, 2);

    view.delegateEvents(events);
    view.$('h1').trigger('click');
    equal(counter1, 2);
    equal(counter2, 3);
  });

  it("_ensureElement with DOM node el", function() {
    var View = VDOMItemView.extend({
      el: document.body
    });

    equal(new View().el, document.body);
  });

  it("_ensureElement with string el", function() {
    var View = VDOMItemView.extend({
      el: "body"
    });
    strictEqual(new View().el, document.body);

    setFixtures("<div id='testElement'><h1></h1></div>");
    View = VDOMItemView.extend({
      el: "#testElement > h1"
    });
    strictEqual(new View().el, $("#testElement > h1").get(0));

    View = VDOMItemView.extend({
      el: "#nonexistent"
    });
    ok(!new View().el);
  });

  it("with className and id functions", function() {
    var View = VDOMItemView.extend({
      className: function() {
        return 'className';
      },
      id: function() {
        return 'id';
      }
    });

    strictEqual(new View().el.className, 'className');
    strictEqual(new View().el.id, 'id');
  });

  it("with attributes", function() {
    var View = VDOMItemView.extend({
      attributes: {
        id: 'id',
        'class': 'class'
      }
    });

    strictEqual(new View().el.className, 'class');
    strictEqual(new View().el.id, 'id');
  });

  it("with attributes as a function", function() {
    var View = VDOMItemView.extend({
      attributes: function() {
        return {'class': 'dynamic'};
      }
    });

    strictEqual(new View().el.className, 'dynamic');
  });

  it("multiple views per element", function() {
    var count = 0;
    var $el = $('<p></p>');

    var View = VDOMItemView.extend({
      el: $el,
      events: {
        click: function() {
          count++;
        }
      }
    });

    var view1 = new View;
    $el.trigger("click");
    equal(1, count);

    var view2 = new View;
    $el.trigger("click");
    equal(3, count);

    view1.delegateEvents();
    $el.trigger("click");
    equal(5, count);
  });

  it("custom events, with namespaces", function() {
    var count = 0;

    var View = VDOMItemView.extend({
      el: $('body'),
      events: function() {
        return {"fake$event.namespaced": "run"};
      },
      run: function() {
        count++;
      }
    });

    var view = new View;
    $('body').trigger('fake$event').trigger('fake$event');
    equal(count, 2);

    $('body').off('.namespaced');
    $('body').trigger('fake$event');
    equal(count, 2);
  });

  it("#1048 - setElement uses provided object.", function() {
    var $el = $('body');

    var view = new VDOMItemView({el: $el});
    ok(view.$el === $el);

    view.setElement($el = $($el));
    ok(view.$el === $el);
  });

  it("#986 - Undelegate before changing element.", function() {
    var button1 = $('<button></button>');
    var button2 = $('<button></button>');

    var View = VDOMItemView.extend({
      events: {
        click: function(e) {
          ok(view.el === e.target);
        }
      }
    });

    var view = new View({el: button1});
    view.setElement(button2);

    button1.trigger('click');
    button2.trigger('click');
  });

  it("#1172 - Clone attributes object", function() {
    var View = VDOMItemView.extend({
      attributes: {foo: 'bar'}
    });

    var view1 = new View({id: 'foo'});
    strictEqual(view1.el.id, 'foo');

    var view2 = new View();
    ok(!view2.el.id);
  });

  it("#1228 - tagName can be provided as a function", function() {
    var View = VDOMItemView.extend({
      tagName: function() {
        return 'p';
      }
    });

    ok(new View().$el.is('p'));
  });

  it("views stopListening", function() {
    var View = VDOMItemView.extend({
      initialize: function() {
        this.listenTo(this.model, 'all x', function(){ ok(false); }, this);
        this.listenTo(this.collection, 'all x', function(){ ok(false); }, this);
      }
    });

    var view = new View({
      model: new Backbone.Model,
      collection: new Backbone.Collection
    });

    view.stopListening();
    view.model.trigger('x');
    view.collection.trigger('x');
  });

  it("Provide function for el.", function() {
    var View = VDOMItemView.extend({
      el: function() {
        return "<p><a></a></p>";
      }
    });

    var view = new View;
    ok(view.$el.is('p'));
    ok(view.$el.has('a'));
  });

  it("events passed in options", function() {
    setFixtures("<div id='testElement'><h1></h1></div>");

    var counter = 0;

    var View = VDOMItemView.extend({
      el: '#testElement',
      increment: function() {
        counter++;
      }
    });

    var view = new View({
      events: {
        'click h1': 'increment'
      }
    });

    view.$('h1').trigger('click').trigger('click');
    equal(counter, 2);
  });
});

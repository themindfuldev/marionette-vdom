'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Marionette = require('backbone.marionette');
var VDOMView = require('../../src/index.js').View;
var React = require('react');

var html = `
<div>
  <style>
p {
  font: 12px/16px Arial;
  margin: 10px 10px 15px;
}

button {
  font: bold 14px/14px Arial;
  margin-left: 10px;
}

#grid {
  margin: 10px;
}

#timing {
  clear: both;
  padding-top: 10px;
}

.box-view {
  width: 20px; height: 20px;
  float: left;
  position: relative;
  margin: 8px;
}

.box {
  border-radius: 100px;
  width: 20px; height: 10px;
  padding: 5px 0;
  color: #fff;
  font: 10px/10px Arial;
  text-align: center;
  position: absolute;
}
  </style>
  <button onclick="runBackbone()">Animate with Backbone</button>
  <button onclick="runMarionette()">Animate with Backbone + Marionette</button>
  <button onclick="runMarionetteVDOM()">Animate with Backbone + Marionette + VDOM</button>
  <button onclick="runReact()">Animate with Vanilla React</button>
  <button onclick="runVanilla()">Animate with Vanilla JavaScript</button>

  <p id="timing">&nbsp;</p>
  <div id="grid"></div>

  <script type="x-template" id="underscore-template">
    <div class="box" id="box-<%= number %>" style="top: <%= top %>px; left: <%= left %>px; background: rgb(0,0,<%= color %>);">
      <%= content %>
    </div>
  </script>
</div>
`;

// Change N to change the number of drawn circles.
var N = 300;

$(document.body).append(html);

// The Backbone implementation:
(function(){

var Box = Backbone.Model.extend({

    defaults: {
        top: 0,
        left: 0,
        color: 0,
        content: 0
    },

    initialize: function() {
        this.count = 0;
    },

    tick: function() {
        var count = this.count += 1;
        this.set({
            top: Math.sin(count / 10) * 10,
            left: Math.cos(count / 10) * 10,
            color: (count) % 255,
            content: count % 100
        });
    }

});


var BoxView = Backbone.View.extend({

    className: 'box-view',

    template: _.template($('#underscore-template').html()),

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
        this.$el.html(this.template(this.model.attributes));
        return this;
    }

});

var boxes;

var backboneInit = function() {
    boxes = _.map(_.range(N), function(i) {
        var box = new Box({number: i});
        var view = new BoxView({model: box});
        $('#grid').append(view.render().el);
        return box;
    });
};

var backboneAnimate = function() {
    for (var i = 0, l = boxes.length; i < l; i++) {
      boxes[i].tick();
    }
};

window.runBackbone = function() {
    reset();
    backboneInit();
    benchmarkLoop(backboneAnimate);
};

})();

// The Marionette implementation:
(function(){

var Box = Backbone.Model.extend({

    defaults: {
        top: 0,
        left: 0,
        color: 0,
        content: 0
    },

    initialize: function() {
        this.count = 0;
    },

    tick: function() {
        var count = this.count += 1;
        this.set({
            top: Math.sin(count / 10) * 10,
            left: Math.cos(count / 10) * 10,
            color: (count) % 255,
            content: count % 100
        });
    }

});

var BoxView = Marionette.View.extend({

    className: 'box-view',

    template: _.template($('#underscore-template').html()),

    modelEvents: {
       "change": "render"
    }

});

var boxes;

var marionetteInit = function() {
    boxes = _.map(_.range(N), function(i) {
        var box = new Box({number: i});
        var view = new BoxView({model: box});
        $('#grid').append(view.render().el);
        return box;
    });
};

var marionetteAnimate = function() {
    for (var i = 0, l = boxes.length; i < l; i++) {
      boxes[i].tick();
    }
};

window.runMarionette = function() {
    reset();
    marionetteInit();
    benchmarkLoop(marionetteAnimate);
};

})();

// The Marionette VDOM implementation:
(function(){

var Box = Backbone.Model.extend({

    defaults: {
        top: 0,
        left: 0,
        color: 0,
        content: 0
    },

    initialize: function() {
        this.count = 0;
    },

    tick: function() {
        var count = this.count += 1;
        this.set({
            top: Math.sin(count / 10) * 10,
            left: Math.cos(count / 10) * 10,
            color: (count) % 255,
            content: count % 100
        });
    }
});

var BoxView = VDOMView.extend({

    className: 'box-view',

    template: _.template($('#underscore-template').html()),

    modelEvents: {
       "change": "render"
    }

});

var boxes;

var marionetteInit = function() {
    boxes = _.map(_.range(N), function(i) {
        var box = new Box({number: i});
        var view = new BoxView({model: box});
        $('#grid').append(view.render().el);
        return box;
    });
};

var marionetteAnimate = function() {
    for (var i = 0, l = boxes.length; i < l; i++) {
      boxes[i].tick();
    }
};

window.runMarionetteVDOM = function() {
    reset();
    marionetteInit();
    benchmarkLoop(marionetteAnimate);
};

})();

// The Vanilla React implementation:
(function(){

var BoxView = React.createClass({

    render: function() {
        var count = this.props.count + 1;
        return (
            React.DOM.div(
                {className: "box-view"},
                React.DOM.div(
                    {
                        className: "box",
                        style: {
                            top: Math.sin(count / 10) * 10,
                            left: Math.cos(count / 10) * 10,
                            background: 'rgb(0, 0,' + count % 255 + ')'
                        }
                    },
                    count % 100
                )
            )
        );
    }

});

var BoxesView = React.createClass({

    render: function() {
        var boxes = _.map(_.range(N), function(i) {
            return BoxView({key: i, count: this.props.count});
        }, this);
        return React.DOM.div(null, boxes);
    }

});

var counter;
var reactInit = function() {
    counter = -1;
    reactAnimate();
};

var reactAnimate = function() {
    React.renderComponent(
        BoxesView({count: counter++}),
        document.getElementById('grid')
    );
};

window.runReact = function() {
    reset();
    reactInit();
    benchmarkLoop(reactAnimate);
};

})();

// VanillaJS
(function(){

var BoxView = function(number){
    this.el = document.createElement('div');
    this.el.className = 'box-view';
    this.el.innerHTML = '<div class="box" id="box-' + number + '"></div>';
    this.count = 0;
    this.render()
}

BoxView.prototype.render = function(){
     var count = this.count
     var el = this.el.firstChild
     el.style.top = Math.sin(count / 10) * 10 + 'px';
     el.style.left = Math.cos(count / 10) * 10 + 'px';
     el.style.background = 'rgb(0,0,' + count % 255 + ')';
     el.textContent = String(count % 100);
}

BoxView.prototype.tick = function(){
    this.count++;
    this.render();
}

var boxes;

var init = function() {
    boxes = _.map(_.range(N), function(i) {
        var view = new BoxView(i);
        document.getElementById('grid').appendChild(view.el);
        return view;
    });
};

var animate = function() {
    for (var i = 0, l = boxes.length; i < l; i++) {
      boxes[i].tick();
    }
};

window.runVanilla = function() {
    reset();
    init();
    benchmarkLoop(animate);
};

})();

window.timeout = null;
window.totalTime = null;
window.loopCount = null;
window.reset = function() {
    $('#grid').empty();
    $('#timing').html('&nbsp;');
    clearTimeout(timeout);
    loopCount = 0;
    totalTime = 0;
};

window.benchmarkLoop = function(fn) {
    var startDate = new Date();
    fn();
    var endDate = new Date();
    totalTime += endDate - startDate;
    loopCount++;
    if (loopCount % 20 === 0) {
        $('#timing').text('Performed ' + loopCount + ' iterations in ' + totalTime + ' ms (average ' + (totalTime / loopCount).toFixed(2) + ' ms per loop).');
    }
    timeout = _.defer(benchmarkLoop, fn);
};

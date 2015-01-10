[![Build Status](https://travis-ci.org/tiagorg/marionette-vdom.svg?branch=master)](https://travis-ci.org/tiagorg/marionette-vdom)

# marionette-vdom

A ```Marionette.ItemView``` and ```Marionette.CollectionView``` implementation with [virtual-dom](https://github.com/Matt-Esch/virtual-dom).

## Usage

Once you have loaded Marionette, just require it:

```javascript
require('marionette-vdom');
```

Now you can start using your ```Marionette.ItemView```s and ```Marionette.CollectionView```s with VDOM by just providing them the parameter ```enableVDOM: true```. You can do it either on the class definition or the object instantiation (the latter overrides the former):

```javascript
var View = Marionette.ItemView.extend({
  template: _.template('<p><a><b>w<%= content %></b></a></p>'),
  modelEvents: {
    "change": "render"
  },
  enableVDOM: true
});
```

or

```javascript
var myView = new View({
  model: myModel,
  enableVDOM: true
});
```

## How tos

To install:

```bash
npm install
```

To run the demo app:

```bash
npm run demo
open http://127.0.0.1:9966/demo/demo.html
```

To run the perf test:

```bash
npm run perf
open http://127.0.0.1:9966/perf/perf.html
```

To run the unit tests:

```bash
npm test
```

Make sure to check out the [change log](changelog.md).

# marionette-vdom
[![Build Status](https://travis-ci.org/tiagorg/marionette-vdom.svg?branch=master)](https://travis-ci.org/tiagorg/marionette-vdom) [![Coverage Status](https://coveralls.io/repos/tiagorg/marionette-vdom/badge.svg)](https://coveralls.io/r/tiagorg/marionette-vdom) [![npm version](https://badge.fury.io/js/marionette-vdom.svg)](http://badge.fury.io/js/marionette-vdom) [![Davis Dependency status](https://david-dm.org/tiagorg/marionette-vdom.svg)](https://david-dm.org/tiagorg/marionette-vdom)

A ```Marionette.View``` and ```Marionette.CompositeView``` implementation with [virtual-dom](https://github.com/Matt-Esch/virtual-dom).

## Version

- If you are using Marionette.js v3+ you should use marionette-vdom v0.2+ (or the latest)
- If you are using Marionette.js v2 you should use marionette-vdom v0.1.2-b

## Usage

This module exposes ```View``` as the VDOM implementation for ```Marionette.View``` and ```CompositeView``` for ```Marionette.CompositeView```:

```javascript
var VDOMView = require('marionette-vdom').View;
var VDOMCompositeView = require('marionette-vdom').CompositeView;
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

To generate binaries:

```bash
./build.sh
uglifyjs --compress --mangle -- marionette.vdom.js > marionette.vdom.min.js
```

Make sure to check out the [change log](changelog.md).

## Browser support

IE 9 on

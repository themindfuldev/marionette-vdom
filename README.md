[![Build Status](https://travis-ci.org/tiagorg/marionette-vdom.svg?branch=master)](https://travis-ci.org/tiagorg/marionette-vdom)

# marionette-vdom

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/tiagorg/marionette-vdom?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A ```Marionette.ItemView``` and ```Marionette.CollectionView``` implementation with [virtual-dom](https://github.com/Matt-Esch/virtual-dom).

## Usage

This module exposes ```VDOMItemView``` as the VDOM implementation for ```Marionette.ItemView``` and ```VDOMCollectionView``` for ```Marionette.CollectionView```:

```javascript
var VDOMItemView = require('marionette-vdom').VDOMItemView;
var VDOMCollectionView = require('marionette-vdom').VDOMCollectionView;
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

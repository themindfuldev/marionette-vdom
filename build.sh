#!/bin/bash

./node_modules/.bin/browserify index.js \
  --standalone Marionette.VDOM \
  --external backbone.marionette \
  --external backbone \
  --external underscore \
  | ./node_modules/.bin/global-lookup-shim \
    --global-shim underscore:_ \
    --global-shim backbone:Backbone \
    --global-shim backbone.marionette:Mn \
  > dist/marionette.vdom.js

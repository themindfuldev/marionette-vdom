### upcoming [v0.0.2](https://github.com/tiagorg/Backbone.VDOMView/releases/tag/v0.0.2) [view commit logs](https://github.com/tiagorg/Backbone.VDOMView/compare/v0.0.1...master)

#### Overview

* The main goal of this version is to fix the 3 unit tests that are failing and improve the test suite.

#### Next steps

* Come up with virtual DOM implementation for other Marionette views.
* Strive for conceiving a reusable virtual DOM View to be extended by the leaf Marionette views (either by inheritance or mixing).

### [v0.0.1](https://github.com/tiagorg/Backbone.VDOMView/releases/tag/v0.0.1)

#### Overview

* The main goal of this version is to prove the concept of Virtual DOM over Marionette Views as it was suggested on a [Marionette.js thread](https://github.com/marionettejs/backbone.marionette/issues/2126)

#### Features

* Based on [virtual-dom](https://github.com/Matt-Esch/virtual-dom)
* Uses [html-to-vdom](https://github.com/TimBeyer/html-to-vdom) to convert any HTML template to VDOM.
* Each time the view needs to render, it will go through the following process (specified in ```attachElContent``` method):
    * generate a new virtual DOM element from the newly generated HTML.
    * diff this new virtual DOM element with the current one and obtain a patch.
    * patch the current real DOM with it
* [@samccone](https://github.com/samccone) very kindly pitched in, bringing the unit test suite from Marionette and Backbone in order to assess which work needs to be done for the solution to be more solid and perhaps get released.
* Out of 90 test cases we have only gotten 3 failures, which is pretty impressive.
* I was able to verify it does really work by comparing DevTools output for 2 scenarios, virtual vs non-virtual:

##### Non-virtual
![screen shot 2014-12-26 at 3 32 55 pm](https://cloud.githubusercontent.com/assets/764487/5559881/db7e521c-8d14-11e4-9c44-fa0d0ea27622.png)
![screen shot 2014-12-26 at 3 33 29 pm](https://cloud.githubusercontent.com/assets/764487/5559882/e1369908-8d14-11e4-9795-78306243992a.png)

Notice the increasing number of Nodes, from 628 to 629 in 10s.
The Used JS Heap is pretty high and increasing.

##### Virtual 
![screen shot 2014-12-26 at 3 30 55 pm](https://cloud.githubusercontent.com/assets/764487/5559883/e83f20d0-8d14-11e4-93eb-6aa1929d7b36.png)
![screen shot 2014-12-26 at 3 31 47 pm](https://cloud.githubusercontent.com/assets/764487/5559884/eb53fcaa-8d14-11e4-9d9a-c534a21de720.png)

Notice the number of Nodes stays on 403 over the same 10s.
There is also plenty of more JS happening (2nd image) but the Used JS Heap is much lower.

#### Next steps

* Fix the 3 unit tests that are failing.
* Improve the test suite.

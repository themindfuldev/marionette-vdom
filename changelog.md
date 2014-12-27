### v0.0.1 

* [view tag](https://github.com/tiagorg/Backbone.VDOMView/releases/tag/v0.0.1)

#### Overview

* Main goal is to prove the concept as it was suggested on a [Marionette.js thread](https://github.com/marionettejs/backbone.marionette/issues/2126)

#### Features

* Based on [virtual-dom](https://github.com/Matt-Esch/virtual-dom)
* Each view's render will compare to its previous state and only diff to it.
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

* The code is not very neat, it is making certain assumptions about the Backbone.View's ```el``` as it is appending the internal virtual element into it. I want to avoid that by working with ```setElement``` method from Backbone.View. 
* As far for Marionette.js: @samccone and @jmeas suggested using Marionette.View as a base class and from there see if we can get event registration and UI working. Also, strive for supporting a ```itemView``` replacement. I am thinking about making a fork for Marionette.
* Yet another alternative to vdom would be going with HTMLBars. I should learn up until which point is it worth to continue playing with VDOM.


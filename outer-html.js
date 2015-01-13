/*
 * outerHTML.js
 *   Cross-browser full HTMLElement.outerHTML implementation.
 *
 * 2011-11-14
 *
 * By Eli Grey, http://eligrey.com
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

if (typeof document !== "undefined" && !("outerHTML" in document.createElementNS("http://www.w3.org/1999/xhtml", "_"))) {

(function(view) {
"use strict";

var
    container = document.createElementNS("http://www.w3.org/1999/xhtml", "_")
  , elem_proto = (view.HTMLElement || view.Element).prototype
  , xml_serializer = new XMLSerializer
  , outerHTML_getter = function() {
    var
        node = this
      , html
    ;
    if (document.xmlVersion) {
      return xml_serializer.serializeToString(node);
    } else {
      container.appendChild(node.cloneNode(false));
      html = container.innerHTML.replace("><", ">" + node.innerHTML + "<");
      container.innerHTML = "";
      return html;
    }
  }
  , outerHTML_setter = function(html) {
    var
        node = this
      , parent = node.parentNode
      , child
    ;
    if (parent === null) {
      DOMException.code = DOMException.NOT_FOUND_ERR;
      throw DOMException;
    }
    container.innerHTML = html;
    while ((child = container.firstChild)) {
      parent.insertBefore(child, node);
    }
    parent.removeChild(node);
  }
;

if (Object.defineProperty) {
  var outerHTML_prop_desc = {
      get: outerHTML_getter
    , set: outerHTML_setter
    , enumerable: true
    , configurable: true
  };
  try {
    Object.defineProperty(elem_proto, "outerHTML", outerHTML_prop_desc);
  } catch (ex) { // IE 8 doesn't support enumerable:true
    if (ex.number === -0x7FF5EC54) {
      outerHTML_prop_desc.enumerable = false;
      Object.defineProperty(elem_proto, "outerHTML", outerHTML_prop_desc);
    }
  }
} else if (Object.prototype.__defineGetter__ && Object.prototype.__defineSetter__) {
  elem_proto.__defineGetter__("outerHTML", outerHTML_getter);
  elem_proto.__defineSetter__("outerHTML", outerHTML_setter);
}

}(self));

}

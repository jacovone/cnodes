"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FEqual = undefined;

var _fcompare = require("./fcompare.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class override the FCompare node with a comparision of EQUAL
 */
class FEqual extends _fcompare.FCompare {
  // Provide a node instance

  /**
   * Construct a new FEqual
   */
  constructor() {
    super(_fcompare.Comparision.EQUAL);
    this.name = "FEqual";
    this.title = "==";
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = FEqual.instance) {
    return super.clone(factory);
  }

}

exports.FEqual = FEqual;

_defineProperty(FEqual, "instance", () => new FEqual());
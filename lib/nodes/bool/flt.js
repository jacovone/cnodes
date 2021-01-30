"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FLT = undefined;

var _fcompare = require("./fcompare.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class override the FCompare node with a comparision of FLT
 */
class FLT extends _fcompare.FCompare {
  // Provide a node instance

  /**
   * Construct a new FLT
   */
  constructor() {
    super(_fcompare.Comparision.LT);
    this.name = "FLT";
    this.title = "<";
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = FLT.instance) {
    return super.clone(factory);
  }

}

exports.FLT = FLT;

_defineProperty(FLT, "instance", () => new FLT());
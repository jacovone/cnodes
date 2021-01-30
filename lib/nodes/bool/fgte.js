"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FGTE = undefined;

var _fcompare = require("./fcompare.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class override the FCompare node with a comparision of GTE
 */
class FGTE extends _fcompare.FCompare {
  // Provide a node instance

  /**
   * Construct a new FGTE
   */
  constructor() {
    super(_fcompare.Comparision.GTE);
    this.name = "FGTE";
    this.title = ">=";
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = FGTE.instance) {
    return super.clone(factory);
  }

}

exports.FGTE = FGTE;

_defineProperty(FGTE, "instance", () => new FGTE());
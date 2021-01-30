"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FGT = undefined;

var _fcompare = require("./fcompare.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class override the FCompare node with a comparision of GT
 */
class FGT extends _fcompare.FCompare {
  // Provide a node instance

  /**
   * Construct a new FGT
   */
  constructor() {
    super(_fcompare.Comparision.GT);
    this.name = "FGT";
    this.title = ">";
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = FGT.instance) {
    return super.clone(factory);
  }

}

exports.FGT = FGT;

_defineProperty(FGT, "instance", () => new FGT());
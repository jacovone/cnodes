"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FNotEqual = undefined;

var _fcompare = require("./fcompare.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class override the FCompare node with a comparision of NOT_EQUAL
 */
class FNotEqual extends _fcompare.FCompare {
  // Provide a node instance

  /**
   * COnstruct a new FNotEqual node
   */
  constructor() {
    super(_fcompare.Comparision.NOT_EQUAL);
    this.name = "FNotEqual";
    this.title = "!=";
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = FNotEqual.instance) {
    return super.clone(factory);
  }

}

exports.FNotEqual = FNotEqual;

_defineProperty(FNotEqual, "instance", () => new FNotEqual());
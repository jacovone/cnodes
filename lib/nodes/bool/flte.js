"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FLTE = undefined;

var _fcompare = require("./fcompare.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class override the FCompare node with a comparision of FLTE
 */
class FLTE extends _fcompare.FCompare {
  // Provide a node instance

  /**
   * Construct a new FLTE
   */
  constructor() {
    super(_fcompare.Comparision.LTE);
    this.name = "FLTE";
    this.title = "<=";
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = FLTE.instance) {
    return super.clone(factory);
  }

}

exports.FLTE = FLTE;

_defineProperty(FLTE, "instance", () => new FLTE());
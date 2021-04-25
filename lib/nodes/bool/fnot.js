"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FNot = undefined;

var _node = require("../../core/node.js");

var _socket = require("../../core/socket.js");

var _type = require("../../core/type.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class implements a functional node FNot compairing boolean values.
 */
class FNot extends _node.Node {
  // Provide a node instance

  /**
   * Construct a new FNot node
   */
  constructor() {
    super("FNot"); // The node is pure functional

    this.functional = true; // Default to two numeric inputs

    this.inputs = [new _socket.InputSocket("Val", this, _type.Types.BOOLEAN, false)];
    this.outputs = [new _socket.OutputSocket("Val", this, _type.Types.BOOLEAN, 0, false)];
    this.prev = null;
    this.nexts = [];
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = FNot.instance) {
    return super.clone(factory);
  }
  /**
   * The process override
   */


  async process() {
    await this.evaluateInputs();
    let val = this.input("Val").value;
    this.output("Val").value = !val;
  }

}

exports.FNot = FNot;

_defineProperty(FNot, "instance", () => new FNot());
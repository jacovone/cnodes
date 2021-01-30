"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FSqrt = undefined;

var _node = require("../../core/node.js");

var _socket = require("../../core/socket.js");

var _type = require("../../core/type.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class implements a functional node for Square Root.
 */
class FSqrt extends _node.Node {
  // Provide a node instance

  /**
   * Construct a new FSqrt node
   */
  constructor() {
    super("FSqrt"); // The node is pure functional

    this.functional = true; // Default to one numeric inputs

    this.inputs = [new _socket.InputSocket("Val", this, _type.Types.NUMBER, 0)];
    this.outputs = [new _socket.OutputSocket("Val", this, _type.Types.NUMBER, 0, false)];
    this.prev = null;
    this.nexts = [];
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = FSqrt.instance) {
    return super.clone(factory);
  }
  /**
   * The process override
   */


  async process() {
    await this.evaluateInputs();
    this.output("Val").value = Math.sqrt(parseFloat(this.input("Val").value));
  }

}

exports.FSqrt = FSqrt;

_defineProperty(FSqrt, "instance", () => new FSqrt());
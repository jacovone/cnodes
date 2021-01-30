"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FDiv = undefined;

var _node = require("../../core/node.js");

var _socket = require("../../core/socket.js");

var _type = require("../../core/type.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class implements a functional node for divide numeric values.
 */
class FDiv extends _node.Node {
  // Provide a node instance

  /**
   * Construct a new FDiv node
   */
  constructor() {
    super("FDiv"); // The node is pure functional

    this.functional = true; // Default to two numeric inputs

    this.inputs = [new _socket.InputSocket("Val1", this, _type.Types.NUMBER, 0), new _socket.InputSocket("Val2", this, _type.Types.NUMBER, 0)];
    this.outputs = [new _socket.OutputSocket("Val", this, _type.Types.NUMBER, 0, false)];
    this.prev = null;
    this.nexts = [];
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = FDiv.instance) {
    return super.clone(factory);
  }
  /**
   * The process override
   */


  async process() {
    await this.evaluateInputs();
    this.output("Val").value = parseFloat(this.input("Val1").value) / parseFloat(this.input("Val2").value);
  }

}

exports.FDiv = FDiv;

_defineProperty(FDiv, "instance", () => new FDiv());
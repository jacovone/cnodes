"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FNConst = undefined;

var _node = require("../../core/node.js");

var _socket = require("../../core/socket.js");

var _type = require("../../core/type.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class implements a node to get return a simple
 * number constant. This is a functional node.
 */
class FNConst extends _node.Node {
  // Provide a node instance

  /**
   * Construct a new FNConst node
   */
  constructor() {
    super("FNConst");
    this.functional = true;
    this.inputs = [new _socket.InputSocket("Val", this, _type.Types.ANY, 0)];
    this.outputs = [new _socket.OutputSocket("Val", this, _type.Types.NUMBER, 0, false)];
    this.nexts = [];
    this.prev = null;
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = FNConst.instance) {
    return super.clone(factory);
  }
  /**
   * The process function
   */


  async process() {
    await this.evaluateInputs(); // Convert the constant/input value to a string

    this.output("Val").value = parseFloat(this.input("Val").value);
  }

}

exports.FNConst = FNConst;

_defineProperty(FNConst, "instance", () => new FNConst());
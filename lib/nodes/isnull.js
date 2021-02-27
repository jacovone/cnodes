"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FIsNull = undefined;

var _node = require("../core/node.js");

var _socket = require("../core/socket.js");

var _type = require("../core/type.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class implements a functional conditional node
 */
class FIsNull extends _node.Node {
  // Provide a node instance

  /**
   * Construct a new FIf node
   */
  constructor() {
    super("FIsNull"); // The node is pure functional

    this.functional = true; // One single input for any value

    this.inputs = [new _socket.InputSocket("Val", this, _type.Types.ANY, {})]; // The output value indicates if the input value is null

    this.outputs = [new _socket.OutputSocket("Val", this, _type.Types.BOOLEAN, false)];
    this.prev = null;
    this.nexts = [];
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = FIsNull.instance) {
    return super.clone(factory);
  }
  /**
   * The process override
   */


  async process() {
    await this.evaluateInputs();
    this.output("Val").value = this.input("Val").value === null;
  }

}

exports.FIsNull = FIsNull;

_defineProperty(FIsNull, "instance", () => new FIsNull());
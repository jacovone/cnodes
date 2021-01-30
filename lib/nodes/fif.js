"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FIf = undefined;

var _node = require("../core/node.js");

var _socket = require("../core/socket.js");

var _type = require("../core/type.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class implements a functional conditional node
 */
class FIf extends _node.Node {
  // Provide a node instance

  /**
   * Construct a new FIf node
   */
  constructor() {
    super("FIf"); // The node is pure functional

    this.functional = true; // Default to two any inputs

    this.inputs = [new _socket.InputSocket("Condition", this, _type.Types.BOOLEAN, false), new _socket.InputSocket("True", this, _type.Types.ANY, 0), new _socket.InputSocket("False", this, _type.Types.ANY, 0)];
    this.outputs = [new _socket.OutputSocket("Val", this, _type.Types.ANY, 0, false)];
    this.prev = null;
    this.nexts = [];
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = FIf.instance) {
    return super.clone(factory);
  }
  /**
   * The process override
   */


  async process() {
    await this.evaluateInputs();
    this.output("Val").value = this.input("Condition").value ? this.input("True").value : this.input("False").value;
  }

}

exports.FIf = FIf;

_defineProperty(FIf, "instance", () => new FIf());
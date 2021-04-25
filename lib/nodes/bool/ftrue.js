"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FTrue = undefined;

var _node = require("../../core/node.js");

var _socket = require("../../core/socket.js");

var _type = require("../../core/type.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class implements a functional constant node
 */
class FTrue extends _node.Node {
  // Provide a node instance

  /**
   * Construct a new FTrue node
   */
  constructor() {
    super("FTrue"); // The node is pure functional

    this.functional = true; // Default to two numeric inputs

    this.inputs = [];
    this.outputs = [new _socket.OutputSocket("Val", this, _type.Types.BOOLEAN, 0, false)];
    this.prev = null;
    this.nexts = [];
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = FTrue.instance) {
    return super.clone(factory);
  }
  /**
   * The process override
   */


  async process() {
    this.output("Val").value = true;
  }

}

exports.FTrue = FTrue;

_defineProperty(FTrue, "instance", () => new FTrue());
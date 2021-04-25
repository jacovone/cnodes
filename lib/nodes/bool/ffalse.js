"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FFalse = undefined;

var _node = require("../../core/node.js");

var _socket = require("../../core/socket.js");

var _type = require("../../core/type.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class implements a functional constant node
 */
class FFalse extends _node.Node {
  // Provide a node instance

  /**
   * Construct a new FFalse node
   */
  constructor() {
    super("FFalse"); // The node is pure functional

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


  clone(factory = FFalse.instance) {
    return super.clone(factory);
  }
  /**
   * The process override
   */


  async process() {
    this.output("Val").value = false;
  }

}

exports.FFalse = FFalse;

_defineProperty(FFalse, "instance", () => new FFalse());
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FALength = undefined;

var _node = require("../../core/node.js");

var _socket = require("../../core/socket.js");

var _type = require("../../core/type.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class implements a functional node for get
 * the length of an array
 */
class FALength extends _node.Node {
  // Provide a node instance

  /**
   * Construct a new FALength node
   */
  constructor() {
    super("FALength"); // The node is pure functional

    this.functional = true; // Default to two numeric inputs

    this.inputs = [new _socket.InputSocket("Array", this, _type.Types.ARRAY, 0)];
    this.outputs = [new _socket.OutputSocket("Val", this, _type.Types.NUMBER, 0, false)];
    this.prev = null;
    this.nexts = [];
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = FALength.instance) {
    return super.clone(factory);
  }
  /**
   * The process override
   */


  async process() {
    await this.evaluateInputs();
    let arr = this.input("Array").value;

    if (!Array.isArray(arr)) {// TODO: Manage error
    } else {
      this.output("Val").value = arr.length;
    }
  }

}

exports.FALength = FALength;

_defineProperty(FALength, "instance", () => new FALength());
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FAGet = undefined;

var _node = require("../../core/node.js");

var _socket = require("../../core/socket.js");

var _type = require("../../core/type.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class implements a functional node for pick
 * a single value from an array
 */
class FAGet extends _node.Node {
  // Provide a node instance

  /**
   * Construct a new FAGet node
   */
  constructor() {
    super("FAGet"); // The node is pure functional

    this.functional = true; // Default to two numeric inputs

    this.inputs = [new _socket.InputSocket("Array", this, _type.Types.ARRAY, 0), new _socket.InputSocket("Index", this, _type.Types.NUMBER, 0)];
    this.outputs = [new _socket.OutputSocket("Val", this, _type.Types.ANY, 0, false)];
    this.prev = null;
    this.nexts = [];
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = FAGet.instance) {
    return super.clone(factory);
  }
  /**
   * The process override
   */


  async process() {
    await this.evaluateInputs();
    let arr = this.input("Array").value;
    let index = parseInt(this.input("Index").value, 10);

    if (!Array.isArray(arr)) {// TODO: Manage error
    } else {
      this.output("Val").value = arr[index];
    }
  }

}

exports.FAGet = FAGet;

_defineProperty(FAGet, "instance", () => new FAGet());
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FAConst = undefined;

var _node = require("../../core/node.js");

var _socket = require("../../core/socket.js");

var _type = require("../../core/type.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class implements a node to get an array
 * as a string constant by JSON.parse() the input string.
 */
class FAConst extends _node.Node {
  // Provide a node instance

  /**
   * Construct a new FAConst node
   */
  constructor() {
    super("FAConst");
    this.functional = true;
    this.inputs = [new _socket.InputSocket("Val", this, _type.Types.STRING, "[0, 1, 2]")];
    this.outputs = [new _socket.OutputSocket("Val", this, _type.Types.ARRAY, [], false)];
    this.nexts = [];
    this.prev = null;
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = FAConst.instance) {
    return super.clone(factory);
  }
  /**
   * The process function
   */


  async process() {
    await this.evaluateInputs(); // Convert the constant/input value to an array

    try {
      this.output("Val").value = JSON.parse(this.input("Val").value);

      if (!Array.isArray(this.output("Val").value)) {
        throw new Error(`The input value (${this.output("Val").value}) is not an array`);
      }
    } catch (error) {
      // TODO: Manage error
      console.log(error);
    }
  }

}

exports.FAConst = FAConst;

_defineProperty(FAConst, "instance", () => new FAConst());
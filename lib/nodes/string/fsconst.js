"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FSConst = undefined;

var _node = require("../../core/node.js");

var _socket = require("../../core/socket.js");

var _type = require("../../core/type.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class implements a node to get return a simple
 * string constant. This is a functional node.
 */
class FSConst extends _node.Node {
  // Provide a node instance

  /**
   * Construct a new FSConst node
   */
  constructor() {
    super("FSConst");
    this.functional = true;
    this.inputs = [new _socket.InputSocket("Val", this, _type.Types.ANY, "")];
    this.outputs = [new _socket.OutputSocket("Val", this, _type.Types.STRING, "", false)];
    this.nexts = [];
    this.prev = null;
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = FSConst.instance) {
    return super.clone(factory);
  }
  /**
   * The process function
   */


  async process() {
    await this.evaluateInputs(); // Convert the constant/input value to a string

    this.output("Val").value = this.input("Val").value.toString();
  }

}

exports.FSConst = FSConst;

_defineProperty(FSConst, "instance", () => new FSConst());
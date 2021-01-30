"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.APush = undefined;

var _node = require("../../core/node.js");

var _socket = require("../../core/socket.js");

var _type = require("../../core/type.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class implements a cnode that pushes a value
 * into an array
 */
class APush extends _node.Node {
  // Provide a node instance

  /**
   * Construct a new APush node
   */
  constructor() {
    super("APush");
    this.inputs = [new _socket.InputSocket("Array", this, _type.Types.ARRAY), new _socket.InputSocket("Val", this, _type.Types.ANY)];
    this.outputs = [new _socket.OutputSocket("Val", this, _type.Types.ANY)];
    this.nexts = [new _socket.NextSocket("Out", this)];
    this.prev = new _socket.PrevSocket("In", this);
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = APush.instance) {
    return super.clone(factory);
  }
  /**
   * The process method
   */


  async process() {
    await this.evaluateInputs();
    let arr = this.input("Array").value;
    let val = this.input("Val").value;

    if (!Array.isArray(arr)) {// TODO: Manage error
    } else {
      arr.push(val);
      this.output("Val").value = arr;
    }

    return this.getFlowResult(this.next("Out"));
  }

}

exports.APush = APush;

_defineProperty(APush, "instance", () => new APush());
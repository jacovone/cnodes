"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Console = undefined;

var _node = require("../core/node.js");

var _socket = require("../core/socket.js");

var _type = require("../core/type.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class implements a cnode that print to the
 * console the input value
 */
class Console extends _node.Node {
  // Provide a node instance

  /**
   * Construct a new Console node
   */
  constructor() {
    super("Console");
    this.inputs = [new _socket.InputSocket("Val", this, _type.Types.ANY)];
    this.outputs = [];
    this.nexts = [new _socket.NextSocket("Out", this)];
    this.prev = new _socket.PrevSocket("In", this);
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = Console.instance) {
    return super.clone(factory);
  }
  /**
   * The process method
   */


  async process() {
    await this.evaluateInputs();
    console.log(this.input("Val").value);
    return this.getFlowResult(this.next("Out"));
  }

}

exports.Console = Console;

_defineProperty(Console, "instance", () => new Console());
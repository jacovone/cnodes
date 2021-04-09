"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Log = undefined;

var _node = require("../core/node.js");

var _program = require("../core/program.js");

var _socket = require("../core/socket.js");

var _type = require("../core/type.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class implements a cnode that log a message through
 * the events system
 */
class Log extends _node.Node {
  /** Return an instance of this node */

  /**
   * Construct a new Log node
   */
  constructor() {
    super("Log");
    this.inputs = [new _socket.InputSocket("Val", this, _type.Types.ANY)];
    this.outputs = [];
    this.nexts = [new _socket.NextSocket("Out", this)];
    this.prev = new _socket.PrevSocket("In", this);
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = Log.instance) {
    return super.clone(factory);
  }
  /**
   * The process method
   */


  async process() {
    await this.evaluateInputs(); // Send a "log" event

    _program.Program.events.emit("cn:log", this.input("Val").value);

    return this.getFlowResult(this.next("Out"));
  }

}

exports.Log = Log;

_defineProperty(Log, "instance", () => new Log());
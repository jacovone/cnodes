"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Exit = undefined;

var _node = require("./node.js");

var _socket = require("./socket.js");

var _type = require("./type.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class implements a cnode that is the starting point for a
 * program. The program can be top-level or not
 */
class Exit extends _node.Node {
  // Provide a node instance

  /**
   * Construct a new Exit node
   */
  constructor() {
    super("Exit");
    this.removable = false;
    this.creatable = false;
    this.inputs = [new _socket.InputSocket("Val", this, _type.Types.ANY, 0)];
    this.outputs = [];
    this.nexts = [];
    this.prev = new _socket.PrevSocket("End", this);
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = Exit.instance) {
    return super.clone(factory);
  }
  /**
   * The process method
   */


  async process() {
    await this.evaluateInputs();
    return new _node.Result(); // End process
  }

}

exports.Exit = Exit;

_defineProperty(Exit, "instance", () => new Exit());
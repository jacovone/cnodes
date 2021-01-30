"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Enter = undefined;

var _node = require("./node.js");

var _socket = require("./socket.js");

var _type = require("./type.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class implements a cnode that is the starting point for a
 * program. The program can be top-level or not
 */
class Enter extends _node.Node {
  // Provide a node instance

  /**
   * Construct a new Enter node
   */
  constructor() {
    super("Enter");
    this.removable = false;
    this.creatable = false;
    this.inputs = [];
    this.outputs = [new _socket.OutputSocket("Val", this, _type.Types.ANY, 0)];
    this.nexts = [new _socket.NextSocket("Begin", this)];
    this.prev = null;
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = Enter.instance) {
    return super.clone(factory);
  }
  /**
   * The process method
   */


  async process() {
    return this.getFlowResult(this.next("Begin"));
  }

}

exports.Enter = Enter;

_defineProperty(Enter, "instance", () => new Enter());
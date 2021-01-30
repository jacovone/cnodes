"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wait = undefined;

var _node = require("../core/node.js");

var _socket = require("../core/socket.js");

var _type = require("../core/type.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class implements a cnode that waits for a specified
 * number of seconds
 */
class Wait extends _node.Node {
  /** Return an instance of this node */

  /**
   * Construct a new Wait node
   */
  constructor() {
    super("Wait");
    this.inputs = [new _socket.InputSocket("Secs", this, _type.Types.NUMBER)];
    this.outputs = [];
    this.nexts = [new _socket.NextSocket("Out", this)];
    this.prev = new _socket.PrevSocket("In", this);
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = Wait.instance) {
    return super.clone(factory);
  }
  /**
   * The process method
   */


  async process() {
    await this.evaluateInputs();
    await new Promise(res => {
      setTimeout(() => {
        res();
      }, parseFloat(this.input("Secs").value) * 1000);
    });
    return this.getFlowResult(this.next("Out"));
  }

}

exports.Wait = Wait;

_defineProperty(Wait, "instance", () => new Wait());
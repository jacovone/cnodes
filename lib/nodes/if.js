"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.If = undefined;

var _node = require("../core/node.js");

var _socket = require("../core/socket.js");

var _type = require("../core/type.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class implements a node that is able to
 * redirect the flow of execution based on the
 * "condition" input value
 */
class If extends _node.Node {
  // Provide a node instance

  /**
   * Construct a new If node
   */
  constructor() {
    super("If");
    this.inputs = [new _socket.InputSocket("Condition", this, _type.Types.BOOLEAN, false)];
    this.outputs = [];
    this.nexts = [new _socket.NextSocket("Then", this), new _socket.NextSocket("Else", this)];
    this.prev = new _socket.PrevSocket("In", this);
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = If.instance) {
    return super.clone(factory);
  }
  /**
   * The process function
   */


  async process() {
    await this.evaluateInputs();
    let flow = null;

    if (this.input("Condition").value) {
      flow = this.next("Then");
    } else {
      flow = this.next("Else");
    }

    return this.getFlowResult(flow);
  }

}

exports.If = If;

_defineProperty(If, "instance", () => new If());
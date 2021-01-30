"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Call = undefined;

var _node = require("../core/node.js");

var _socket = require("../core/socket.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class implements a subroutine/function call
 */
class Call extends _node.Node {
  // Provide a node instance

  /**
   * Construct a new Call node
   */
  constructor() {
    super("Call");
    this.inputs = [];
    this.outputs = [];
    this.nexts = [new _socket.NextSocket("Out", this), new _socket.NextSocket("Call", this)];
    this.prev = new _socket.PrevSocket("In", this);
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = Call.instance) {
    return super.clone(factory);
  }
  /**
   * The process function
   */


  async process() {
    // Save the current program's node
    let prevCurrentNode = this.program.currentNode; // Execute a sub program beginning on that node

    await this.program.processFrom(this.next("Call").peer.node); // Restore the current program's node

    this.program.currentNode = prevCurrentNode;
    return this.getFlowResult(this.next("Out"));
  }

}

exports.Call = Call;

_defineProperty(Call, "instance", () => new Call());
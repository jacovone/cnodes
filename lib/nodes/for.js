"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.For = undefined;

var _node = require("../core/node.js");

var _socket = require("../core/socket.js");

var _type = require("../core/type.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class implements a node that is able to
 * iterate over a range of integers, like the form
 * for(let i=start; i<end; i++) do();
 */
class For extends _node.Node {
  // Provide a node instance

  /**
   * Construct a new For node
   */
  constructor() {
    super("For");
    this.inputs = [new _socket.InputSocket("From", this, _type.Types.NUMBER, 0), new _socket.InputSocket("To", this, _type.Types.NUMBER, 0)];
    this.outputs = [new _socket.OutputSocket("Index", this, _type.Types.NUMBER, 0)];
    this.nexts = [new _socket.NextSocket("Out", this), new _socket.NextSocket("Do", this)];
    this.prev = new _socket.PrevSocket("In", this);
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = For.instance) {
    return super.clone(factory);
  }
  /**
   * The process function
   */


  async process() {
    await this.evaluateInputs(); // Save the current program's node

    let prevCurrentNode = this.program.currentNode; // Set the "Index" output value to Index

    this.output("Index").value = parseInt(this.input("From").value); // Re evaluate inputs in case of Condition depends on Index output

    await this.evaluateInputs(); // Let's cycle from "From" to "To" values

    for (let index = parseInt(this.input("From").value); index < parseInt(this.input("To").value); index++) {
      // Set the "Index" output value to Index
      this.output("Index").value = index; // If there's a node connected to the "Do" next socket...

      if (this.next("Do").peer?.node) {
        // Execute a sub program beginning on that node
        await this.program.processFrom(this.next("Do").peer.node);
      }
    } // Restore the current program's node


    this.program.currentNode = prevCurrentNode;
    return this.getFlowResult(this.next("Out"));
  }

}

exports.For = For;

_defineProperty(For, "instance", () => new For());
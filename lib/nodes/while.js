"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.While = undefined;

var _node = require("../core/node.js");

var _socket = require("../core/socket.js");

var _type = require("../core/type.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class implements a node that is able to
 * iterate until a condition become false, like
 * while(condition) do();
 */
class While extends _node.Node {
  // Provide a node instance

  /**
   * Construct a new While node
   */
  constructor() {
    super("While");
    this.inputs = [new _socket.InputSocket("Index", this, _type.Types.NUMBER, 0), new _socket.InputSocket("Condition", this, _type.Types.BOOLEAN, false)];
    this.outputs = [new _socket.OutputSocket("Index", this, _type.Types.NUMBER, 0)];
    this.nexts = [new _socket.NextSocket("Out", this), new _socket.NextSocket("Do", this)];
    this.prev = new _socket.PrevSocket("In", this);
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = While.instance) {
    return super.clone(factory);
  }
  /**
   * The process function
   */


  async process() {
    await this.evaluateInputs(); // Save the current program's node

    let prevCurrentNode = this.program.currentNode; // A bouns index variable ;-)

    let index = parseFloat(this.input("Index").value); // Set the "Index" output value to Index

    this.output("Index").value = index; // Re evaluate inputs in case of Condition depends on Index output

    await this.evaluateInputs(); // Let's cycle while condition is true

    while (this.input("Condition").value) {
      // If there's a node connected to the "Do" next socket...
      if (this.next("Do").peer !== null && this.next("Do").peer.node !== null) {
        // Set the "Index" output value to Index
        this.output("Index").value = index++; // Execute a sub program beginning on that node

        await this.program.processFrom(this.next("Do").peer.node); // Re-compute the guard...

        await this.evaluateInputs();
      }
    } // Restore the currentprogram's node


    this.program.currentNode = prevCurrentNode;
    return this.getFlowResult(this.next("Out"));
  }

}

exports.While = While;

_defineProperty(While, "instance", () => new While());
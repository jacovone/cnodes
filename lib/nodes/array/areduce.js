"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AReduce = undefined;

var _node = require("../../core/node.js");

var _socket = require("../../core/socket.js");

var _type = require("../../core/type.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class implements a cnode that reduces an array to
 * a value
 */
class AReduce extends _node.Node {
  // Provide a node instance

  /**
   * Construct a new AReduce node
   */
  constructor() {
    super("AReduce");
    this.inputs = [new _socket.InputSocket("Array", this, _type.Types.ARRAY), new _socket.InputSocket("Acc0", this, _type.Types.ANY), new _socket.InputSocket("Acc", this, _type.Types.ANY)];
    this.outputs = [new _socket.OutputSocket("Val", this, _type.Types.ANY, "", false), new _socket.OutputSocket("Item", this, _type.Types.ANY, "", true), new _socket.OutputSocket("Acc", this, _type.Types.ANY, "", true), new _socket.OutputSocket("Index", this, _type.Types.NUMBER, 0, true)];
    this.nexts = [new _socket.NextSocket("Out", this), new _socket.NextSocket("Do", this)];
    this.prev = new _socket.PrevSocket("In", this);
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = AReduce.instance) {
    return super.clone(factory);
  }
  /**
   * The process method
   */


  async process() {
    await this.evaluateInputs();
    let arr = this.input("Array").value;
    let acc0 = this.input("Acc0").value;
    let acc = acc0;

    if (!Array.isArray(arr)) {// TODO: Manage error
    } else {
      for (let [index, elem] of arr.entries()) {
        // Set the "Index" output
        this.output("Index").value = index; // Set the "Item" output

        this.output("Item").value = elem; // Set the "Acc" output

        this.output("Acc").value = acc; // If there's a node connected to the "Item" next socket...

        if (this.next("Do").peer && this.next("Do").peer.node) {
          // Execute a sub program beginning on that node
          await this.program.processFrom(this.next("Do").peer.node);
        } // Now evaluate the "Acc" input


        await this.input("Acc").evaluate();
        acc = this.input("Acc").value;
      }
    } // Set the "Val" output


    this.output("Val").value = acc;

    if (!this.functional) {
      // Set the "Array" output
      return this.getFlowResult(this.next("Out"));
    }
  }

}

exports.AReduce = AReduce;

_defineProperty(AReduce, "instance", () => new AReduce());
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AMap = undefined;

var _node = require("../../core/node.js");

var _socket = require("../../core/socket.js");

var _type = require("../../core/type.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class implements a cnode that map an array to another
 * by passing all items in sequence
 */
class AMap extends _node.Node {
  // Provide a node instance

  /**
   * Construct a new AMap node
   */
  constructor() {
    super("AMap");
    this.inputs = [new _socket.InputSocket("Array", this, _type.Types.ARRAY), new _socket.InputSocket("Mapped", this, _type.Types.ANY)];
    this.outputs = [new _socket.OutputSocket("Array", this, _type.Types.ARRAY, [], false), new _socket.OutputSocket("Item", this, _type.Types.ANY, "", true), // cached
    new _socket.OutputSocket("Index", this, _type.Types.NUMBER, 0, true) // cached
    ];
    this.nexts = [new _socket.NextSocket("Out", this), new _socket.NextSocket("Do", this)];
    this.prev = new _socket.PrevSocket("In", this);
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = AMap.instance) {
    return super.clone(factory);
  }
  /**
   * The process method
   */


  async process() {
    await this.evaluateInputs();
    let arr = this.input("Array").value;
    let outArr = [];

    if (!Array.isArray(arr)) {// TODO: Manage error
    } else {
      for (let [index, item] of arr.entries()) {
        // Set the "Index" output
        this.output("Index").value = index; // Set the "Item" output

        this.output("Item").value = item; // If there's a node connected to the "Item" next socket...

        if (this.next("Do").peer && this.next("Do").peer.node) {
          // Execute a sub program beginning on that node
          await this.program.processFrom(this.next("Do").peer.node);
        } // Now evaluate the "Mapped" input


        await this.input("Mapped").evaluate();
        outArr.push(this.input("Mapped").value);
      }
    } // Set the "Array" output


    this.output("Array").value = outArr; // Compute result

    if (!this.functional) {
      return this.getFlowResult(this.next("Out"));
    }
  }

}

exports.AMap = AMap;

_defineProperty(AMap, "instance", () => new AMap());
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FAMake = undefined;

var _node = require("../../core/node.js");

var _socket = require("../../core/socket.js");

var _type = require("../../core/type.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class implements a node to get an array
 * from a list of inputs
 */
class FAMake extends _node.Node {
  // Provide a node instance

  /**
   * Construct a new FAMake node
   */
  constructor() {
    super("FAMake");
    this.canAddInput = true;
    this.functional = true;
    this.inputs = [new _socket.InputSocket("0", this, _type.Types.ANY, ""), new _socket.InputSocket("1", this, _type.Types.ANY, "")];
    this.outputs = [new _socket.OutputSocket("Val", this, _type.Types.ARRAY, [], false)];
    this.nexts = [];
    this.prev = null;
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = FAMake.instance) {
    return super.clone(factory);
  }
  /**
   * The process function
   */


  async process() {
    await this.evaluateInputs();
    let arr = [];
    arr.push(...this.inputs.map(i => i.value));
    this.output("Val").value = arr;
  }
  /**
   * Can this node remove a specific input?
   * In this case, there must be at least 1 input
   * @param {InputsSocket} input The input to remove
   */


  canRemoveInput(input) {
    return this.inputs.length > 0;
  }
  /**
   * If this.#canAddInput is true, the user can add an input
   * equal to the (at least one) input that already exists
   */


  addInput() {
    if (this.canAddInput) {
      this.inputs.push(new _socket.InputSocket("", this, _type.Types.ANY, "")); // Rename all inputs to its ordinal number in the inputs array

      for (let [idx, i] of this.inputs.entries()) {
        i.name = "" + idx;
      }
    } else {
      throw new Error("Can't add input!");
    }
  }
  /**
   * This method removes a specific input from the node, if
   * this is possible whit this instance
   * @param {InputSocket} input The input to remove
   */


  removeInput(input) {
    if (this.canRemoveInput(input)) {
      this.inputs = this.inputs.filter(i => i !== input); // Rename all inputs to its ordinal number in the inputs array

      for (let [idx, i] of this.inputs.entries()) {
        i.name = "" + idx;
      }
    } else {
      throw new Error("Can't remove input");
    }
  }

}

exports.FAMake = FAMake;

_defineProperty(FAMake, "instance", () => new FAMake());
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FOBreak = undefined;

var _node = require("../../core/node.js");

var _socket = require("../../core/socket.js");

var _type = require("../../core/type.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class implements a node to break down
 * an object to its fields, or part of them
 */
class FOBreak extends _node.Node {
  // Provide a node instance

  /**
   * Construct a new FOBreak node
   */
  constructor() {
    super("FOBreak");
    this.canAddOutput = true;
    this.functional = true;
    this.inputs = [new _socket.InputSocket("Val", this, _type.Types.OBJECT, {})];
    this.outputs = [new _socket.OutputSocket("field1", this, _type.Types.ANY, "", false), new _socket.OutputSocket("field2", this, _type.Types.ANY, "", false)]; // Sets all output as changeable in terms of name and type

    for (let o of this.outputs) {
      o.canEditName = true;
      o.canEditType = true;
    }

    this.nexts = [];
    this.prev = null;
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = FOBreak.instance) {
    return super.clone(factory);
  }
  /**
   * The process function
   */


  async process() {
    await this.evaluateInputs();

    for (let o of this.outputs) {
      o.value = this.input("Val").value[o.name];
    }
  }
  /**
   * If this.#canAddOutput is true, the user can add an output
   * equal to the (at least one) output that already exists
   * Subclass with variable number of input should override this method
   */


  addOutput(o) {
    if (this.canAddOutput) {
      if (!o) {
        o = new _socket.OutputSocket("", this, _type.Types.ANY, "");
        o.canEditName = true;
        o.canEditType = true;
      }

      this.outputs.push(o);
    } else {
      throw new Error("Can't add output!");
    }
  }
  /**
   * This method removes a specific output from the node
   * @param {OutputSocket} output The output to remove
   */


  removeOutput(output) {
    if (this.canRemoveOutput(output)) {
      this.outputs = this.outputs.filter(o => o !== output);
    } else {
      throw new Error("Can't remove input");
    }
  }
  /**
   * Can this node remove a specific output?
   * There must be at least 1 output
   * @param {OutputSocket} output The output to remove
   */


  canRemoveOutput(output) {
    return this.outputs.length > 1;
  }

}

exports.FOBreak = FOBreak;

_defineProperty(FOBreak, "instance", () => new FOBreak());
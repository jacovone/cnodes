"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FOMake = undefined;

var _node = require("../../core/node.js");

var _socket = require("../../core/socket.js");

var _type = require("../../core/type.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class implements a node to get an object
 * from a list of fields
 */
class FOMake extends _node.Node {
  // Provide a node instance

  /**
   * Construct a new FOMake node
   */
  constructor() {
    super("FOMake");
    this.canAddInput = true;
    this.functional = true;
    this.inputs = [new _socket.InputSocket("field1", this, _type.Types.ANY, ""), new _socket.InputSocket("field2", this, _type.Types.ANY, "")]; // Sets all input as changeable in terms of name

    for (let i of this.inputs) {
      i.canEditName = true;
      i.canEditType = true;
    }

    this.outputs = [new _socket.OutputSocket("Val", this, _type.Types.OBJECT, {}, false)];
    this.nexts = [];
    this.prev = null;
  }
  /**
   * The process function
   */


  async process() {
    await this.evaluateInputs();
    let obj = this.inputs.reduce((acc, val) => {
      return { ...acc,
        [val.name]: val.value
      };
    }, {});
    this.output("Val").value = obj;
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = FOMake.instance) {
    return super.clone(factory);
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
   * the new input must have this.#canEditName === true.
   * in this particular case the name is editable, so let the user
   * to choose and left it blank
   */


  addInput() {
    let is = new _socket.InputSocket("", this, _type.Types.ANY, "");
    is.canEditName = true;
    is.canEditType = true;
    this.inputs.push(is);
  }
  /**
   * This method removes a specific input from the node
   * @param {InputSocket} input The input to remove
   */


  removeInput(input) {
    if (this.canRemoveInput(input)) {
      this.inputs = this.inputs.filter(i => i !== input);
    } else {
      throw new Error("Can't remove input");
    }
  }

}

exports.FOMake = FOMake;

_defineProperty(FOMake, "instance", () => new FOMake());
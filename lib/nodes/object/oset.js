"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FOSet = exports.OSet = undefined;

var _node = require("../../core/node.js");

var _socket = require("../../core/socket.js");

var _type = require("../../core/type.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class implements a node to set a field
 * inside a object structure. If the field doesn't
 * previously exists, create it
 */
class OSet extends _node.Node {
  // Provide a node instance

  /**
   * Construct a new Setvar node
   */
  constructor() {
    super("OSet");
    this.functional = false;
    this.inputs = [new _socket.InputSocket("Object", this, _type.Types.OBJECT, 0), new _socket.InputSocket("Name", this, _type.Types.STRING, 0), new _socket.InputSocket("Val", this, _type.Types.ANY, 0)];
    this.outputs = [new _socket.OutputSocket("Val", this, _type.Types.ANY, "")];
    this.nexts = [new _socket.NextSocket("Out", this)];
    this.prev = new _socket.PrevSocket("In", this);
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = OSet.instance) {
    return super.clone(factory);
  }
  /**
   * The process fmethod
   */


  async process() {
    await this.evaluateInputs();
    let fieldName = this.input("Name").value;
    let fieldVal = this.input("Val").value;
    let object = this.input("Object").value;

    if (object) {
      object[fieldName] = fieldVal;
    }

    this.output("Val").value = fieldVal;
    return this.processReturn();
  }
  /**
   * This method returns the next step in the flow
   */


  processReturn() {
    this.getFlowResult(this.next("Out"));
  }

}

exports.OSet = OSet;
/**
 * This is the functional counterpart of the OSet node
 */

_defineProperty(OSet, "instance", () => new OSet());

class FOSet extends OSet {
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = FOSet.instance) {
    return super.clone(factory);
  }

  constructor() {
    super();
    this.functional = true;
    this.name = "FOSet";
    this.nexts = [];
    this.prev = null;
  }

  processReturn() {
    // The functional node doesn't return anything as
    // next step
    return null;
  }

}

exports.FOSet = FOSet;
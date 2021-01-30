"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FGetvar = undefined;

var _node = require("../core/node.js");

var _socket = require("../core/socket.js");

var _type = require("../core/type.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class implements a functional GetVar node,
 * a node to read a variable's value from the global
 * program's space
 */
class FGetvar extends _node.Node {
  // Provide a node instance

  /**
   * Construct a new FGetvar node
   */
  constructor() {
    super("FGetvar");
    this.functional = true;
    this.inputs = [new _socket.InputSocket("Name", this, _type.Types.STRING, "")];
    this.outputs = [new _socket.OutputSocket("Val", this, _type.Types.ANY, "", false)];
    this.nexts = [];
    this.prev = null;
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = FGetvar.instance) {
    return super.clone(factory);
  }
  /**
   * The process method
   */


  async process() {
    await this.evaluateInputs();
    let varName = this.input("Name").value;
    this.output("Val").value = this.program.vars.get(varName);
  }

}

exports.FGetvar = FGetvar;

_defineProperty(FGetvar, "instance", () => new FGetvar());
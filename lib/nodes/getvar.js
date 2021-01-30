"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Getvar = undefined;

var _node = require("../core/node.js");

var _socket = require("../core/socket.js");

var _type = require("../core/type.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class implements a node to get a variable's value
 * in the program's global space. This node has a functional
 * counterpart naamed FGetvar
 */
class Getvar extends _node.Node {
  // Provide a node instance

  /**
   * Construct a new Getvar node
   */
  constructor() {
    super("Getvar");
    this.inputs = [new _socket.InputSocket("Name", this, _type.Types.STRING, "")];
    this.outputs = [new _socket.OutputSocket("Val", this, _type.Types.ANY, "")];
    this.nexts = [new _socket.NextSocket("Out", this)];
    this.prev = new _socket.PrevSocket("In", this);
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = Getvar.instance) {
    return super.clone(factory);
  }
  /**
   * The process function
   */


  async process() {
    await this.evaluateInputs();
    let varName = this.input("Name").value;
    this.output("Val").value = this.program.vars.get(varName);
    return this.getFlowResult(this.next("Out"));
  }

}

exports.Getvar = Getvar;

_defineProperty(Getvar, "instance", () => new Getvar());
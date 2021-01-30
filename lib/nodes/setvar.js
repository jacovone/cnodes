"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Setvar = undefined;

var _node = require("../core/node.js");

var _socket = require("../core/socket.js");

var _type = require("../core/type.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class implements a node to set a variable
 * value in the program's global space. If the variable
 * don't exists, the processo function will create it
 */
class Setvar extends _node.Node {
  // Provide a node instance

  /**
   * Construct a new Setvar node
   */
  constructor() {
    super("Setvar");
    this.inputs = [new _socket.InputSocket("Name", this, _type.Types.STRING, 0), new _socket.InputSocket("Val", this, _type.Types.ANY, 0)];
    this.outputs = [new _socket.OutputSocket("Val", this, _type.Types.ANY, "")];
    this.nexts = [new _socket.NextSocket("Out", this)];
    this.prev = new _socket.PrevSocket("In", this);
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = Setvar.instance) {
    return super.clone(factory);
  }
  /**
   * The process fmethod
   */


  async process() {
    await this.evaluateInputs();
    let varName = this.input("Name").value;
    let varVal = this.input("Val").value;
    this.program.vars.set(varName, varVal);
    this.output("Val").value = varVal;
    return this.getFlowResult(this.next("Out"));
  }

}

exports.Setvar = Setvar;

_defineProperty(Setvar, "instance", () => new Setvar());
/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

import { Node } from "../core/node.js";
import {
  InputSocket,
  NextSocket,
  PrevSocket,
  OutputSocket,
} from "../core/socket.js";
import { Type, Types } from "../core/type.js";

/**
 * This class implements a node to set a variable
 * value in the program's global space. If the variable
 * don't exists, the processo function will create it
 */
export class Setvar extends Node {
  constructor() {
    super("Setvar");
    this.inputs = [
      new InputSocket("Name", this, new Type(Types.NUMBER, false), 0),
      new InputSocket("Val", this, new Type(Types.NUMBER, false), 0),
    ];
    this.outputs = [new OutputSocket("Val", this, typeof "", "")];
    this.nexts = [new NextSocket("Out", this)];
    this.prev = new PrevSocket("In", this);
  }

  /**
   * The process fmethod
   */
  process() {
    this.evaluateInputs();

    let varName = this.input("Name").value;
    let varVal = this.input("Val").value;
    this.program.vars.set(varName, varVal);
    this.output("Val").value = varVal;

    return this.getFlowResult(this.next("Out"));
  }
}

/**
 * A helper function to create the node
 */
export function setvarNode() {
  return new Setvar();
}

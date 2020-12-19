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
 * This class implements a node to get a variable's value
 * in the program's global space. This node has a functional
 * counterpart naamed FGetvar
 */
export class Getvar extends Node {
  constructor() {
    super("Getvar");
    this.inputs = [
      new InputSocket("Name", this, new Type(Types.STRING, false), ""),
    ];
    this.outputs = [
      new OutputSocket("Val", this, new Type(Types.ANY, false), ""),
    ];
    this.nexts = [new NextSocket("Out", this)];
    this.prev = new PrevSocket("In", this);
  }

  /**
   * The process function
   */
  process() {
    this.evaluateInputs();

    let varName = this.input("Name").value;
    this.output("Val").value = this.program.vars.get(varName);

    return this.getFlowResult(this.next("Out"));
  }
}

/**
 * A helper function to create the node
 */
export function getvarNode() {
  return new Getvar();
}

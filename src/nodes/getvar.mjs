/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020-2021
 */

import { Node } from "../core/node.mjs";
import {
  InputSocket,
  NextSocket,
  PrevSocket,
  OutputSocket,
} from "../core/socket.mjs";
import { Types } from "../core/type.mjs";

/**
 * This class implements a node to get a variable's value
 * in the program's global space. This node has a functional
 * counterpart naamed FGetvar
 */
export class Getvar extends Node {
  // Provide a node instance
  static instance = () => new Getvar();

  /**
   * Construct a new Getvar node
   */
  constructor() {
    super("Getvar");
    this.inputs = [new InputSocket("Name", this, Types.STRING, "")];
    this.outputs = [new OutputSocket("Val", this, Types.ANY, "")];
    this.nexts = [new NextSocket("Out", this)];
    this.prev = new PrevSocket("In", this);
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

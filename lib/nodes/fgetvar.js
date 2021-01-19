/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

import { Node } from "../core/node.js";
import { InputSocket, OutputSocket } from "../core/socket.js";
import { Types } from "../core/type.js";

/**
 * This class implements a functional GetVar node,
 * a node to read a variable's value from the global
 * program's space
 */
export class FGetvar extends Node {
  // Provide a node instance
  static instance = () => new FGetvar();

  constructor() {
    super("FGetvar");
    this.functional = true;
    this.inputs = [new InputSocket("Name", this, Types.STRING, "")];
    this.outputs = [new OutputSocket("Val", this, Types.ANY, "", false)];
    this.nexts = [];
    this.prev = null;
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

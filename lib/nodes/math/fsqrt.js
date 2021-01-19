/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

import { Node } from "../../core/node.js";
import { InputSocket, OutputSocket } from "../../core/socket.js";
import { Types } from "../../core/type.js";

/**
 * This class implements a functional node for Square Root.
 */
export class FSqrt extends Node {
  // Provide a node instance
  static instance = () => new FSqrt();

  constructor() {
    super("FSqrt");

    // The node is pure functional
    this.functional = true;

    // Default to one numeric inputs
    this.inputs = [new InputSocket("Val", this, Types.NUMBER, 0)];

    this.outputs = [new OutputSocket("Val", this, Types.NUMBER, 0, false)];
    this.prev = null;
    this.nexts = [];
  }

  /**
   * The process override
   */
  async process() {
    await this.evaluateInputs();
    this.output("Val").value = Math.sqrt(parseFloat(this.input("Val").value));
  }
}

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
 * This class implements a functional node for divide numeric values.
 */
export class FDiv extends Node {
  // Provide a node instance
  static instance = () => new FDiv();

  constructor() {
    super("FDiv");

    // The node is pure functional
    this.functional = true;

    // Default to two numeric inputs
    this.inputs = [
      new InputSocket("Val1", this, Types.NUMBER, 0),
      new InputSocket("Val2", this, Types.NUMBER, 0),
    ];

    this.outputs = [new OutputSocket("Val", this, Types.NUMBER, 0, false)];
    this.prev = null;
    this.nexts = [];
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = FDiv.instance) {
    return super.clone(factory);
  }

  /**
   * The process override
   */
  async process() {
    await this.evaluateInputs();
    this.output("Val").value =
      parseFloat(this.input("Val1").value) /
      parseFloat(this.input("Val2").value);
  }
}

/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020-2021
 */

import { Node } from "../../core/node.mjs";
import { InputSocket, OutputSocket } from "../../core/socket.mjs";
import { Types } from "../../core/type.mjs";

/**
 * This class implements a functional node FNot compairing boolean values.
 */
export class FNot extends Node {
  // Provide a node instance
  static instance = () => new FNot();

  /**
   * Construct a new FNot node
   */
  constructor() {
    super("FNot");

    // The node is pure functional
    this.functional = true;
    // Default to two numeric inputs
    this.inputs = [new InputSocket("Val", this, Types.BOOLEAN, false)];
    this.outputs = [new OutputSocket("Val", this, Types.BOOLEAN, 0, false)];
    this.prev = null;
    this.nexts = [];
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = FNot.instance) {
    return super.clone(factory);
  }

  /**
   * The process override
   */
  async process() {
    await this.evaluateInputs();
    let val = this.input("Val").value;

    this.output("Val").value = !val;
  }
}

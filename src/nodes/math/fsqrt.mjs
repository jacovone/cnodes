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
 * This class implements a functional node for Square Root.
 */
export class FSqrt extends Node {
  // Provide a node instance
  static instance = () => new FSqrt();

  /**
   * Construct a new FSqrt node
   */
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
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = FSqrt.instance) {
    return super.clone(factory);
  }

  /**
   * The process override
   */
  async process() {
    await this.evaluateInputs();
    this.output("Val").value = Math.sqrt(parseFloat(this.input("Val").value));
  }
}

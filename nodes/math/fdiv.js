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
import { type, Types } from "../../core/type.js";

/**
 * This class implements a functional node for divide numeric values.
 */
export class FDiv extends Node {
  constructor() {
    super("FDiv");

    // The node is pure functional
    this.functional = true;

    // Default to two numeric inputs
    this.inputs = [
      new InputSocket("Val1", this, type(Types.NUMBER, false), 0),
      new InputSocket("Val2", this, type(Types.NUMBER, false), 0),
    ];

    this.outputs = [
      new OutputSocket("Val", this, type(Types.NUMBER, false), 0),
    ];
    this.prev = null;
    this.nexts = [];
  }

  /**
   * The process override
   */
  process() {
    this.evaluateInputs();
    this.output("Val").value =
      this.input("Val1").value / this.input("Val2").value;
  }
}

/**
 * Helper fuction to create the node
 */
export function fdivNode() {
  return new FDiv();
}

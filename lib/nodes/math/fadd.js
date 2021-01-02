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
 * This class implements a functional node for adding numeric values.
 * Supports a indefinite number of value inputs and one single output
 */
export class FAdd extends Node {
  constructor() {
    super("FAdd");
    // The node is pure functional
    this.functional = true;

    // This node has a variable number of inputs
    this.canAddInput = true;

    // Default to two numeric inputs
    this.inputs = [
      new InputSocket("0", this, Types.NUMBER, 0),
      new InputSocket("1", this, Types.NUMBER, 0),
    ];
    this.outputs = [new OutputSocket("Val", this, Types.NUMBER, 0)];
    this.prev = null;
    this.nexts = [];
  }

  /**
   * The process override
   */
  process() {
    let sum = 0;
    this.evaluateInputs();
    for (let inp of this.inputs) {
      sum += parseFloat(inp.value);
    }
    this.output("Val").value = sum;
  }

  /**
   * Can this node remove a specific input?
   * In this case, there must be at least 2 inputs
   * @param {InputsSocket} input The input to remove
   */
  canRemoveInput(input) {
    return this.inputs.length > 2;
  }
}

/**
 * Helper fuction to create the node
 */
export function faddNode() {
  return new FAdd();
}

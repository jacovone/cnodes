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
 * This class implements a functional node for adding numeric values.
 * Supports a indefinite number of value inputs and one single output
 */
export class FAdd extends Node {
  constructor() {
    super("FAdd");
    // The node is pure functional
    this.functional = true;
    // Default to two numeric inputs
    this.inputs = [
      new InputSocket("Val1", this, type(Types.NUMBER, false), 0),
      new InputSocket("Val2", this, type(Types.NUMBER, false), 0),
    ];
    this.outputs = [new OutputSocket("Val", this, type(Types.NUMBER, false), 0)];
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
      sum += inp.value;
    }
    this.output('Val').value = sum;
  }
}

/**
 * Helper fuction to create the node
 */
export function faddNode() {
    return new FAdd();
}

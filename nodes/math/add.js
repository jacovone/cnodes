/**
 * cnodes
 * 
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

import { Node } from "../../core/node.js";
import { InputValueSocket, OutputValueSocket } from "../../core/socket.js";
import { type, TypeEnum } from "../../core/type.js";

/**
 * This class implements a functional node for adding numeric values.
 * Supports a indefinite number of value inputs and one single output
 */
export class Add extends Node {
  constructor() {
    super("Add");
    // The node is pure functional
    this.functional = true;
    // Default to two numeric inputs
    this.inputs = [
      new InputValueSocket("Val1", this, type(TypeEnum.NUMBER, false), 0),
      new InputValueSocket("Val2", this, type(TypeEnum.NUMBER, false), 0),
    ];
    this.outputs = [new OutputValueSocket("Val", this, type(TypeEnum.NUMBER, false), 0)];
    this.prevs = [];
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
    this.outputs[0].value = sum;
  }
}

/**
 * Helper fuction to create the node
 */
export function addNode() {
    return new Add();
}

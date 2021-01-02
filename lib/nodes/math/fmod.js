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
 * This class implements a functional node for modulus (%)
 */
export class FMod extends Node {
  constructor() {
    super("FMod");

    // The node is pure functional
    this.functional = true;

    // Default to two numeric inputs
    this.inputs = [
      new InputSocket("Val1", this, Types.NUMBER, 0),
      new InputSocket("Val2", this, Types.NUMBER, 0),
    ];

    this.outputs = [new OutputSocket("Val", this, Types.NUMBER, 0)];
    this.prev = null;
    this.nexts = [];
  }

  /**
   * The process override
   */
  process() {
    this.evaluateInputs();
    this.output("Val").value =
      parseFloat(this.input("Val1").value) %
      parseFloat(this.input("Val2").value);
  }
}

/**
 * Helper fuction to create the node
 */
export function fmodNode() {
  return new FMod();
}

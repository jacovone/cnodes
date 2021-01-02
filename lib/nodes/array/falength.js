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
 * This class implements a functional node for get
 * the length of an array
 */
export class FALength extends Node {
  constructor() {
    super("FALength");

    // The node is pure functional
    this.functional = true;

    // Default to two numeric inputs
    this.inputs = [new InputSocket("Array", this, Types.ARRAY, 0)];
    this.outputs = [new OutputSocket("Val", this, Types.NUMBER, 0)];
    this.prev = null;
    this.nexts = [];
  }

  /**
   * The process override
   */
  process() {
    this.evaluateInputs();
    let arr = this.input("Array").value;

    if (!Array.isArray(arr)) {
      // TODO: Manage error
    } else {
      this.output("Val").value = arr.length;
    }
  }
}

/**
 * Helper fuction to create the node
 */
export function falengthNode() {
  return new FALength();
}

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
 * This class implements a functional node for pick
 * a single value from an array
 */
export class FAGet extends Node {
  // Provide a node instance
  static instance = () => new FAGet();

  /**
   * Construct a new FAGet node
   */
  constructor() {
    super("FAGet");

    // The node is pure functional
    this.functional = true;
    // Default to two numeric inputs
    this.inputs = [
      new InputSocket("Array", this, Types.ARRAY, 0),
      new InputSocket("Index", this, Types.NUMBER, 0),
    ];
    this.outputs = [new OutputSocket("Val", this, Types.ANY, 0, false)];
    this.prev = null;
    this.nexts = [];
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = FAGet.instance) {
    return super.clone(factory);
  }

  /**
   * The process override
   */
  async process() {
    await this.evaluateInputs();
    let arr = this.input("Array").value;
    let index = parseInt(this.input("Index").value, 10);

    if (!Array.isArray(arr)) {
      // TODO: Manage error
    } else {
      this.output("Val").value = arr[index];
    }
  }
}

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
 * This class implements a functional node for compairing boolean values.
 */
export class FOr extends Node {
  // Provide a node instance
  static instance = () => new FOr();

  /**
   * Construct a new FOr node
   */
  constructor() {
    super("FOr");

    // The node is pure functional
    this.functional = true;
    // Default to two numeric inputs
    this.inputs = [
      new InputSocket("Val1", this, Types.BOOLEAN, false),
      new InputSocket("Val2", this, Types.BOOLEAN, false),
    ];
    this.outputs = [new OutputSocket("Val", this, Types.BOOLEAN, 0, false)];
    this.prev = null;
    this.nexts = [];
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = FOr.instance) {
    return super.clone(factory);
  }

  /**
   * The process override
   */
  async process() {
    await this.evaluateInputs();
    let val1 = this.input("Val1").value;
    let val2 = this.input("Val2").value;

    this.output("Val").value = val1 || val2;
  }
}

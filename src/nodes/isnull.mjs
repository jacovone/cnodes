/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020-2021
 */

import { Node } from "../core/node.mjs";
import { InputSocket, OutputSocket } from "../core/socket.mjs";
import { Types } from "../core/type.mjs";

/**
 * This class implements a functional conditional node
 */
export class FIsNull extends Node {
  // Provide a node instance
  static instance = () => new FIsNull();

  /**
   * Construct a new FIf node
   */
  constructor() {
    super("FIsNull");

    // The node is pure functional
    this.functional = true;

    // One single input for any value
    this.inputs = [new InputSocket("Val", this, Types.ANY, {})];

    // The output value indicates if the input value is null
    this.outputs = [new OutputSocket("Val", this, Types.BOOLEAN, false)];
    this.prev = null;
    this.nexts = [];
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = FIsNull.instance) {
    return super.clone(factory);
  }

  /**
   * The process override
   */
  async process() {
    await this.evaluateInputs();
    this.output("Val").value = this.input("Val").value === null;
  }
}

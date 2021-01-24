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
 * This class implements a node to get return a simple
 * number constant. This is a functional node.
 */
export class FNConst extends Node {
  // Provide a node instance
  static instance = () => new FNConst();

  constructor() {
    super("FNConst");
    this.functional = true;
    this.inputs = [new InputSocket("Val", this, Types.ANY, 0)];
    this.outputs = [new OutputSocket("Val", this, Types.NUMBER, 0, false)];
    this.nexts = [];
    this.prev = null;
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = FNConst.instance) {
    return super.clone(factory);
  }

  /**
   * The process function
   */
  async process() {
    await this.evaluateInputs();

    // Convert the constant/input value to a string
    this.output("Val").value = parseFloat(this.input("Val").value);
  }
}

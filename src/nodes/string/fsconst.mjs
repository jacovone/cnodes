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
 * This class implements a node to get return a simple
 * string constant. This is a functional node.
 */
export class FSConst extends Node {
  // Provide a node instance
  static instance = () => new FSConst();

  /**
   * Construct a new FSConst node
   */
  constructor() {
    super("FSConst");
    this.functional = true;
    this.inputs = [new InputSocket("Val", this, Types.ANY, "")];
    this.outputs = [new OutputSocket("Val", this, Types.STRING, "", false)];
    this.nexts = [];
    this.prev = null;
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = FSConst.instance) {
    return super.clone(factory);
  }

  /**
   * The process function
   */
  async process() {
    await this.evaluateInputs();

    // Convert the constant/input value to a string
    this.output("Val").value = this.input("Val").value.toString();
  }
}

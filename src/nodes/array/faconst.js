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
 * This class implements a node to get an array
 * as a string constant by JSON.parse() the input string.
 */
export class FAConst extends Node {
  // Provide a node instance
  static instance = () => new FAConst();

  /**
   * Construct a new FAConst node
   */
  constructor() {
    super("FAConst");
    this.functional = true;
    this.inputs = [new InputSocket("Val", this, Types.STRING, "[0, 1, 2]")];
    this.outputs = [new OutputSocket("Val", this, Types.ARRAY, [], false)];
    this.nexts = [];
    this.prev = null;
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = FAConst.instance) {
    return super.clone(factory);
  }

  /**
   * The process function
   */
  async process() {
    await this.evaluateInputs();

    // Convert the constant/input value to an array
    try {
      this.output("Val").value = JSON.parse(this.input("Val").value);
      if (!Array.isArray(this.output("Val").value)) {
        throw new Error(
          `The input value (${this.output("Val").value}) is not an array`
        );
      }
    } catch (error) {
      // TODO: Manage error
      console.log(error);
    }
  }
}

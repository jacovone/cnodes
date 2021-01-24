/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

import { Node, Result } from "./node.js";
import { PrevSocket, InputSocket, OutputSocket } from "./socket.js";
import { Types } from "./type.js";

/**
 * This class implements a cnode that is the starting point for a
 * program. The program can be top-level or not
 */
export class Exit extends Node {
  // Provide a node instance
  static instance = () => new Exit();

  constructor() {
    super("Exit");
    this.removable = false;
    this.creatable = false;
    this.inputs = [new InputSocket("Val", this, Types.ANY, 0)];
    this.outputs = [];
    this.nexts = [];
    this.prev = new PrevSocket("End", this);
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = Exit.instance) {
    return super.clone(factory);
  }

  /**
   * The process method
   */
  async process() {
    await this.evaluateInputs();
    return new Result(); // End process
  }
}

/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

import { Node } from "../core/node.js";
import { NextSocket, PrevSocket } from "../core/socket.js";

/**
 * This class implements a subroutine/function call
 */
export class Call extends Node {
  // Provide a node instance
  static instance = () => new Call();

  constructor() {
    super("Call");
    this.inputs = [];
    this.outputs = [];
    this.nexts = [new NextSocket("Out", this), new NextSocket("Call", this)];
    this.prev = new PrevSocket("In", this);
  }

  /**
   * The process function
   */
  async process() {
    // Save the current program's node
    let prevCurrentNode = this.program.currentNode;

    // Execute a sub program beginning on that node
    await this.program.processFrom(this.next("Call").peer.node);

    // Restore the current program's node
    this.program.currentNode = prevCurrentNode;

    return this.getFlowResult(this.next("Out"));
  }
}

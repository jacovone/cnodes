/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

import { Node } from "../core/node.js";
import {
  InputSocket,
  NextSocket,
  OutputSocket,
  PrevSocket,
} from "../core/socket.js";
import { Type, Types } from "../core/type.js";

/**
 * This class implements a subroutine/function call
 */
export class Call extends Node {
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
  process() {
    // Save the current program's node
    let prevCurrentNode = this.program.currentNode;

    // Execute a sub program beginning on that node
    this.program.processFrom(this.next("Call").peer.node);

    // Restore the current program's node
    this.program.currentNode = prevCurrentNode;

    return this.getFlowResult(this.next("Out"));
  }
}

/**
 * A helper function to create the node
 */
export function callNode() {
  return new Call();
}

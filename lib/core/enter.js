/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

import { Node } from "./node.js";
import { NextSocket, OutputSocket, InputSocket } from "./socket.js";
import { Types } from "./type.js";

/**
 * This class implements a cnode that is the starting point for a
 * program. The program can be top-level or not
 */
export class Enter extends Node {
  constructor() {
    super("Enter");
    this.removable = false;
    this.creatable = false;
    this.inputs = [];
    this.outputs = [new OutputSocket("Val", this, Types.ANY, 0)];
    this.nexts = [new NextSocket("Begin", this)];
    this.prev = null;
  }

  /**
   * The process method
   */
  process() {
    return this.getFlowResult(this.next("Begin"));
  }
}

/**
 * Helper fuction to create the node
 */
export function enterNode() {
  return new Enter();
}

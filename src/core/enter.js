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
import { type, Types } from "./type.js";

/**
 * This class implements a cnode that is the starting point for a
 * program. The program can be top-level or not
 */
export class Enter extends Node {
  constructor() {
    super("Enter");
    this.inputs = [new InputSocket("Val", this, type(Types.ANY, false), 0)];
    this.outputs = [new OutputSocket("Val", this, type(Types.ANY, false), 0)];
    this.nexts = [new NextSocket("Begin", this)];
    this.prev = null;
  }

  /**
   * The process method
   */
  process() {
    this.evaluateInputs();
    this.output("Val").value = this.input("Val").value;
    this.output("Val").type = this.input("Val").type;
    return this.getFlowResult(this.next("Begin"));
  }
}

/**
 * Helper fuction to create the node
 */
export function enterNode() {
  return new Enter();
}

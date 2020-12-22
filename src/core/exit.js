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
import { type, Types } from "./type.js";

/**
 * This class implements a cnode that is the starting point for a
 * program. The program can be top-level or not
 */
export class Exit extends Node {
  constructor() {
    super("Exit");
    this.inputs = [new InputSocket("Val", this, type(Types.ANY, false), 0)];
    this.outputs = [new OutputSocket("Val", this, type(Types.ANY, false), 0)];
    this.nexts = [];
    this.prev = new PrevSocket("End", this);
  }

  /**
   * The process method
   */
  process() {
    this.evaluateInputs();
    this.output("Val").value = this.input("Val").value;
    this.output("Val").type = this.input("Val").type;
    return new Result(); // End process
  }
}

/**
 * Helper fuction to create the node
 */
export function exitNode() {
  return new Exit();
}

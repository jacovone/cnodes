/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

import { Node, Result } from "../core/node.js";
import { InputSocket, NextSocket, PrevSocket } from "../core/socket.js";
import { type, Types } from "../core/type.js";

/**
 * This class implements a cnode that print to the
 * console the input value
 */
export class Console extends Node {
  constructor() {
    super("Console");
    this.inputs = [new InputSocket("Val", this, type(Types.ANY, false), 0)];
    this.outputs = [];
    this.nexts = [new NextSocket("Out", this)];
    this.prev = new PrevSocket("In", this);
  }

  /**
   * The process method
   */
  process() {
    this.evaluateInputs();
    console.log(this.input("Val").value);

    let res = new Result();
    return this.getFlowResult(this.next("Out"));
  }
}

/**
 * Helper function to create the node
 */
export function consoleNode() {
  return new Console();
}

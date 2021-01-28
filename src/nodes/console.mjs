/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020-2021
 */

import { Node } from "../core/node.mjs";
import { InputSocket, NextSocket, PrevSocket } from "../core/socket.mjs";
import { Types } from "../core/type.mjs";

/**
 * This class implements a cnode that print to the
 * console the input value
 */
export class Console extends Node {
  // Provide a node instance
  static instance = () => new Console();

  /**
   * Construct a new Console node
   */
  constructor() {
    super("Console");
    this.inputs = [new InputSocket("Val", this, Types.ANY)];
    this.outputs = [];
    this.nexts = [new NextSocket("Out", this)];
    this.prev = new PrevSocket("In", this);
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = Console.instance) {
    return super.clone(factory);
  }

  /**
   * The process method
   */
  async process() {
    await this.evaluateInputs();
    console.log(this.input("Val").value);
    return this.getFlowResult(this.next("Out"));
  }
}

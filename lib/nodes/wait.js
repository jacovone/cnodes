/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

import { Node } from "../core/node.js";
import { InputSocket, NextSocket, PrevSocket } from "../core/socket.js";
import { Types } from "../core/type.js";

/**
 * This class implements a cnode that waits for a specified
 * number of seconds
 */
export class Wait extends Node {
  /** Return an instance of this node */
  static instance = () => new Wait();

  constructor() {
    super("Wait");
    this.inputs = [new InputSocket("Secs", this, Types.NUMBER)];
    this.outputs = [];
    this.nexts = [new NextSocket("Out", this)];
    this.prev = new PrevSocket("In", this);
  }

  /**
   * The process method
   */
  async process() {
    await this.evaluateInputs();

    await new Promise((res) => {
      setTimeout(() => {
        res();
      }, parseFloat(this.input("Secs").value) * 1000);
    });

    return this.getFlowResult(this.next("Out"));
  }
}

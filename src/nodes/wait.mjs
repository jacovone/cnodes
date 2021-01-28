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
 * This class implements a cnode that waits for a specified
 * number of seconds
 */
export class Wait extends Node {
  /** Return an instance of this node */
  static instance = () => new Wait();

  /**
   * Construct a new Wait node
   */
  constructor() {
    super("Wait");
    this.inputs = [new InputSocket("Secs", this, Types.NUMBER)];
    this.outputs = [];
    this.nexts = [new NextSocket("Out", this)];
    this.prev = new PrevSocket("In", this);
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = Wait.instance) {
    return super.clone(factory);
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

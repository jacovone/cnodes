/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020-2021
 */

import { Node } from "../core/node.mjs";
import {
  InputSocket,
  NextSocket as NextSocket,
  PrevSocket,
} from "../core/socket.mjs";
import { Types } from "../core/type.mjs";

/**
 * This class implements a node that is able to
 * redirect the flow of execution based on the
 * "condition" input value
 */
export class If extends Node {
  // Provide a node instance
  static instance = () => new If();

  /**
   * Construct a new If node
   */
  constructor() {
    super("If");
    this.inputs = [new InputSocket("Condition", this, Types.BOOLEAN, false)];
    this.outputs = [];
    this.nexts = [new NextSocket("Then", this), new NextSocket("Else", this)];
    this.prev = new PrevSocket("In", this);
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = If.instance) {
    return super.clone(factory);
  }

  /**
   * The process function
   */
  async process() {
    await this.evaluateInputs();
    let flow = null;
    if (this.input("Condition").value) {
      flow = this.next("Then");
    } else {
      flow = this.next("Else");
    }

    return this.getFlowResult(flow);
  }
}

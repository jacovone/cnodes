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
  NextSocket as NextSocket,
  PrevSocket,
} from "../core/socket.js";
import { Types } from "../core/type.js";

/**
 * This class implements a node that is able to
 * redirect the flow of execution based on the
 * "condition" input value
 */
export class If extends Node {
  constructor() {
    super("If");
    this.inputs = [new InputSocket("Condition", this, Types.BOOLEAN, false)];
    this.outputs = [];
    this.nexts = [new NextSocket("Then", this), new NextSocket("Else", this)];
    this.prev = new PrevSocket("In", this);
  }

  /**
   * The process function
   */
  process() {
    this.evaluateInputs();
    let flow = null;
    if (this.input("Condition").value) {
      flow = this.next("Then");
    } else {
      flow = this.next("Else");
    }

    return this.getFlowResult(flow);
  }
}

/**
 * A helper function to create the node
 */
export function ifNode() {
  return new If();
}

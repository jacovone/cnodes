/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

import { Node } from "../../core/node.js";
import {
  InputSocket,
  NextSocket,
  PrevSocket,
  OutputSocket,
} from "../../core/socket.js";
import { Types } from "../../core/type.js";

/**
 * This class implements a cnode that pushes a value
 * into an array
 */
export class APush extends Node {
  // Provide a node instance
  static instance = () => new APush();

  constructor() {
    super("APush");
    this.inputs = [
      new InputSocket("Array", this, Types.ARRAY),
      new InputSocket("Val", this, Types.ANY),
    ];
    this.outputs = [new OutputSocket("Val", this, Types.ANY)];
    this.nexts = [new NextSocket("Out", this)];
    this.prev = new PrevSocket("In", this);
  }

  /**
   * The process method
   */
  async process() {
    await this.evaluateInputs();
    let arr = this.input("Array").value;
    let val = this.input("Val").value;

    if (!Array.isArray(arr)) {
      // TODO: Manage error
    } else {
      arr.push(val);
      this.output("Val").value = arr;
    }

    return this.getFlowResult(this.next("Out"));
  }
}

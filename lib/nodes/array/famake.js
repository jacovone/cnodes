/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

import { Node } from "../../core/node.js";
import { InputSocket, OutputSocket } from "../../core/socket.js";
import { Types } from "../../core/type.js";

/**
 * This class implements a node to get an array
 * from a list of inputs
 */
export class FAMake extends Node {
  constructor() {
    super("FAMake");
    this.canAddInput = true;
    this.functional = true;
    this.inputs = [
      new InputSocket("0", this, Types.ANY, ""),
      new InputSocket("1", this, Types.ANY, ""),
    ];
    this.outputs = [new OutputSocket("Val", this, Types.ARRAY, [])];
    this.nexts = [];
    this.prev = null;
  }

  /**
   * The process function
   */
  process() {
    this.evaluateInputs();
    let arr = [];

    arr.push(...this.inputs.map((i) => i.value));
    this.output("Val").value = arr;
  }

  /**
   * Can this node remove a specific input?
   * In this case, there must be at least 1 input
   * @param {InputsSocket} input The input to remove
   */
  canRemoveInput(input) {
    return this.inputs.length > 0;
  }
}

/**
 * A helper function to create the node
 */
export function famakeNode() {
  return new FAMake();
}

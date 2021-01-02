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
 * This class implements a node that conctas two strings.
 * If other type are passed, these are converted to strings
 */
export class FConcat extends Node {
  constructor() {
    super("FConcat");
    this.functional = true;
    this.canAddInput = true;
    this.inputs = [
      new InputSocket("0", this, Types.STRING, ""),
      new InputSocket("1", this, Types.STRING, ""),
    ];
    this.outputs = [new OutputSocket("Val", this, Types.ANY, "")];
    this.nexts = [];
    this.prev = null;
  }

  /**
   * The process function
   */
  process() {
    this.evaluateInputs();

    let res = "";
    for (let i of this.inputs) {
      res += i.value.toString();
    }

    // Convert the constant/input value to a string
    this.output("Val").value = res;
  }

  /**
   * Can this node remove a specific input?
   * In this case, there must be at least 2 inputs
   * @param {InputsSocket} input The input to remove
   */
  canRemoveInput(input) {
    return this.inputs.length > 2;
  }
}

/**
 * A helper function to create the node
 */
export function fconcatNode() {
  return new FConcat();
}

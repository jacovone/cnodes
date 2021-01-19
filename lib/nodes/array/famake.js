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
  // Provide a node instance
  static instance = () => new FAMake();

  constructor() {
    super("FAMake");
    this.canAddInput = true;
    this.functional = true;
    this.inputs = [
      new InputSocket("0", this, Types.ANY, ""),
      new InputSocket("1", this, Types.ANY, ""),
    ];
    this.outputs = [new OutputSocket("Val", this, Types.ARRAY, [], false)];
    this.nexts = [];
    this.prev = null;
  }

  /**
   * The process function
   */
  async process() {
    await this.evaluateInputs();
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

  /**
   * If this.#canAddInput is true, the user can add an input
   * equal to the (at least one) input that already exists
   */
  addInput() {
    if (this.canAddInput) {
      this.inputs.push(new InputSocket("", this, Types.ANY, ""));

      // Rename all inputs to its ordinal number in the inputs array
      for (let [idx, i] of this.inputs.entries()) {
        i.name = "" + idx;
      }
    } else {
      throw new Error("Can't add input!");
    }
  }

  /**
   * This method removes a specific input from the node, if
   * this is possible whit this instance
   * @param {InputSocket} input The input to remove
   */
  removeInput(input) {
    if (this.canRemoveInput(input)) {
      this.inputs = this.inputs.filter((i) => i !== input);

      // Rename all inputs to its ordinal number in the inputs array
      for (let [idx, i] of this.inputs.entries()) {
        i.name = "" + idx;
      }
    } else {
      throw new Error("Can't remove input");
    }
  }
}

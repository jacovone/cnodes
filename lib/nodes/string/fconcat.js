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
  // Provide a node instance
  static instance = () => new FConcat();

  constructor() {
    super("FConcat");
    this.functional = true;
    this.canAddInput = true;
    this.inputs = [
      new InputSocket("0", this, Types.STRING, ""),
      new InputSocket("1", this, Types.STRING, ""),
    ];
    this.outputs = [new OutputSocket("Val", this, Types.STRING, "", false)];
    this.nexts = [];
    this.prev = null;
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = FConcat.instance) {
    return super.clone(factory);
  }

  /**
   * The process function
   */
  async process() {
    await this.evaluateInputs();

    let res = "";
    for (let i of this.inputs) {
      res += i.value.toString();
    }

    // Convert the constant/input value to a string
    this.output("Val").value = res;
  }

  /**
   * If this.#canAddInput is true, the user can add an input
   * equal to the (at least one) input that already exists
   */
  addInput() {
    if (this.canAddInput) {
      this.inputs.push(new InputSocket("", this, Types.STRING, ""));

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

  /**
   * Can this node remove a specific input?
   * In this case, there must be at least 2 inputs
   * @param {InputsSocket} input The input to remove
   */
  canRemoveInput(input) {
    return this.inputs.length > 2;
  }
}

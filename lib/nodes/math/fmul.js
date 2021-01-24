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
 * This class implements a functional node for multiply numeric values.
 * Supports a indefinite number of value inputs and one single output
 */
export class FMul extends Node {
  // Provide a node instance
  static instance = () => new FMul();

  constructor() {
    super("FMul");
    // The node is pure functional
    this.functional = true;

    // This node has a variable number of inputs
    this.canAddInput = true;

    // Default to two numeric inputs
    this.inputs = [
      new InputSocket("0", this, Types.NUMBER, 0),
      new InputSocket("1", this, Types.NUMBER, 0),
    ];
    this.outputs = [new OutputSocket("Val", this, Types.NUMBER, 0, false)];
    this.prev = null;
    this.nexts = [];
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = FMul.instance) {
    return super.clone(factory);
  }

  /**
   * The process override
   */
  async process() {
    let mul = 1;
    await this.evaluateInputs();
    for (let inp of this.inputs) {
      mul *= parseFloat(inp.value);
    }
    this.output("Val").value = mul;
  }

  /**
   * If this.#canAddInput is true, the user can add an input
   * equal to the (at least one) input that already exists
   */
  addInput() {
    if (this.canAddInput) {
      this.inputs.push(new InputSocket("", this, Types.NUMBER, ""));

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

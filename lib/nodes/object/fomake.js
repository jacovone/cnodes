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
 * This class implements a node to get an object
 * from a list of fields
 */
export class FOMake extends Node {
  constructor() {
    super("FOMake");
    this.canAddInput = true;
    this.functional = true;
    this.inputs = [
      new InputSocket("field1", this, Types.ANY, ""),
      new InputSocket("field2", this, Types.ANY, ""),
    ];

    // Sets all input as changeable in terms of name
    for (let i of this.inputs) {
      i.canEditName = true;
    }

    this.outputs = [new OutputSocket("Val", this, Types.OBJECT, {})];
    this.nexts = [];
    this.prev = null;
  }

  /**
   * The process function
   */
  process() {
    this.evaluateInputs();
    let obj = this.inputs.reduce((acc, val) => {
      return { ...acc, [val.name]: val.value };
    }, {});

    this.output("Val").value = obj;
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
   * the new input must have this.#canEditName === true.
   * in this particular case the name is editable, so let the user
   * to choose and left it blank
   */
  addInput() {
    let is = new InputSocket("", this, Types.ANY, "");
    is.canEditName = true;
    this.inputs.push(is);
  }

  /**
   * This method removes a specific input from the node
   * @param {InputSocket} input The input to remove
   */
  removeInput(input) {
    if (this.canRemoveInput(input)) {
      this.inputs = this.inputs.filter((i) => i !== input);
    } else {
      throw new Error("Can't remove input");
    }
  }
}

/**
 * A helper function to create the node
 */
export function fomakeNode() {
  return new FOMake();
}

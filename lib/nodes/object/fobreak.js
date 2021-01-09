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
 * This class implements a node to break down
 * an object to its fields, or part of them
 */
export class FOBreak extends Node {
  constructor() {
    super("FOBreak");
    this.canAddOutput = true;
    this.functional = true;
    this.inputs = [new InputSocket("Val", this, Types.OBJECT, {})];

    this.outputs = [
      new OutputSocket("field1", this, Types.ANY, "", false),
      new OutputSocket("field2", this, Types.ANY, "", false),
    ];

    // Sets all output as changeable in terms of name
    for (let o of this.outputs) {
      o.canEditName = true;
      o.canEditType = true;
    }

    this.nexts = [];
    this.prev = null;
  }

  /**
   * The process function
   */
  process() {
    this.evaluateInputs();

    for (let o of this.outputs) {
      o.value = this.input("Val").value[o.name];
    }
  }

  /**
   * If this.#canAddOutput is true, the user can add an output
   * equal to the (at least one) output that already exists
   * Subclass with variable number of input should override this method
   */
  addOutput() {
    if (this.canAddOutput) {
      let o = new OutputSocket("", this, Types.ANY, "");
      o.canEditName = true;
      o.canEditType = true;
      this.outputs.push(o);
    } else {
      throw new Error("Can't add output!");
    }
  }

  /**
   * This method removes a specific output from the node
   * @param {OutputSocket} output The output to remove
   */
  removeOutput(output) {
    if (this.canRemoveOutput(output)) {
      this.outputs = this.outputs.filter((o) => o !== output);
    } else {
      throw new Error("Can't remove input");
    }
  }

  /**
   * Can this node remove a specific output?
   * There must be at least 1 output
   * @param {OutputSocket} output The output to remove
   */
  canRemoveOutput(output) {
    return this.outputs.length > 1;
  }
}

/**
 * A helper function to create the node
 */
export function fobreakNode() {
  return new FOBreak();
}

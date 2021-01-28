/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020-2021
 */

import { Node } from "../../core/node.mjs";
import { InputSocket, OutputSocket } from "../../core/socket.mjs";
import { Types } from "../../core/type.mjs";

/**
 * This class implements a functional node for ToFixed()
 * javascript number method.
 */
export class FTofixed extends Node {
  // Provide a node instance
  static instance = () => new FTofixed();

  /**
   * Construct a new FTofixed node
   */
  constructor() {
    super("FTofixed");

    // The node is pure functional
    this.functional = true;

    // Two numeric inputs
    this.inputs = [
      new InputSocket("Val", this, Types.NUMBER, 0),
      new InputSocket("Digits", this, Types.NUMBER, 0),
    ];

    this.outputs = [new OutputSocket("Val", this, Types.NUMBER, 0, false)];
    this.prev = null;
    this.nexts = [];
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = FTofixed.instance) {
    return super.clone(factory);
  }

  /**
   * The process override
   */
  async process() {
    await this.evaluateInputs();
    this.output("Val").value = parseFloat(this.input("Val").value).toFixed(
      this.input("Digits").value
    );
  }
}

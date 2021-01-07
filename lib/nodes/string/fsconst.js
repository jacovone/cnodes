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
 * This class implements a node to get return a simple
 * string constant. This is a functional node.
 */
export class FSConst extends Node {
  constructor() {
    super("FSConst");
    this.functional = true;
    this.inputs = [new InputSocket("Val", this, Types.ANY, "")];
    this.outputs = [new OutputSocket("Val", this, Types.STRING, "", false)];
    this.nexts = [];
    this.prev = null;
  }

  /**
   * The process function
   */
  process() {
    this.evaluateInputs();

    // Convert the constant/input value to a string
    this.output("Val").value = this.input("Val").value.toString();
  }
}

/**
 * A helper function to create the node
 */
export function fsconstNode() {
  return new FSConst();
}

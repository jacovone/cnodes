/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

import { Node } from "../core/node.js";
import {
  InputSocket,
  NextSocket,
  OutputSocket,
  PrevSocket,
} from "../core/socket.js";
import { Type, Types } from "../core/type.js";

/**
 * This class implements a node that is able to
 * iterate until a condition become false, like
 * while(condition) do();
 */
export class While extends Node {
  constructor() {
    super("While");
    this.inputs = [
      new InputSocket("Condition", this, new Type(Types.BOOLEAN, false), false),
    ];
    this.outputs = [
      new OutputSocket("Index", this, new Type(Types.NUMBER, false), false),
    ];
    this.nexts = [new NextSocket("Out", this), new NextSocket("Do", this)];
    this.prev = new PrevSocket("In", this);
  }

  /**
   * The process function
   */
  process() {
    this.evaluateInputs();

    // Save the current program's node
    let prevCurrentNode = this.program.currentNode;
    // A bouns index variable ;-)
    let index = 0;

    // Let's cycle while condition is true
    while (this.input("Condition").value) {
      // If there's a node connected to the "Do" next socket...
      if (this.next("Do").peer !== null && this.next("Do").peer.node !== null) {
        // Set the "Index" output value to Index
        this.output("Index").value = index;

        // Execute a sub program beginning on that node
        this.program.processFrom(this.next("Do").peer.node);

        // Re-compute the guard...
        this.evaluateInputs();
      }
    }

    // Restore the currentprogram's node
    this.program.currentNode = prevCurrentNode;

    return this.getFlowResult(this.next("Out"));
  }
}

/**
 * A helper function to create the node
 */
export function whileNode() {
  return new While();
}

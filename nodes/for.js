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
 * iterate over a range of integers, like the form
 * for(let i=start; i<end; i++) do();
 */
export class For extends Node {
  constructor() {
    super("For");
    this.inputs = [
      new InputSocket("From", this, new Type(Types.NUMBER, false), false),
      new InputSocket("To", this, new Type(Types.NUMBER, false), false),
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

    // Let's cycle from "From" to "To" values
    for (
      let index = this.input("From").value;
      index < this.input("To").value;
      index++
    ) {
      // If there's a node connected to the "Do" next socket...
      if (this.next("Do").peer !== null && this.next("Do").peer.node !== null) {
        // Set the "Index" output value to Index
        this.output("Index").value = index;

        // Execute a sub program beginning on that node
        this.program.processFrom(this.next("Do").peer.node);
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
export function forNode() {
  return new For();
}

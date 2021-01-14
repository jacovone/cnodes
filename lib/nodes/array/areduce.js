/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

import { Node } from "../../core/node.js";
import {
  InputSocket,
  NextSocket,
  PrevSocket,
  OutputSocket,
} from "../../core/socket.js";
import { Types } from "../../core/type.js";

/**
 * This class implements a cnode that reduces an array to
 * a value
 */
export class AReduce extends Node {
  constructor() {
    super("AReduce");
    this.inputs = [
      new InputSocket("Array", this, Types.ARRAY),
      new InputSocket("Acc0", this, Types.ANY),
      new InputSocket("Acc", this, Types.ANY),
    ];
    this.outputs = [
      new OutputSocket("Val", this, Types.ANY, "", false),
      new OutputSocket("Item", this, Types.ANY, false, true),
      new OutputSocket("Acc", this, Types.ANY, "", true),
      new OutputSocket("Index", this, Types.NUMBER, 0, true),
    ];
    this.nexts = [new NextSocket("Out", this), new NextSocket("Do", this)];
    this.prev = new PrevSocket("In", this);
  }

  /**
   * The process method
   */
  process() {
    this.input("Array").evaluate();
    let arr = this.input("Array").value;
    let acc0 = this.input("Acc0").value;
    let reduced;

    if (!Array.isArray(arr)) {
      // TODO: Manage error
    } else {
      reduced = arr.reduce((acc, val, index) => {
        // Set the "Index" output
        this.output("Index").value = index;
        // Set the "Item" output
        this.output("Item").value = val;
        // Set the "Acc" output
        this.output("Acc").value = acc;

        // If there's a node connected to the "Item" next socket...
        if (
          this.next("Do").peer !== null &&
          this.next("Do").peer.node !== null
        ) {
          // Execute a sub program beginning on that node
          this.program.processFrom(this.next("Do").peer.node);
        }

        // Now evaluate the "Acc" input
        this.input("Acc").evaluate();
        return this.input("Acc").value;
      }, acc0);
    }

    // Set the "Array" output
    this.output("Val").value = reduced;

    if (!this.functional) {
      // Set the "Array" output
      return this.getFlowResult(this.next("Out"));
    }
  }
}

/**
 * Helper function to create the node
 */
export function areduceNode() {
  return new AReduce();
}

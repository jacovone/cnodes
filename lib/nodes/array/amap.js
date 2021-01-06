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
 * This class implements a cnode that map an array to another
 * by passing all items in sequence
 */
export class AMap extends Node {
  constructor() {
    super("AMap");
    this.inputs = [
      new InputSocket("Array", this, Types.ARRAY),
      new InputSocket("Mapped", this, Types.ANY),
    ];
    this.outputs = [
      new OutputSocket("Array", this, Types.ARRAY),
      new OutputSocket("Item", this, Types.ANY),
      new OutputSocket("Index", this, Types.NUMBER),
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
    let outArr = [...arr];

    if (!Array.isArray(arr)) {
      // TODO: Manage error
    } else {
      outArr = arr.map((val, index) => {
        // Set the "Index" output
        this.output("Index").value = index;
        // Set the "Item" output
        this.output("Item").value = val;

        // If there's a node connected to the "Item" next socket...
        if (
          this.next("Do").peer !== null &&
          this.next("Do").peer.node !== null
        ) {
          // Execute a sub program beginning on that node
          this.program.processFrom(this.next("Do").peer.node);
        }

        // Now evaluate the "Mapped" input
        this.input("Mapped").evaluate();
        return this.input("Mapped").value;
      });
    }

    // Set the "Array" output
    this.output("Array").value = outArr;
    return this.getFlowResult(this.next("Out"));
  }
}

/**
 * Helper function to create the node
 */
export function amapNode() {
  return new AMap();
}

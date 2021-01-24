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
  // Provide a node instance
  static instance = () => new AMap();

  constructor() {
    super("AMap");
    this.inputs = [
      new InputSocket("Array", this, Types.ARRAY),
      new InputSocket("Mapped", this, Types.ANY),
    ];
    this.outputs = [
      new OutputSocket("Array", this, Types.ARRAY, [], false),
      new OutputSocket("Item", this, Types.ANY, "", true), // cached
      new OutputSocket("Index", this, Types.NUMBER, 0, true), // cached
    ];
    this.nexts = [new NextSocket("Out", this), new NextSocket("Do", this)];
    this.prev = new PrevSocket("In", this);
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = AMap.instance) {
    return super.clone(factory);
  }

  /**
   * The process method
   */
  async process() {
    await this.evaluateInputs();
    let arr = this.input("Array").value;
    let outArr = [];

    if (!Array.isArray(arr)) {
      // TODO: Manage error
    } else {
      for (let [index, item] of arr.entries()) {
        // Set the "Index" output
        this.output("Index").value = index;
        // Set the "Item" output
        this.output("Item").value = item;

        // If there's a node connected to the "Item" next socket...
        if (this.next("Do").peer?.node) {
          // Execute a sub program beginning on that node
          await this.program.processFrom(this.next("Do").peer.node);
        }

        // Now evaluate the "Mapped" input
        await this.input("Mapped").evaluate();
        outArr.push(this.input("Mapped").value);
      }
    }

    // Set the "Array" output
    this.output("Array").value = outArr;

    // Compute result
    if (!this.functional) {
      return this.getFlowResult(this.next("Out"));
    }
  }
}

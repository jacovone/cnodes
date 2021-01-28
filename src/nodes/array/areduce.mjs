/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020-2021
 */

import { Node } from "../../core/node.mjs";
import {
  InputSocket,
  NextSocket,
  PrevSocket,
  OutputSocket,
} from "../../core/socket.mjs";
import { Types } from "../../core/type.mjs";

/**
 * This class implements a cnode that reduces an array to
 * a value
 */
export class AReduce extends Node {
  // Provide a node instance
  static instance = () => new AReduce();

  /**
   * Construct a new AReduce node
   */
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
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = AReduce.instance) {
    return super.clone(factory);
  }

  /**
   * The process method
   */
  async process() {
    await this.evaluateInputs();
    let arr = this.input("Array").value;
    let acc0 = this.input("Acc0").value;

    let acc = acc0;
    if (!Array.isArray(arr)) {
      // TODO: Manage error
    } else {
      for (let [index, elem] of arr.entries()) {
        // Set the "Index" output
        this.output("Index").value = index;
        // Set the "Item" output
        this.output("Item").value = elem;
        // Set the "Acc" output
        this.output("Acc").value = acc;

        // If there's a node connected to the "Item" next socket...
        if (this.next("Do").peer && this.next("Do").peer.node) {
          // Execute a sub program beginning on that node
          await this.program.processFrom(this.next("Do").peer.node);
        }

        // Now evaluate the "Acc" input
        await this.input("Acc").evaluate();
        acc = this.input("Acc").value;
      }
    }

    // Set the "Val" output
    this.output("Val").value = acc;

    if (!this.functional) {
      // Set the "Array" output
      return this.getFlowResult(this.next("Out"));
    }
  }
}

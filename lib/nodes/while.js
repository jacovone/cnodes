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
import { Types } from "../core/type.js";

/**
 * This class implements a node that is able to
 * iterate until a condition become false, like
 * while(condition) do();
 */
export class While extends Node {
  // Provide a node instance
  static instance = () => new While();

  constructor() {
    super("While");
    this.inputs = [
      new InputSocket("Index", this, Types.NUMBER, 0),
      new InputSocket("Condition", this, Types.BOOLEAN, false),
    ];
    this.outputs = [new OutputSocket("Index", this, Types.NUMBER, 0)];
    this.nexts = [new NextSocket("Out", this), new NextSocket("Do", this)];
    this.prev = new PrevSocket("In", this);
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = While.instance) {
    return super.clone(factory);
  }

  /**
   * The process function
   */
  async process() {
    await this.evaluateInputs();

    // Save the current program's node
    let prevCurrentNode = this.program.currentNode;
    // A bouns index variable ;-)
    let index = parseFloat(this.input("Index").value);

    // Set the "Index" output value to Index
    this.output("Index").value = index;

    // Re evaluate inputs in case of Condition depends on Index output
    await this.evaluateInputs();

    // Let's cycle while condition is true
    while (this.input("Condition").value) {
      // If there's a node connected to the "Do" next socket...
      if (this.next("Do").peer !== null && this.next("Do").peer.node !== null) {
        // Set the "Index" output value to Index
        this.output("Index").value = index++;

        // Execute a sub program beginning on that node
        await this.program.processFrom(this.next("Do").peer.node);

        // Re-compute the guard...
        await this.evaluateInputs();
      }
    }

    // Restore the currentprogram's node
    this.program.currentNode = prevCurrentNode;

    return this.getFlowResult(this.next("Out"));
  }
}

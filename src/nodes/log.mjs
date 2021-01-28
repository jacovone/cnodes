/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020-2021
 */

import { Node } from "../core/node.mjs";
import { InputSocket, NextSocket, PrevSocket } from "../core/socket.mjs";
import { Types } from "../core/type.mjs";

/**
 * This class implements a cnode that log a message through
 * the events system
 */
export class Log extends Node {
  /** Return an instance of this node */
  static instance = () => new Log();

  /**
   * Construct a new Log node
   */
  constructor() {
    super("Log");
    this.inputs = [new InputSocket("Val", this, Types.ANY)];
    this.outputs = [];
    this.nexts = [new NextSocket("Out", this)];
    this.prev = new PrevSocket("In", this);
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = Log.instance) {
    return super.clone(factory);
  }

  /**
   * The process method
   */
  async process() {
    await this.evaluateInputs();

    // Send a "log" event
    this.program.events.emit("cn:log", this.input("Val").value);

    return this.getFlowResult(this.next("Out"));
  }
}

/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

import { Node } from "../core/node.js";
import { InputSocket, NextSocket, PrevSocket } from "../core/socket.js";
import { Types } from "../core/type.js";

/**
 * This class implements a cnode that log a message through
 * the events system
 */
export class Log extends Node {
  /** Return an instance of this node */
  static instance = () => new Log();

  constructor() {
    super("Log");
    this.inputs = [new InputSocket("Val", this, Types.ANY)];
    this.outputs = [];
    this.nexts = [new NextSocket("Out", this)];
    this.prev = new PrevSocket("In", this);
  }

  /**
   * The process method
   */
  process() {
    this.evaluateInputs();

    // Send a "log" event
    this.program.events.emit("cn:log", this.input("Val").value);

    return this.getFlowResult(this.next("Out"));
  }
}

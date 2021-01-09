/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

import { NextSocket } from "../../core/socket.js";
import { AReduce } from "./areduce.js";

/**
 * This is the functional version of the FAReduce node
 */
export class FAReduce extends AReduce {
  constructor() {
    super();
    this.name = "FAReduce";
    this.title = "FAReduce";
    this.functional = true;
    this.nexts = [new NextSocket("Do", this)];
    this.prev = null;
  }
}

/**
 * Helper function to create the node
 */
export function fareduceNode() {
  return new FAReduce();
}

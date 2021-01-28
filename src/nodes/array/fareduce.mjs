/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020-2021
 */

import { NextSocket } from "../../core/socket.mjs";
import { AReduce } from "./areduce.mjs";

/**
 * This is the functional version of the FAReduce node
 */
export class FAReduce extends AReduce {
  // Provide a node instance
  static instance = () => new FAReduce();

  /**
   * Construct a new FACompareNode
   */
  constructor() {
    super();
    this.name = "FAReduce";
    this.title = "FAReduce";
    this.functional = true;
    this.nexts = [new NextSocket("Do", this)];
    this.prev = null;
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = FAReduce.instance) {
    return super.clone(factory);
  }
}

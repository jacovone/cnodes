/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

import { FCompare } from "./fcompare.js";
import { Comparision } from "./fcompare.js";

/**
 * This class override the FCompare node with a comparision of FLT
 */
export class FLT extends FCompare {
  // Provide a node instance
  static instance = () => new FLT();

  constructor() {
    super(Comparision.LT);
    this.name = "FLT";
    this.title = "<";
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = FLT.instance) {
    return super.clone(factory);
  }
}

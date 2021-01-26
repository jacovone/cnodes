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
 * This class override the FCompare node with a comparision of GT
 */
export class FGT extends FCompare {
  // Provide a node instance
  static instance = () => new FGT();

  /**
   * Construct a new FGT
   */
  constructor() {
    super(Comparision.GT);
    this.name = "FGT";
    this.title = ">";
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = FGT.instance) {
    return super.clone(factory);
  }
}

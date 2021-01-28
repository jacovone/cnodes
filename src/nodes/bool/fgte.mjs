/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020-2021
 */

import { FCompare } from "./fcompare.mjs";
import { Comparision } from "./fcompare.mjs";

/**
 * This class override the FCompare node with a comparision of GTE
 */
export class FGTE extends FCompare {
  // Provide a node instance
  static instance = () => new FGTE();

  /**
   * Construct a new FGTE
   */
  constructor() {
    super(Comparision.GTE);
    this.name = "FGTE";
    this.title = ">=";
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = FGTE.instance) {
    return super.clone(factory);
  }
}

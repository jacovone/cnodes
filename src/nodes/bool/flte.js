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
 * This class override the FCompare node with a comparision of FLTE
 */
export class FLTE extends FCompare {
  // Provide a node instance
  static instance = () => new FLTE();

  /**
   * Construct a new FLTE
   */
  constructor() {
    super(Comparision.LTE);
    this.name = "FLTE";
    this.title = "<=";
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = FLTE.instance) {
    return super.clone(factory);
  }
}

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

  constructor() {
    super(Comparision.LTE);
    this.name = "FLTE";
    this.title = "<=";
  }
}

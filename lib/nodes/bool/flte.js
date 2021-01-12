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
  constructor() {
    super(Comparision.LTE);
    this.name = "FLTE";
    this.title = "<=";
  }
}

/**
 * Helper fuction to create the node
 */
export function flteNode() {
  return new FLTE();
}

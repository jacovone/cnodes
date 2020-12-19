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
 * This class override the FCompare node with a comparision of GTE
 */
export class FGTE extends FCompare {
  constructor() {
    super(Comparision.GTE);
    this.name = "FGTE";
  }
}

/**
 * Helper fuction to create the node
 */
export function fgteNode() {
  return new FGTE();
}

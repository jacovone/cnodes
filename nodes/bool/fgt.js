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
  constructor() {
    super(Comparision.GT);
    this.name = "FGT";
  }
}

/**
 * Helper fuction to create the node
 */
export function fgtNode() {
  return new FGT();
}

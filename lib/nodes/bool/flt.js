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
  constructor() {
    super(Comparision.LT);
    this.name = "FLT";
  }
}

/**
 * Helper fuction to create the node
 */
export function fltNode() {
  return new FLT();
}

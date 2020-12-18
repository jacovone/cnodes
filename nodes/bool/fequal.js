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
 * This class override the FCompare node with a comparision of EQUAL
 */
export class FEqual extends FCompare {
  constructor() {
    super(Comparision.EQUAL);
    this.name = "FEqual";
  }
}

/**
 * Helper fuction to create the node
 */
export function fequalNode() {
  return new FEqual();
}

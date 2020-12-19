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
 * This class override the FCompare node with a comparision of NOT_EQUAL
 */
export class FNotEqual extends FCompare {
  constructor() {
    super(Comparision.NOT_EQUAL);
    this.name = "FNotEqual";
  }
}

/**
 * Helper fuction to create the node
 */
export function fnotequalNode() {
  return new FNotEqual();
}

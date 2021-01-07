/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

import {
  InputSocket,
  NextSocket,
  PrevSocket,
  OutputSocket,
} from "../../core/socket.js";
import { AMap } from "./amap.js";

/**
 * This is the functional version of the AMap node
 */
export class FAMap extends AMap {
  constructor(name) {
    super();
    this.name = "FAMap";
    this.functional = true;
    this.nexts = [new NextSocket("Do", this)];
    this.prev = null;
  }
}

/**
 * Helper function to create the node
 */
export function famapNode() {
  return new FAMap();
}

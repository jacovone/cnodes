/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

import { NextSocket } from "../../core/socket.js";
import { AMap } from "./amap.js";

/**
 * This is the functional version of the FAMap node
 */
export class FAMap extends AMap {
  // Provide a node instance
  static instance = () => new FAMap();

  constructor() {
    super();
    this.name = "FAMap";
    this.title = "FAMap";
    this.functional = true;
    this.nexts = [new NextSocket("Do", this)];
    this.prev = null;
  }
}

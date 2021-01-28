/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020-2021
 */

import { NextSocket } from "../../core/socket.mjs";
import { AMap } from "./amap.mjs";

/**
 * This is the functional version of the FAMap node
 */
export class FAMap extends AMap {
  // Provide a node instance
  static instance = () => new FAMap();

  /**
   * Construct a new FAMap node
   */
  constructor() {
    super();
    this.name = "FAMap";
    this.title = "FAMap";
    this.functional = true;
    this.nexts = [new NextSocket("Do", this)];
    this.prev = null;
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = FAMap.instance) {
    return super.clone(factory);
  }
}

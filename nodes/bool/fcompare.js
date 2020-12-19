/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

import { Node } from "../../core/node.js";
import { InputSocket, OutputSocket } from "../../core/socket.js";
import { type, Types } from "../../core/type.js";

/**
 * Supported comparision types
 */
export const Comparision = {
  EQUAL: "equal",
  GT: "gt",
  GTE: "gte",
  LT: "lt",
  LTE: "lte",
  NOT_EQUAL: "not_equal",
};

/**
 * This class implements a functional node for compairing numeric values.
 */
export class FCompare extends Node {
  /** Configured comparision for this node */
  #comparision = Comparision.EQUAL;

  constructor(comparision = Comparision.EQUAL) {
    super("FCompare");
    this.#comparision = comparision;

    // The node is pure functional
    this.functional = true;
    // Default to two numeric inputs
    this.inputs = [
      new InputSocket("Val1", this, type(Types.NUMBER, false), 0),
      new InputSocket("Val2", this, type(Types.NUMBER, false), 0),
    ];
    this.outputs = [
      new OutputSocket("Val", this, type(Types.BOOLEAN, false), 0),
    ];
    this.prev = null;
    this.nexts = [];
  }

  get comparision() {
    return this.#comparision;
  }
  set comparision(val) {
    this.#comparision = val;
  }

  /**
   * The process override
   */
  process() {
    this.evaluateInputs();
    let val1 = this.input("Val1").value;
    let val2 = this.input("Val2").value;

    let ret;
    switch (this.comparision) {
      case Comparision.EQUAL: {
        ret = val1 === val2;
        break;
      }
      case Comparision.NOT_EQUAL: {
        ret = val1 !== val2;
        break;
      }
      case Comparision.GT: {
        ret = val1 > val2;
        break;
      }
      case Comparision.GTE: {
        ret = val1 >= val2;
        break;
      }
      case Comparision.LT: {
        ret = val1 < val2;
        break;
      }
      case Comparision.LTE: {
        ret = val1 <= val2;
        break;
      }
      default: {
        throw "Comparision type not valid";
      }
    }

    this.output("Val").value = ret;
  }

  get comparision() {
    return this.#comparision;
  }
  set comparision(val) {
    this.#comparision = val;
  }
}

/**
 * Helper fuction to create the node
 */
export function fcompareNode() {
  return new FCompare();
}

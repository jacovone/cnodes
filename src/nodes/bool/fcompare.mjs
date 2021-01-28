/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020-2021
 */

import { Node } from "../../core/node.mjs";
import { InputSocket, OutputSocket } from "../../core/socket.mjs";
import { Types } from "../../core/type.mjs";

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
  // Provide a node instance
  static instance = () => new FCompare();

  /** Configured comparision for this node */
  #comparision = Comparision.EQUAL;

  /**
   * Construct a new FCompare node
   * @param {Comparision} comparision The comparision type
   */
  constructor(comparision = Comparision.EQUAL) {
    super("FCompare");
    this.#comparision = comparision;

    // The node is pure functional
    this.functional = true;
    // Default to two numeric inputs
    this.inputs = [
      new InputSocket("Val1", this, Types.ANY, 0),
      new InputSocket("Val2", this, Types.ANY, 0),
    ];
    this.outputs = [new OutputSocket("Val", this, Types.BOOLEAN, 0, false)];
    this.prev = null;
    this.nexts = [];
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = FCompare.instance) {
    return super.clone(factory);
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
  async process() {
    await this.evaluateInputs();
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

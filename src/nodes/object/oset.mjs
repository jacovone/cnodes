/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020-2021
 */

import { Node } from "../../core/node.mjs";
import {
  InputSocket,
  NextSocket,
  PrevSocket,
  OutputSocket,
} from "../../core/socket.mjs";
import { Types } from "../../core/type.mjs";

/**
 * This class implements a node to set a field
 * inside a object structure. If the field doesn't
 * previously exists, create it
 */
export class OSet extends Node {
  // Provide a node instance
  static instance = () => new OSet();

  /**
   * Construct a new Setvar node
   */
  constructor() {
    super("OSet");
    this.functional = false;
    this.inputs = [
      new InputSocket("Object", this, Types.OBJECT, 0),
      new InputSocket("Name", this, Types.STRING, 0),
      new InputSocket("Val", this, Types.ANY, 0),
    ];
    this.outputs = [new OutputSocket("Val", this, Types.ANY, "")];
    this.nexts = [new NextSocket("Out", this)];
    this.prev = new PrevSocket("In", this);
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = OSet.instance) {
    return super.clone(factory);
  }

  /**
   * The process fmethod
   */
  async process() {
    await this.evaluateInputs();

    let fieldName = this.input("Name").value;
    let fieldVal = this.input("Val").value;
    let object = this.input("Object").value;

    if (object) {
      object[fieldName] = fieldVal;
    }

    this.output("Val").value = fieldVal;

    return this.processReturn();
  }

  /**
   * This method returns the next step in the flow
   */
  processReturn() {
    this.getFlowResult(this.next("Out"));
  }
}

/**
 * This is the functional counterpart of the OSet node
 */
export class FOSet extends OSet {
  // Provide a node instance
  static instance = () => new FOSet();

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = FOSet.instance) {
    return super.clone(factory);
  }

  constructor() {
    super();
    this.functional = true;
    this.name = "FOSet";
    this.nexts = [];
    this.prev = null;
  }

  processReturn() {
    // The functional node doesn't return anything as
    // next step
    return null;
  }
}

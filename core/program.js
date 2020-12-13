/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

import { Node } from "./node.js";

/**
 * A program is a special node that contains nodes. The program
 * manages the flow of the global execution by starting from the
 * "start" node, call its process() method and receive the next
 * "next". A program also store a global variable space
 */
export class Program extends Node {
  /** The nodes in this program */
  #nodes = new Map();

  /** The start node */
  #start = null;

  /** The variable global space */
  #vars = new Map();

  constructor(name) {
    super(name);
  }
  get vars() {
    return this.#vars;
  }
  set vars(val) {
    this.#vars = val;
  }
  get start() {
    return this.#start;
  }
  set start(val) {
    this.#start = val;
  }
  get nodes() {
    return this.#nodes;
  }
  set nodes(val) {
    this.#nodes = val;
  }

  /**
   * Add a new node to this program
   * @param {*} node The node to add
   * @param {*} isStart Is that node the start node?
   */
  addNode(node, isStart) {
    this.#nodes.set(node.id, node);
    if (isStart) {
      this.#start = node;
    }

    // Set this program to the node
    node.program = this;
    return this;
  }

  /**
   * Removes a node from this program
   * @param {*} node The node to remove
   */
  removeNode(node) {
    if (this.start && this.start.id === node.id) {
      this.start = null;
    }
    this.#nodes.delete(node.id);
    node.program = null;
    return this;
  }

  /**
   * Removes all nodes
   */
  clear() {
    this.#nodes = [];
    return this;
  }

  /**
   * A string representation of this node
   */
  toString() {
    return (
      "P{'" +
      this.name +
      "',{" +
      Array.from(this.#nodes.values()).reduce(
        (t, n, i, a) => t + n.toString() + (i < a.length - 1 ? "," : ""),
        ""
      ) +
      "}"
    );
  }

  /**
   * The process function will start from the start node and
   * cycle over nexts returned by the process functions of nodes.
   */
  process() {
    this.vars.set("start_timestamp", new Date().getTime());
    if (!this.#start) {
      return new Result();
    }
    let currentNode = this.#start;
    while (currentNode !== null) {
      let result = currentNode.process();
      currentNode = result.next;
    }
  }
}

/**
 * A helper function to create the program
 * @param {*} name The name of the program
 */
export function program(name) {
  return new Program(name);
}

import { Node } from "./node.js";

export class Program extends Node {
  #nodes = new Map();
  #start = null;
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
  addNode(node, isStart) {
    this.#nodes.set(node.id, node);
    if (isStart) {
      this.#start = node;
    }
    node.program = this;
    return this;
  }
  removeNode(node) {
    if (this.start && this.start.id === node.id) {
      this.start = null;
    }
    this.#nodes.delete(node.id);
    node.program = null;
    return this;
  }
  clear() {
    this.#nodes = [];
    return this;
  }
  toString() {
    return (
      "P{'" +
      this.name +
      "',{" +
      this.#nodes.reduce(
        (t, n, i, a) => t + n.toString() + (i < a.length - 1 ? "," : ""),
        ""
      ) +
      "}"
    );
  }
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

export function program(name) {
  return new Program(name);
}

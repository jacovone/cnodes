
import { Node } from './node.js'

export class Program extends Node {
    constructor(name) {
      super(name);
      this._nodes = new Map();
      this._start = null;
    }
    get start() {
      return this._start;
    }
    set start(val) {
      this._start = val;
    }
    get nodes() {
      return this._nodes;
    }
    set nodes(val) {
      this._nodes = val;
    }
    addNode(node, isStart) {
      this._nodes.set(node.id, node);
      if (isStart) {
        this._start = node;
      }
      node.program = this;
    }
    removeNode(node) {
      if (this.start && this.start.id === node.id) {
        this.start = null;
      }
      this._nodes.delete(node.id);
      node.program = null;
    }
    clear() {
      this._nodes = [];
    }
    toString() {
      return (
        "P{'" +
        this._name +
        "',{" +
        this._nodes.reduce(
          (t, n, i, a) => t + n.toString() + (i < a.length - 1 ? "," : ""),
          ""
        ) +
        "}"
      );
    }
    process() {
      if (!this._start) {
        return new Result();
      }
      let currentNode = this._start;
      while (currentNode !== null) {
        let result = currentNode.process();
        currentNode = result.next;
      }
    }
  }
  
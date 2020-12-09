import { v4 as uuidv4 } from "uuid";

export class Node {
  constructor(name) {
    this._id = uuidv4();
    this._name = "";
    this._inputs = [];
    this._outputs = [];
    this._nexts = [];
    this._prevs = [];
    this._program = null;
  }
  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  set name(val) {
    this._name = val;
  }
  get inputs() {
    return this._inputs;
  }
  set inputs(val) {
    this._inputs = val;
  }
  get outputs() {
    return this._outputs;
  }
  set outputs(val) {
    this._outputs = val;
  }
  get nexts() {
    return this._nexts;
  }
  set nexts(val) {
    this._nexts = val;
  }
  get program() {
    return this._program;
  }
  set program(val) {
    this._program = val;
  }
  input(name) {
    return this.inputs.find((i) => i.name === name);
  }
  output(name) {
    return this.outputs.find((o) => o.name === name);
  }
  next(name) {
    return this.nexts.find((n) => n.name === name);
  }
  prev(name) {
    return this.prevs.find((p) => p.name === name);
  }
  evaluateInputs() {
    for (let inp of this.inputs) {
      inp.evaluate();
    }
  }
  toString() {
    return (
      "N('" +
      this._id +
      "'," +
      this._inputs.length +
      "i," +
      this._outputs.length +
      "o," +
      this._nexts.length +
      "n)"
    );
  }
  process() {
    return new Result();
  }
}

export class Result {
  constructor(next) {
    this._next = next || null;
  }
  get next() {
    return this._next;
  }
  set next(val) {
    this._next = val;
  }
}

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

import { v4 as uuidv4 } from "uuid";

export class Node {
  constructor(name) {
    this._id = uuidv4();
    this._name = "";
    this._functional = false;
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
  get functional() {
    return this._functional;
  }
  set functional(val) {
    this._functional = val;
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
  get prevs() {
    return this._prevs;
  }
  set prevs(val) {
    this._prevs = val;
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
  getFlowResult(socket) {
    if(socket.peer) {
        return new Result(socket.peer.node);
    } else {
        return new Result();
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

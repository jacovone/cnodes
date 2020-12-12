import { v4 as uuidv4 } from "uuid";

export class Node {

  _id = uuidv4();
  _name = "";
  _functional = false;
  _inputs = [];
  _outputs = [];
  _nexts = [];
  _prev = null;
  _program = null;

  constructor(name) {}
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
  get prev() {
    return this._prev;
  }
  set prev(val) {
    this._prev = val;
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
    if(!name) {
      return this.nexts[0];
    }
    return this.nexts.find((n) => n.name === name);
  }
  evaluateInputs() {
    for (let inp of this.inputs) {
      inp.evaluate();
    }
  }
  getFlowResult(socket) {
    if (socket.peer) {
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
  _next = null;
  constructor(next = null) {
    this._next = next;
  }
  get next() {
    return this._next;
  }
  set next(val) {
    this._next = val;
  }
}

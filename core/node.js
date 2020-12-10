import { v4 as uuidv4 } from "uuid";

export class Node {

  #id = uuidv4();
  #name = "";
  #functional = false;
  #inputs = [];
  #outputs = [];
  #nexts = [];
  #prev = null;
  #program = null;

  constructor(name) {}
  get id() {
    return this.#id;
  }
  get name() {
    return this.#name;
  }
  set name(val) {
    this.#name = val;
  }
  get functional() {
    return this.#functional;
  }
  set functional(val) {
    this.#functional = val;
  }
  get inputs() {
    return this.#inputs;
  }
  set inputs(val) {
    this.#inputs = val;
  }
  get outputs() {
    return this.#outputs;
  }
  set outputs(val) {
    this.#outputs = val;
  }
  get nexts() {
    return this.#nexts;
  }
  set nexts(val) {
    this.#nexts = val;
  }
  get prev() {
    return this.#prev;
  }
  set prev(val) {
    this.#prev = val;
  }
  get program() {
    return this.#program;
  }
  set program(val) {
    this.#program = val;
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
      this.#id +
      "'," +
      this.#inputs.length +
      "i," +
      this.#outputs.length +
      "o," +
      this.#nexts.length +
      "n)"
    );
  }
  process() {
    return new Result();
  }
}

export class Result {
  #next = null;
  constructor(next = null) {
    this.#next = next;
  }
  get next() {
    return this.#next;
  }
  set next(val) {
    this.#next = val;
  }
}

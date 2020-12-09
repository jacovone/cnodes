import { Node, Result } from "./node.js";
import { InputValueSocket, OutputValueSocket } from "./socket.js";

export class Add extends Node {
  constructor() {
    super("Add");
    this.inputs = [
      new InputValueSocket("Val1", this, typeof 0, 0),
      new InputValueSocket("Val2", this, typeof 0, 0),
    ];
    this.outputs = [new OutputValueSocket("Result", this, typeof 0, 0)];
  }

  process() {
    let sum = 0;
    this.evaluateInputs();
    for (let inp of this.inputs) {
      sum += inp.value;
    }
    this.outputs[0].type = this.inputs[0].type;
    this.outputs[0].value = sum;

    return new Result();
  }
}

export function addNode() {
    return new Add();
}

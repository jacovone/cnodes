import { Node, Result } from "./node.js";
import { InputValueSocket, OutputValueSocket } from "./socket.js";

export class Add extends Node {
  constructor() {
    super("Add");
    this.inputs = [
      new InputValueSocket("val1", this, typeof 0, 0),
      new InputValueSocket("val2", this, typeof 0, 0),
    ];
    this.outputs = [new OutputValueSocket("result", this, typeof 0, 0)];
  }

  process() {
    let sum = 0;
    for (let inp of this.inputs) {
      inp.evaluate();
      sum += inp.value;
    }
    this.outputs[0].type = this.inputs[0].type;
    this.outputs[0].value = sum;

    return new Result();
  }
}

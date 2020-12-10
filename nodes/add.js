import { Node, Result } from "./node.js";
import { InputFlowSocket, InputValueSocket, OutputFlowSocket, OutputValueSocket } from "./socket.js";

export class Add extends Node {
  constructor() {
    super("Add");
    this.functional = true;
    this.inputs = [
      new InputValueSocket("Val1", this, typeof 0, 0),
      new InputValueSocket("Val2", this, typeof 0, 0),
    ];
    this.outputs = [new OutputValueSocket("Val", this, typeof 0, 0)];
    this.prevs = [
        new InputFlowSocket('In', this)
    ];
    this.nexts = [
        new OutputFlowSocket('Out', this)
    ];
  }

  process() {
    let sum = 0;
    this.evaluateInputs();
    for (let inp of this.inputs) {
      sum += inp.value;
    }
    this.outputs[0].type = this.inputs[0].type;
    this.outputs[0].value = sum;

    return this.getFlowResult(this.next('Out'));
  }
}

export function addNode() {
    return new Add();
}

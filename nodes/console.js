import { Node, Result } from "../core/node.js";
import { InputValueSocket, OutputFlowSocket, InputFlowSocket } from "../core/socket.js";

export class Console extends Node {
  constructor() {
    super("Console");
    this.inputs = [new InputValueSocket("Val", this, typeof 0, 0)];
    this.outputs = [];
    this.nexts = [
      new OutputFlowSocket('Out', this)
    ];
    this.prevs = [
      new InputFlowSocket('In', this)
    ]
  }

  process() {
    this.evaluateInputs();
    console.log(this.input('Val').value);

    let res = new Result();
    return this.getFlowResult(this.next('Out'));
  }
}

export function consoleNode() {
  return new Console();
}

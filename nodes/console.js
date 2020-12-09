import { Node, Result } from "./node.js";
import { InputValueSocket, OutputFlowSocket, InputFlowSocket } from "./socket.js";

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
    if(this.next('Out').peer) {
      return new Result(this.next('Out').peer.node)
    } else {
      return new Result();
    }
  }
}

export function consoleNode() {
  return new Console();
}

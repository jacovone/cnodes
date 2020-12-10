import { Node, Result } from "./node.js";
import { InputValueSocket, OutputFlowSocket, InputFlowSocket, OutputValueSocket } from "./socket.js";

export class Getvar extends Node {
  constructor() {
    super("Getvar");
    this.inputs = [new InputValueSocket("Name", this, typeof '', '')];
    this.outputs = [new OutputValueSocket("Val", this, typeof '', '')];
    this.nexts = [
      new OutputFlowSocket('Out', this)
    ];
    this.prevs = [
      new InputFlowSocket('In', this)
    ]
  }

  process() {
    this.evaluateInputs();

    let varName = this.input('Name').value;
    this.output('Val').value = this.program.vars.get(varName);

    return this.getFlowResult(this.next('Out'));
  }
}

export function getvarNode() {
  return new Getvar();
}

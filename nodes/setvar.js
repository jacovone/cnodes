import { Node, Result } from "./node.js";
import { InputValueSocket, OutputFlowSocket, InputFlowSocket, OutputValueSocket } from "./socket.js";

export class Setvar extends Node {
  constructor() {
    super("Setvar");
    this.inputs = [
      new InputValueSocket("Name", this, typeof '', ''),
      new InputValueSocket("Val", this, typeof '', '')
    ];
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
    let varVal = this.input('Val').value;
    this.program.vars.set(varName, varVal);
    this.output('Val').value = varVal;

    return this.getFlowResult(this.next('Out'));
  }
}

export function setvarNode() {
  return new Setvar();
}

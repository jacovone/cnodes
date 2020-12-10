import { Node, Result } from "../core/node.js";
import { InputSocket, NextSocket, PrevSocket, OutputSocket } from "../core/socket.js";

export class Setvar extends Node {
  constructor() {
    super("Setvar");
    this.inputs = [
      new InputSocket("Name", this, typeof '', ''),
      new InputSocket("Val", this, typeof '', '')
    ];
    this.outputs = [new OutputSocket("Val", this, typeof '', '')];
    this.nexts = [
      new NextSocket('Out', this)
    ];
    this.prev = new PrevSocket('In', this);
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

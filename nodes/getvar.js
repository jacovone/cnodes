import { Node, Result } from "../core/node.js";
import { InputSocket, NextSocket, PrevSocket, OutputSocket } from "../core/socket.js";

export class Getvar extends Node {
  constructor() {
    super("Getvar");
    this.inputs = [new InputSocket("Name", this, typeof '', '')];
    this.outputs = [new OutputSocket("Val", this, typeof '', '')];
    this.nexts = [
      new NextSocket('Out', this)
    ];
    this.prev = new PrevSocket('In', this);
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

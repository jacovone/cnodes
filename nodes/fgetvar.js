import { Node, Result } from "../core/node.js";
import { InputSocket, NextSocket, PrevSocket, OutputSocket } from "../core/socket.js";

export class FGetvar extends Node {
  constructor() {
    super("FGetvar");
    this.functional = true;
    this.inputs = [new InputSocket("Name", this, typeof '', '')];
    this.outputs = [new OutputSocket("Val", this, typeof '', '')];
    this.nexts = [];
    this.prev = null;
  }

  process() {
    this.evaluateInputs();

    let varName = this.input('Name').value;
    this.output('Val').value = this.program.vars.get(varName);
  }
}

export function fgetvarNode() {
  return new FGetvar();
}

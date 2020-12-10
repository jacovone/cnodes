import { Node, Result } from "../core/node.js";
import { InputSocket, NextSocket, PrevSocket } from "../core/socket.js";
import { type, Types } from "../core/type.js";

export class Console extends Node {
  constructor() {
    super("Console");
    this.inputs = [new InputSocket("Val", this, type(Types.ANY, false), 0)];
    this.outputs = [];
    this.nexts = [
      new NextSocket('Out', this)
    ];
    this.prev = new PrevSocket('In', this);
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

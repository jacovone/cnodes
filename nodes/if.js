import { Node, Result } from "../core/node.js";
import { InputSocket, NextSocket as NextSocket, PrevSocket } from "../core/socket.js";

export class If extends Node {
  constructor() {
    super("If");
    this.inputs = [new InputSocket("Condition", this, typeof true, false)];
    this.outputs = [];
    this.nexts = [
      new NextSocket('Then', this),
      new NextSocket('Else', this)
    ];
    this.prev = new PrevSocket('In', this);
  }

  process() {
    this.evaluateInputs();
    let flow = null;
    if(this.input('Condition').value) {
      flow = this.next('Then');
    } else {
      flow = this.next('Else');
    }

    return this.getFlowResult(flow);
  }
}

export function ifNode() {
  return new If();
}

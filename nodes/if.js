import { Node, Result } from "../core/node.js";
import { InputValueSocket, OutputFlowSocket, InputFlowSocket } from "../core/socket.js";

export class If extends Node {
  constructor() {
    super("If");
    this.inputs = [new InputValueSocket("Condition", this, typeof true, false)];
    this.outputs = [];
    this.nexts = [
      new OutputFlowSocket('Then', this),
      new OutputFlowSocket('Else', this)
    ];
    this.prevs = [
      new InputFlowSocket('In', this)
    ]
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

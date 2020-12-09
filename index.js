import { Node, Program } from "./nodes/node.js";
import { Add } from "./nodes/add.js";

let e = new Program('main');

let n = new Add();
n.inputs[0].value = 12;
n.inputs[1].value = 2;

let n2 = new Add();
n2.inputs[0].value = 10;
n2.inputs[1].value = 0;
n2.inputs[1].peer = n.outputs[0];

e.addNode(n);
e.addNode(n2, true);
e.process();

console.log(n2.outputs[0].value);


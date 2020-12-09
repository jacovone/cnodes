import { Program } from "./nodes/program.js";
import { addNode } from "./nodes/add.js";
import { consoleNode } from "./nodes/console.js";
import { ifNode } from "./nodes/if.js";

let e = new Program('main');

let n = addNode();
n.input('Val1').value = 12;
n.input('Val2').value = 2;

let n2 = addNode();
n2.input('Val1').value = 10;
n2.input('Val2').connect(n.output('Result'));

let n3 = consoleNode();
n3.input('Val').connect(n2.output('Result'))

let n4 = consoleNode();
n4.input('Val').value = 'Ciao';
n3.next('Out').connect(n4.prev('In'));

let n6 = consoleNode();
n6.input('Val').value = 'True';
let n7 = consoleNode();
n7.input('Val').value = 'False';

let n5 = ifNode();
n5.input('Condition').connect(n.output('Result'));
n5.next('Then').connect(n6.prev('In'));
n5.next('Else').connect(n7.prev('In'));

n4.next('Out').connect(n5.prev('In'));

e.addNode(n);
e.addNode(n2);
e.addNode(n3, true);
e.process();

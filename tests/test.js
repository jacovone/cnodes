import * as cnodes from "../cnodes.js";
import { Env } from "../core/env.js";
import { Program } from "../core/program.js";

let n = cnodes.faddNode();
n.input("Val1").value = 12;
n.input("Val2").value = 2;

let n2 = cnodes.faddNode();
n2.input("Val1").value = 10;
n2.input("Val2").connect(n.output("Val"));

let n3 = cnodes.consoleNode();
n3.input("Val").connect(n2.output("Val"));
n3.input("Val").disconnect(n2.output("Val"));

// let n4 = cnodes.consoleNode();
// n4.input("Val").value = "Ciao";
// n3.next("Out").connect(n4.prev);

// let n6 = cnodes.consoleNode();
// n6.input("Val").value = "True";
// let n7 = cnodes.consoleNode();
// n7.input("Val").value = "False";

// let n5 = cnodes.ifNode();
// n5.input("Condition").connect(n.output("Val"));
// n5.next("Then").connect(n6.prev);
// n5.next("Else").connect(n7.prev);

// n4.next("Out").connect(n5.prev);

let program = cnodes.program("main").addNode(n).addNode(n2).addNode(n3);

n3.prev.connect(program.enter.next("Begin"));
n3.next("Out").connect(program.exit.prev);

program.process();

Env.init();
let exp = Env.export(program);
// console.log(JSON.stringify(exp));
let ppp = Env.import(exp);
// console.log(JSON.stringify(Env.export(ppp)));
ppp.process();

import { program } from "../core/program.js";
import { consoleNode } from "../nodes/console.js";
import { forNode } from "../nodes/for.js";
import { Env } from "../core/env.js";

// Create a new program
let prg = program();

// create the "For" node
let fn = forNode();
// Define console node
let cn = consoleNode();

// Create flow connections and inputs/outputs
fn.prev.connect(prg.enter.next("Begin"));
fn.input("From").connect(prg.enter.output("Val"));
fn.input("To").value = 10;

prg.exit.prev.connect(fn.next("Out"));
cn.prev.connect(fn.next("Do"));
cn.input("Val").connect(fn.output("Index"));

// Execute
prg.addNode(fn).addNode(cn).process();

// Export
let dmp = Env.export(prg);
console.log(JSON.stringify(dmp));

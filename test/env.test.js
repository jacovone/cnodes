import tap from "tap";
import { FAdd } from "../lib/nodes/math/fadd.js";
import { program } from "../lib/core/program.js";
import { consoleNode } from "../lib/nodes/console.js";
import { forNode } from "../lib/nodes/for.js";
import { Env } from "../lib/core/env.js";

tap.test("Prograam will export, import then executes", (test) => {
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
  prg.exit.input("Val").connect(fn.output("Index"));
  // cn.prev.connect(fn.next("Do"));
  cn.input("Val").connect(fn.output("Index"));

  // Add nodes
  prg.addNode(fn).addNode(cn);

  // Export
  let dmp = Env.export(prg);
  let dmpStr = JSON.stringify(dmp);

  Env.init();
  let program2 = Env.import(JSON.parse(dmpStr));

  program2.process();

  test.same(program2.exit.output("Val").value, 9);
  test.end();
});

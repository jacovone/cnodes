import tap from "tap";
import { Program } from "../src/core/program.js";
import { Console } from "../src/nodes/console.js";
import { For } from "../src/nodes/for.js";
import { Env } from "../src/core/env.js";

tap.test("Prograam will export, import then executes", async (test) => {
  // Create a new program
  let prg = Program.instance();

  // create the "For" node
  let fn = For.instance();
  // Define console node
  let cn = Console.instance();

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

  await program2.process();

  test.same(program2.exit.input("Val").value, 9);
  test.end();
});

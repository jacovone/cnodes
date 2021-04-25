import tap from "tap";
import { Program } from "../src/core/program.mjs";
import { Console } from "../src/nodes/console.mjs";
import { For } from "../src/nodes/for.mjs";
import { Env } from "../src/core/env.mjs";

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

tap.test("Test unregister node", async (test) => {
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
  Env.unregisterNode(For.instance);

  let program2;
  try {
    program2 = Env.import(JSON.parse(dmpStr));
    test.error();
  } catch (error) {
    test.end();
    return;
  }
});
tap.test("Test unregister all nodes", async (test) => {
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
  Env.unregisterAllNodes();

  let program2;
  try {
    program2 = Env.import(JSON.parse(dmpStr));
    test.error();
  } catch (error) {
    test.end();
    return;
  }
});

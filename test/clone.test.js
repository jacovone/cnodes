import tap from "tap";
import { Env } from "../lib/core/env.js";
import { Program } from "../lib/core/program.js";
import { Console } from "../lib/nodes/console.js";
import { For } from "../lib/nodes/for.js";
import { FOBreak } from "../lib/nodes/object/fobreak.js";

tap.test("Break down a simple object (cloned)", async (test) => {
  let n = new FOBreak();

  n.input("Val").value = {
    a: 99,
    b: "test",
    c: [0, 1, 2],
  };

  n.removeOutput(n.output("field2"));
  n.outputs[0].name = "a";
  n.addOutput();
  n.addOutput();
  n.addOutput();

  n.outputs[1].name = "b";
  n.outputs[2].name = "c";
  n.outputs[3].name = "d";

  let n1 = n.clone();

  await n1.process();

  test.same(n1.output("a").value, 99);
  test.same(n1.output("b").value, "test");
  test.same(n1.output("c").value, [0, 1, 2]);
  test.is(n1.output("d").value, undefined);

  test.end();
});

tap.test(
  "Try to create an entire program, clone it and execute",
  async (test) => {
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

    // Clone
    let program3 = program2.clone();

    await program3.process();

    test.same(program3.exit.input("Val").value, 9);
    test.end();
  }
);

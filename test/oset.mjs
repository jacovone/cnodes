import tap from "tap";
import { FOBreak } from "../src/nodes/object/fobreak.mjs";
import { OSet } from "../src/nodes/object/oset.mjs";
import { FOMake } from "../src/nodes/object/fomake.mjs";

tap.test("Make a simple object", async (test) => {
  let n = new FOMake();
  n.inputs[0].name = "a";
  n.inputs[1].name = "b";
  n.input("a").value = 2;
  n.input("b").value = "test";
  await n.process();

  test.same(n.output("Val").value, { a: 2, b: "test" });

  n.addInput();

  n.inputs[2].name = "c";
  n.input("c").value = "99";
  await n.process();

  test.same(n.output("Val").value, { a: 2, b: "test", c: 99 });

  n.removeInput(n.input("a"));
  await n.process();

  test.same(n.output("Val").value, { b: "test", c: 99 });

  let nSet = new OSet();
  nSet.input("Object").value = n.output("Val").value;
  nSet.input("Name").value = "c";
  nSet.input("Val").value = 100;

  await nSet.process();

  test.same(nSet.output("Val").value, 100);
  test.same(nSet.input("Object").value.c, 100);

  test.end();
});

tap.test("Break down a simple object", async (test) => {
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

  await n.process();

  test.same(n.output("a").value, 99);
  test.same(n.output("b").value, "test");
  test.same(n.output("c").value, [0, 1, 2]);
  test.is(n.output("d").value, undefined);

  test.end();
});

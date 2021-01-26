import tap from "tap";
import { FOMake } from "../src/nodes/object/fomake.js";

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

  test.end();
});

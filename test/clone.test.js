import tap from "tap";
import { FOBreak } from "../lib/nodes/object/fobreak.js";

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

  let n1 = n.clone();

  await n1.process();

  test.same(n1.output("a").value, 99);
  test.same(n1.output("b").value, "test");
  test.same(n1.output("c").value, [0, 1, 2]);
  test.is(n1.output("d").value, undefined);

  test.end();
});

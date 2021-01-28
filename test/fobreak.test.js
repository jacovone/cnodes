import tap from "tap";
import { FOBreak } from "../src/nodes/object/fobreak.mjs";

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

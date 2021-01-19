import tap from "tap";
import { Types } from "../lib/core/type.js";
import { FAdd } from "../lib/nodes/math/fadd.js";

tap.test("Add 1 + 2 equals to 3", async (test) => {
  let n = new FAdd();
  n.input("0").value = 1;
  n.input("1").value = 2;
  await n.process();

  test.same(n.output("Val").value, 3);
  test.end();
});

tap.test("Add 11 - 22 equals to -11 of type number", async (t) => {
  let n = new FAdd();
  n.input("0").value = 11;
  n.input("1").value = -22;
  await n.process();

  t.same(n.output("Val").value, -11);

  t.test("Type of number", (t2) => {
    t2.same(n.output("Val").type, Types.NUMBER, "Type is correct");
    t2.end();
  });

  t.end();
});

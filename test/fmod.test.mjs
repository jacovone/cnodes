import tap from "tap";
import { Types } from "../src/core/type.mjs";
import { FMod } from "../src/nodes/math/fmod.mjs";

tap.test("10 % 3 === 1", async (test) => {
  let n = new FMod();
  n.input("Val1").value = 10;
  n.input("Val2").value = 3;
  await n.process();

  test.same(n.output("Val").value, 1);
  test.end();
});

tap.test("6 % 2 === 0", async (t) => {
  let n = new FMod();
  n.input("Val1").value = 6;
  n.input("Val2").value = 2;
  await n.process();

  t.same(n.output("Val").value, 0);

  t.test("Type of number", (t2) => {
    t2.same(n.output("Val").type, Types.NUMBER, "Type is correct");
    t2.end();
  });

  t.end();
});

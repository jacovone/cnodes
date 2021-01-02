import tap from "tap";
import { Types } from "../lib/core/type.js";
import { FMod } from "../lib/nodes/math/fmod.js";

tap.test("10 % 3 === 1", (test) => {
  let n = new FMod();
  n.input("Val1").value = 10;
  n.input("Val2").value = 3;
  n.process();

  test.match(n.output("Val").value, 1);
  test.end();
});

tap.test("6 % 2 === 0", (t) => {
  let n = new FMod();
  n.input("Val1").value = 6;
  n.input("Val2").value = 2;
  n.process();

  t.match(n.output("Val").value, 0);

  t.test("Type of number", (t2) => {
    t2.match(n.output("Val").type, Types.NUMBER, "Type is correct");
    t2.end();
  });

  t.end();
});

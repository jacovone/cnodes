import tap from "tap";
import { FAdd } from "../src/nodes/math/fadd.js";

tap.test("Add 1 + 2 equals to 3", (test) => {
  let n = new FAdd();
  n.input("0").value = 1;
  n.input("1").value = 2;
  n.process();

  test.match(n.output("Val").value, 3);
  test.end();
});

tap.test("Add 11 - 22 equals to -11 of type number", (t) => {
  let n = new FAdd();
  n.input("0").value = 11;
  n.input("1").value = -22;
  n.process();

  t.match(n.output("Val").value, -11);

  t.test("Type of number", (t2) => {
    t2.match(
      n.output("Val").type,
      { type: "number", isArray: false },
      "Type is correct"
    );
    t2.end();
  });

  t.end();
});

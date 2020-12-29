import tap from "tap";
import { FDiv } from "../lib/nodes/math/fdiv.js";

tap.test("Divide 1 by 2 equals to 0.5", (test) => {
  let n = new FDiv();
  n.input("Val1").value = 1;
  n.input("Val2").value = 2;
  n.process();

  test.match(n.output("Val").value, 0.5);
  test.end();
});

tap.test("Divide 112 by 2 equals to 56 of type number", (t) => {
  let n = new FDiv();
  n.input("Val1").value = 112;
  n.input("Val2").value = 2;
  n.process();

  t.match(n.output("Val").value, 56);

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

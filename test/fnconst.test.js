import tap from "tap";
import { Types } from "../lib/core/type.js";
import { FNConst } from "../lib/nodes/math/fnconst.js";

tap.test("Define a simple number constant", (test) => {
  let n = new FNConst();
  n.input("Val").value = 99;
  n.process();

  test.match(n.output("Val").value, 99);
  test.end();
});

tap.test("Convert a string value to a number", (test) => {
  let n = new FNConst();
  n.input("Val").value = "99";
  n.process();

  test.match(n.output("Val").value, 99);
  test.match(n.output("Val").type, Types.NUMBER);
  test.end();
});

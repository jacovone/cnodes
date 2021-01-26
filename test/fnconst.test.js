import tap from "tap";
import { Types } from "../src/core/type.js";
import { FNConst } from "../src/nodes/math/fnconst.js";

tap.test("Define a simple number constant", async (test) => {
  let n = new FNConst();
  n.input("Val").value = 99;
  await n.process();

  test.same(n.output("Val").value, 99);
  test.end();
});

tap.test("Convert a string value to a number", async (test) => {
  let n = new FNConst();
  n.input("Val").value = "99";
  await n.process();

  test.same(n.output("Val").value, 99);
  test.same(n.output("Val").type, Types.NUMBER);
  test.end();
});

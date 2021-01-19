import tap from "tap";
import { FSConst } from "../lib/nodes/string/fsconst.js";

tap.test("Define a simple string constant", async (test) => {
  let n = new FSConst();
  n.input("Val").value = "Simple constant";
  await n.process();

  test.same(n.output("Val").value, "Simple constant");
  test.end();
});

tap.test("Convert a numeric value to a string", async (test) => {
  let n = new FSConst();
  n.input("Val").value = 99;
  await n.process();

  test.same(n.output("Val").value, "99");
  test.end();
});

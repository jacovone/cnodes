import tap from "tap";
import { FSConst } from "../lib/nodes/string/fsconst.js";

tap.test("Define a simple string constant", (test) => {
  let n = new FSConst();
  n.input("Val").value = "Simple constant";
  n.process();

  test.match(n.output("Val").value, "Simple constant");
  test.end();
});

tap.test("Convert a numeric value to a string", (test) => {
  let n = new FSConst();
  n.input("Val").value = 99;
  n.process();

  test.match(n.output("Val").value, "99");
  test.end();
});

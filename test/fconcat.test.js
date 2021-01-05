import tap from "tap";
import { FConcat } from "../lib/nodes/string/fconcat.js";

tap.test("Concatenate two strings", (test) => {
  let n = new FConcat();
  n.input("0").value = "first";
  n.input("1").value = "second";
  n.process();

  test.same(n.output("Val").value, "firstsecond");
  test.end();
});

tap.test("Concatenate two numbers", (test) => {
  let n = new FConcat();
  n.input("0").value = 1;
  n.input("1").value = 99;
  n.process();

  test.same(n.output("Val").value, "199");
  test.end();
});

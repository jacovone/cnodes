import tap from "tap";
import { FConcat } from "../src/nodes/string/fconcat.mjs";

tap.test("Concatenate two strings", async (test) => {
  let n = new FConcat();
  n.input("0").value = "first";
  n.input("1").value = "second";
  await n.process();

  test.same(n.output("Val").value, "firstsecond");
  test.end();
});

tap.test("Concatenate two numbers", async (test) => {
  let n = new FConcat();
  n.input("0").value = 1;
  n.input("1").value = 99;
  await n.process();

  test.same(n.output("Val").value, "199");
  test.end();
});

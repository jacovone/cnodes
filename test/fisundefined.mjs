import tap from "tap";
import { FIsUndefined } from "../src/nodes/isundefined.mjs";

tap.test("Condition undefined", async (test) => {
  let n = new FIsUndefined();
  n.input("Val").value = undefined;
  await n.process();

  test.same(n.output("Val").value, true);
  test.end();
});

tap.test("Condition not undefined", async (test) => {
  let n = new FIsUndefined();
  n.input("Val").value = "Test string not undefined";
  await n.process();

  test.same(n.output("Val").value, false);
  test.end();
});

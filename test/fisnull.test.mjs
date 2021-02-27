import tap from "tap";
import { FIsNull } from "../src/nodes/isnull.mjs";

tap.test("Condition null", async (test) => {
  let n = new FIsNull();
  n.input("Val").value = null;
  await n.process();

  test.same(n.output("Val").value, true);
  test.end();
});

tap.test("Condition not null", async (test) => {
  let n = new FIsNull();
  n.input("Val").value = "Test string not null";
  await n.process();

  test.same(n.output("Val").value, false);
  test.end();
});

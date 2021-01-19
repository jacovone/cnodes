import tap from "tap";
import { FIf } from "../lib/nodes/fif.js";

tap.test("Condition true", async (test) => {
  let n = new FIf();
  n.input("True").value = "TRUE";
  n.input("False").value = "FALSE";
  n.input("Condition").value = true;
  await n.process();

  test.same(n.output("Val").value, "TRUE");
  test.end();
});

tap.test("Condition false", async (test) => {
  let n = new FIf();
  n.input("True").value = "TRUE";
  n.input("False").value = "FALSE";
  n.input("Condition").value = false;
  await n.process();

  test.same(n.output("Val").value, "FALSE");
  test.end();
});

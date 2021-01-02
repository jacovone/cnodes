import tap from "tap";
import { FIf } from "../lib/nodes/fif.js";

tap.test("Condition true", (test) => {
  let n = new FIf();
  n.input("True").value = "TRUE";
  n.input("False").value = "FALSE";
  n.input("Condition").value = true;
  n.process();

  test.match(n.output("Val").value, "TRUE");
  test.end();
});

tap.test("Condition false", (test) => {
  let n = new FIf();
  n.input("True").value = "TRUE";
  n.input("False").value = "FALSE";
  n.input("Condition").value = false;
  n.process();

  test.match(n.output("Val").value, "FALSE");
  test.end();
});

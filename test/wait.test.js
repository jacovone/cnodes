import tap from "tap";
import { Wait } from "../src/nodes/wait.js";

tap.test("Wait 1 second", async (test) => {
  let n = Wait.instance();
  n.input("Secs").value = 0.2;

  let startTime = new Date().getTime();

  await n.process();

  let endTime = new Date().getTime();

  test.assert(endTime > startTime + 100, "1 second passed");
  test.end();
});

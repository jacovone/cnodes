import tap from "tap";
import { APush } from "../lib/nodes/array/apush.js";
import { FAConst } from "../lib/nodes/array/faconst.js";
import { FAGet } from "../lib/nodes/array/faget.js";
import { FALength } from "../lib/nodes/array/falength.js";
import { FAMake } from "../lib/nodes/array/famake.js";

tap.test("Sone array tests", (test) => {
  let n = new FAConst();
  n.input("Val").value = "[0,1,2]";
  n.process();
  test.same(n.output("Val").value, [0, 1, 2]);

  n = new FAMake();
  n.input("0").value = 0;
  n.input("1").value = 1;

  n.addInput();
  n.input("2").value = 2;
  n.process();
  test.same(n.output("Val").value, [0, 1, 2]);

  let arr = n.output("Val").value;

  test.test("Push a value into array", (test2) => {
    let n = new APush();
    n.input("Array").value = [0, 1, 2];
    n.input("Val").value = 3;
    n.process();

    test2.same(n.output("Val").value, [0, 1, 2, 3]);
    arr = n.output("Val").value;

    test.test("Test must have length of 4", (test2) => {
      let n = new FALength();
      n.input("Array").value = arr;
      n.process();

      test2.same(n.output("Val").value, 4);
      test2.end();
    });
    test.test("Test must have length of 4", (test2) => {
      let n = new FAGet();
      n.input("Array").value = arr;
      n.input("Index").value = 1;
      n.process();

      test2.same(n.output("Val").value, 1);
      test2.end();
    });

    test2.end();
  });

  test.end();
});

import tap from "tap";
import { AMap } from "../lib/nodes/array/amap.js";
import { APush } from "../lib/nodes/array/apush.js";
import { AReduce } from "../lib/nodes/array/areduce.js";
import { FAConst } from "../lib/nodes/array/faconst.js";
import { FAGet } from "../lib/nodes/array/faget.js";
import { FALength } from "../lib/nodes/array/falength.js";
import { FAMake } from "../lib/nodes/array/famake.js";
import { FAdd } from "../lib/nodes/math/fadd.js";

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

    test2.test("Try to map to another array", (test3) => {
      let n = new AMap();
      let n1 = new FAdd();
      n1.input("0").connect(n.output("Item"));
      n1.input("1").value = 1;
      n1.output("Val").connect(n.input("Mapped"));
      n.input("Array").value = arr;
      n.process();

      test3.same(n.output("Array").value, [1, 2, 3, 4]);
      test3.end();
    });

    test2.test("Try to reduce an array to the sum of its elements", (test3) => {
      let n = new AReduce();
      let n1 = new FAdd();

      n1.input("0").connect(n.output("Acc"));
      n1.input("1").connect(n.output("Item"));
      n.input("Acc").connect(n1.output("Val"));
      n.input("Acc0").value = 0;
      n.input("Array").value = [1, 2, 3, 4];

      n.process();

      test3.same(n.output("Array").value, 10);

      test3.end();
    });

    test2.test("Test must have length of 4", (test3) => {
      let n = new FALength();
      n.input("Array").value = arr;
      n.process();

      test3.same(n.output("Val").value, 4);
      test3.end();
    });
    test2.test("Test must have length of 4", (test3) => {
      let n = new FAGet();
      n.input("Array").value = arr;
      n.input("Index").value = 1;
      n.process();

      test3.same(n.output("Val").value, 1);
      test3.end();
    });

    test2.end();
  });

  test.end();
});

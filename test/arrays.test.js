import tap from "tap";
import { AMap } from "../src/nodes/array/amap.js";
import { APush } from "../src/nodes/array/apush.js";
import { AReduce } from "../src/nodes/array/areduce.js";
import { FAConst } from "../src/nodes/array/faconst.js";
import { FAGet } from "../src/nodes/array/faget.js";
import { FALength } from "../src/nodes/array/falength.js";
import { FAMake } from "../src/nodes/array/famake.js";
import { FAdd } from "../src/nodes/math/fadd.js";

tap.test("Sone array tests", async (test) => {
  let n = new FAConst();
  n.input("Val").value = "[0,1,2]";
  await n.process();
  test.same(n.output("Val").value, [0, 1, 2]);

  n = new FAMake();
  n.input("0").value = 0;
  n.input("1").value = 1;

  n.addInput();
  n.input("2").value = 2;
  await n.process();
  test.same(n.output("Val").value, [0, 1, 2]);

  let arr = n.output("Val").value;

  test.test("Push a value into array", async (test2) => {
    let n = new APush();
    n.input("Array").value = [0, 1, 2];
    n.input("Val").value = 3;
    await n.process();

    test2.same(n.output("Val").value, [0, 1, 2, 3]);
    arr = n.output("Val").value;

    test2.test("Try to map to another array", async (test3) => {
      let n = new AMap();
      let n1 = new FAdd();
      n1.input("0").connect(n.output("Item"));
      n1.input("1").value = 1;
      n1.output("Val").connect(n.input("Mapped"));
      n.input("Array").value = arr;
      await n.process();

      test3.same(n.output("Array").value, [1, 2, 3, 4]);
      test3.end();
    });

    test2.test(
      "Try to reduce an array to the sum of its elements",
      async (test3) => {
        let n = new AReduce();
        let n1 = new FAdd();

        n1.input("0").connect(n.output("Acc"));
        n1.input("1").connect(n.output("Item"));
        n.input("Acc").connect(n1.output("Val"));
        n.input("Acc0").value = 0;
        n.input("Array").value = [1, 2, 3, 4];

        await n.process();

        test3.same(n.output("Val").value, 10);

        test3.end();
      }
    );

    test2.test("Test must have length of 4", async (test3) => {
      let n = new FALength();
      n.input("Array").value = arr;
      await n.process();

      test3.same(n.output("Val").value, 4);
      test3.end();
    });
    test2.test("Test must have length of 4", async (test3) => {
      let n = new FAGet();
      n.input("Array").value = arr;
      n.input("Index").value = 1;
      await n.process();

      test3.same(n.output("Val").value, 1);
      test3.end();
    });

    test2.end();
  });

  test.end();
});

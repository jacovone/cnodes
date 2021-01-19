import tap from "tap";
import { Types } from "../lib/core/type.js";
import { FAdd } from "../lib/nodes/math/fadd.js";
import { FDiv } from "../lib/nodes/math/fdiv.js";
import { FMul } from "../lib/nodes/math/fmul.js";
import { FSqrt } from "../lib/nodes/math/fsqrt.js";
import { FTofixed } from "../lib/nodes/math/ftofixed.js";

tap.test("Divide 1 by 2 equals to 0.5", async (test) => {
  let n = new FDiv();
  n.input("Val1").value = 1;
  n.input("Val2").value = 2;
  await n.process();

  test.same(n.output("Val").value, 0.5);
  test.end();
});

tap.test("Divide 112 by 2 equals to 56 of type number", async (t) => {
  let n = new FDiv();
  n.input("Val1").value = 112;
  n.input("Val2").value = 2;
  await n.process();

  t.same(n.output("Val").value, 56, "Result is correct");
  t.same(n.output("Val").type, Types.NUMBER, "Type is correct");

  t.end();
});

tap.test("Sum 113 by 12 equals to 125 of type number", async (t) => {
  let n = new FAdd();
  n.input("0").value = 113;
  n.input("1").value = 12;
  await n.process();

  t.same(n.output("Val").value, 125, "Result is correct");
  t.same(n.output("Val").type, Types.NUMBER, "Type is correct");

  t.end();
});

tap.test("Multiply 56 by 10 equals to 560 of type number", async (t) => {
  let n = new FMul();
  n.input("0").value = 56;
  n.input("1").value = 10;
  await n.process();

  t.same(n.output("Val").value, 560, "Result is correct");
  t.same(n.output("Val").type, Types.NUMBER, "Type is correct");

  t.end();
});

tap.test("Square root of 2 at precision 2 is equals to 1.41", async (t) => {
  let n = new FSqrt();
  n.input("Val").value = 2;
  await n.process();

  let n2 = new FTofixed();
  n2.input("Val").value = n.output("Val").value;
  n2.input("Digits").value = 2;
  await n2.process();

  t.same(n2.output("Val").value, 1.41, "Result is correct");
  t.same(n2.output("Val").type, Types.NUMBER, "Type is correct");

  t.end();
});

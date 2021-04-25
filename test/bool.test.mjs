import tap from "tap";
import { Types } from "../src/core/type.mjs";
import { FAnd } from "../src/nodes/bool/fand.mjs";
import { FFalse } from "../src/nodes/bool/ffalse.mjs";
import { FNot } from "../src/nodes/bool/fnot.mjs";
import { FTrue } from "../src/nodes/bool/ftrue.mjs";
import { FOr } from "../src/nodes/bool/f_or.mjs";

tap.test("And true && true equals to true", async (test) => {
  let n = new FAnd();
  n.input("Val1").value = true;
  n.input("Val2").value = true;
  await n.process();

  test.same(n.output("Val").value, true);
  test.end();
});
tap.test("And true && false equals to false", async (test) => {
  let n = new FAnd();
  n.input("Val1").value = true;
  n.input("Val2").value = false;
  await n.process();

  test.same(n.output("Val").value, false);
  test.end();
});
tap.test("And false && true equals to false", async (test) => {
  let n = new FAnd();
  n.input("Val1").value = false;
  n.input("Val2").value = true;
  await n.process();

  test.same(n.output("Val").value, false);
  test.end();
});
tap.test("And false && false equals to false", async (test) => {
  let n = new FAnd();
  n.input("Val1").value = false;
  n.input("Val2").value = false;
  await n.process();

  test.same(n.output("Val").value, false);
  test.end();
});
tap.test("Or true | true equals to true", async (test) => {
  let n = new FOr();
  n.input("Val1").value = true;
  n.input("Val2").value = true;
  await n.process();

  test.same(n.output("Val").value, true);
  test.end();
});
tap.test("Or true | false equals to true", async (test) => {
  let n = new FOr();
  n.input("Val1").value = true;
  n.input("Val2").value = false;
  await n.process();

  test.same(n.output("Val").value, true);
  test.end();
});
tap.test("Or false | true equals to true", async (test) => {
  let n = new FOr();
  n.input("Val1").value = false;
  n.input("Val2").value = true;
  await n.process();

  test.same(n.output("Val").value, true);
  test.end();
});
tap.test("Or false | false equals to false", async (test) => {
  let n = new FOr();
  n.input("Val1").value = false;
  n.input("Val2").value = false;
  await n.process();

  test.same(n.output("Val").value, false);
  test.end();
});
tap.test("Not of false equals to true", async (test) => {
  let n = new FNot();
  n.input("Val").value = false;
  await n.process();

  test.same(n.output("Val").value, true);
  test.end();
});
tap.test("Not of true equals to false", async (test) => {
  let n = new FNot();
  n.input("Val").value = true;
  await n.process();

  test.same(n.output("Val").value, false);
  test.end();
});
tap.test("False equals to false", async (test) => {
  let n = new FFalse();
  await n.process();

  test.same(n.output("Val").value, false);
  test.end();
});
tap.test("True equals to true", async (test) => {
  let n = new FTrue();
  await n.process();

  test.same(n.output("Val").value, true);
  test.end();
});

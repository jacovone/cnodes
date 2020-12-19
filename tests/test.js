import * as cnodes from "../cnodes.js";
import { Env } from "../core/env.js";
import { program, Program } from "../core/program.js";
import { fgteNode } from "../nodes/bool/fgte.js";
import { consoleNode } from "../nodes/console.js";
import { fgetvarNode } from "../nodes/fgetvar.js";
import { ifNode } from "../nodes/if.js";
import { faddNode } from "../nodes/math/fadd.js";
import { setvarNode } from "../nodes/setvar.js";

let ninit = setvarNode();
ninit.input("Name").value = "N";
ninit.input("Val").value = 0;

let ngetvar = fgetvarNode();
ngetvar.input("Name").value = "N";

let nconsole = consoleNode();
nconsole.prev.connect(ninit.next());
nconsole.input("Val").connect(ngetvar.output("Val"));

let nadd = faddNode();
nadd.input("Val1").connect(ngetvar.output("Val"));
nadd.input("Val2").value = 1;

let nSetVar = setvarNode();
nSetVar.input("Name").value = "N";
nSetVar.input("Val").connect(nadd.output("Val"));
nSetVar.prev.connect(nconsole.next());

let ngte = fgteNode();
ngte.input("Val1").connect(ngetvar.output("Val"));
ngte.input("Val2").value = 10;

let nIf = ifNode();
nIf.input("Condition").connect(ngte.output("Val"));
nIf.prev.connect(nSetVar.next());
nIf.next("Else").connect(nconsole.prev);

let prg = program()
  .addNode(ninit)
  .addNode(ngetvar)
  .addNode(nconsole)
  .addNode(nadd)
  .addNode(nSetVar)
  .addNode(ngte)
  .addNode(nIf);

ninit.prev.connect(prg.enter.next("Begin"));

prg.process();

Env.init();
let exp = Env.export(prg);
console.log(JSON.stringify(exp));
// let ppp = Env.import(exp);
// console.log(JSON.stringify(Env.export(ppp)));
// ppp.process();

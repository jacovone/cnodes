/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020-2021
 */

// Import core nodes
import { Env } from "./core/env.mjs";
import { Node } from "./core/node.mjs";
import { Program } from "./core/program.mjs";
import {
  Socket,
  PrevSocket,
  NextSocket,
  InputSocket,
  OutputSocket,
} from "./core/socket.mjs";
import { Types } from "./core/type.mjs";
import { Call } from "./nodes/call.mjs";
import { Console } from "./nodes/console.mjs";
import { Log } from "./nodes/log.mjs";
import { FGetvar } from "./nodes/fgetvar.mjs";
import { For } from "./nodes/for.mjs";
import { Getvar } from "./nodes/getvar.mjs";
import { If } from "./nodes/if.mjs";
import { Setvar } from "./nodes/setvar.mjs";
import { While } from "./nodes/while.mjs";
import { FIf } from "./nodes/fif.mjs";
import { Wait } from "./nodes/wait.mjs";

// Import boolean nodes
import { FCompare } from "./nodes/bool/fcompare.mjs";

// Import string nodes
import { FSConst } from "./nodes/string/fsconst.mjs";
import { FConcat } from "./nodes/string/fconcat.mjs";

// Import math nodes
import { FNConst } from "./nodes/math/fnconst.mjs";
import { FAdd } from "./nodes/math/fadd.mjs";
import { FDiv } from "./nodes/math/fdiv.mjs";
import { FMul } from "./nodes/math/fmul.mjs";
import { FSqrt } from "./nodes/math/fsqrt.mjs";
import { FMod } from "./nodes/math/fmod.mjs";
import { FTofixed } from "./nodes/math/ftofixed.mjs";

// Import arrays nodes
import { APush } from "./nodes/array/apush.mjs";
import { FAConst } from "./nodes/array/faconst.mjs";
import { FAMake } from "./nodes/array/famake.mjs";
import { FAGet } from "./nodes/array/faget.mjs";
import { FALength } from "./nodes/array/falength.mjs";
import { AMap } from "./nodes/array/amap.mjs";
import { FAMap } from "./nodes/array/famap.mjs";
import { AReduce } from "./nodes/array/areduce.mjs";
import { FAReduce } from "./nodes/array/fareduce.mjs";

// Import objects nodes
import { FOMake } from "./nodes/object/fomake.mjs";
import { FOBreak } from "./nodes/object/fobreak.mjs";

export {
  Env,
  Node,
  Program,
  Socket,
  InputSocket,
  OutputSocket,
  PrevSocket,
  NextSocket,
  Types,
  Call,
  Console,
  Log,
  FGetvar,
  For,
  Getvar,
  If,
  Setvar,
  While,
  FIf,
  Wait,
  FCompare,
  FSConst,
  FConcat,
  FNConst,
  FAdd,
  FDiv,
  FMul,
  FSqrt,
  FMod,
  FTofixed,
  APush,
  FAConst,
  FAMake,
  FAGet,
  FALength,
  AMap,
  FAMap,
  AReduce,
  FAReduce,
  FOMake,
  FOBreak,
};

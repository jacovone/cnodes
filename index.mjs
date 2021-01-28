/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020-2021
 */

// Import core nodes
import { Env } from "./src/core/env.mjs";
import { Node } from "./src/core/node.mjs";
import { Program } from "./src/core/program.mjs";
import {
  Socket,
  PrevSocket,
  NextSocket,
  InputSocket,
  OutputSocket,
} from "./src/core/socket.mjs";
import { Types } from "./src/core/type.mjs";
import { Call } from "./src/nodes/call.mjs";
import { Console } from "./src/nodes/console.mjs";
import { Log } from "./src/nodes/log.mjs";
import { FGetvar } from "./src/nodes/fgetvar.mjs";
import { For } from "./src/nodes/for.mjs";
import { Getvar } from "./src/nodes/getvar.mjs";
import { If } from "./src/nodes/if.mjs";
import { Setvar } from "./src/nodes/setvar.mjs";
import { While } from "./src/nodes/while.mjs";
import { FIf } from "./src/nodes/fif.mjs";
import { Wait } from "./src/nodes/wait.mjs";

// Import boolean nodes
import { FCompare } from "./src/nodes/bool/fcompare.mjs";

// Import string nodes
import { FSConst } from "./src/nodes/string/fsconst.mjs";
import { FConcat } from "./src/nodes/string/fconcat.mjs";

// Import math nodes
import { FNConst } from "./src/nodes/math/fnconst.mjs";
import { FAdd } from "./src/nodes/math/fadd.mjs";
import { FDiv } from "./src/nodes/math/fdiv.mjs";
import { FMul } from "./src/nodes/math/fmul.mjs";
import { FSqrt } from "./src/nodes/math/fsqrt.mjs";
import { FMod } from "./src/nodes/math/fmod.mjs";
import { FTofixed } from "./src/nodes/math/ftofixed.mjs";

// Import arrays nodes
import { APush } from "./src/nodes/array/apush.mjs";
import { FAConst } from "./src/nodes/array/faconst.mjs";
import { FAMake } from "./src/nodes/array/famake.mjs";
import { FAGet } from "./src/nodes/array/faget.mjs";
import { FALength } from "./src/nodes/array/falength.mjs";
import { AMap } from "./src/nodes/array/amap.mjs";
import { FAMap } from "./src/nodes/array/famap.mjs";
import { AReduce } from "./src/nodes/array/areduce.mjs";
import { FAReduce } from "./src/nodes/array/fareduce.mjs";

// Import objects nodes
import { FOMake } from "./src/nodes/object/fomake.mjs";
import { FOBreak } from "./src/nodes/object/fobreak.mjs";

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

/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

// Import core nodes
import { Env } from "./src/core/env.js";
import { Node } from "./src/core/node.js";
import { Program } from "./src/core/program.js";
import {
  Socket,
  PrevSocket,
  NextSocket,
  InputSocket,
  OutputSocket,
} from "./src/core/socket.js";
import { Types } from "./src/core/type.js";
import { Call } from "./src/nodes/call.js";
import { Console } from "./src/nodes/console.js";
import { Log } from "./src/nodes/log.js";
import { FGetvar } from "./src/nodes/fgetvar.js";
import { For } from "./src/nodes/for.js";
import { Getvar } from "./src/nodes/getvar.js";
import { If } from "./src/nodes/if.js";
import { Setvar } from "./src/nodes/setvar.js";
import { While } from "./src/nodes/while.js";
import { FIf } from "./src/nodes/fif.js";
import { Wait } from "./src/nodes/wait.js";

// Import boolean nodes
import { FCompare } from "./src/nodes/bool/fcompare.js";

// Import string nodes
import { FSConst } from "./src/nodes/string/fsconst.js";
import { FConcat } from "./src/nodes/string/fconcat.js";

// Import math nodes
import { FNConst } from "./src/nodes/math/fnconst.js";
import { FAdd } from "./src/nodes/math/fadd.js";
import { FDiv } from "./src/nodes/math/fdiv.js";
import { FMul } from "./src/nodes/math/fmul.js";
import { FSqrt } from "./src/nodes/math/fsqrt.js";
import { FMod } from "./src/nodes/math/fmod.js";
import { FTofixed } from "./src/nodes/math/ftofixed.js";

// Import arrays nodes
import { APush } from "./src/nodes/array/apush.js";
import { FAConst } from "./src/nodes/array/faconst.js";
import { FAMake } from "./src/nodes/array/famake.js";
import { FAGet } from "./src/nodes/array/faget.js";
import { FALength } from "./src/nodes/array/falength.js";
import { AMap } from "./src/nodes/array/amap.js";
import { FAMap } from "./src/nodes/array/famap.js";
import { AReduce } from "./src/nodes/array/areduce.js";
import { FAReduce } from "./src/nodes/array/fareduce.js";

// Import objects nodes
import { FOMake } from "./src/nodes/object/fomake.js";
import { FOBreak } from "./src/nodes/object/fobreak.js";

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

/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

// Import core nodes
import { Env } from "./lib/core/env.js";
import { Node } from "./lib/core/node.js";
import { Program } from "./lib/core/program.js";
import { Socket } from "./lib/core/socket.js";
import { Types } from "./lib/core/type.js";
import { Call } from "./lib/nodes/call.js";
import { Console } from "./lib/nodes/console.js";
import { Log } from "./lib/nodes/log.js";
import { FGetvar } from "./lib/nodes/fgetvar.js";
import { For } from "./lib/nodes/for.js";
import { Getvar } from "./lib/nodes/getvar.js";
import { If } from "./lib/nodes/if.js";
import { Setvar } from "./lib/nodes/setvar.js";
import { While } from "./lib/nodes/while.js";
import { FIf } from "./lib/nodes/fif.js";
import { Wait } from "./lib/nodes/wait.js";

// Import boolean nodes
import { FCompare } from "./lib/nodes/bool/fcompare.js";

// Import string nodes
import { FSConst } from "./lib/nodes/string/fsconst.js";
import { FConcat } from "./lib/nodes/string/fconcat.js";

// Import math nodes
import { FNConst } from "./lib/nodes/math/fnconst.js";
import { FAdd } from "./lib/nodes/math/fadd.js";
import { FDiv } from "./lib/nodes/math/fdiv.js";
import { FMul } from "./lib/nodes/math/fmul.js";
import { FSqrt } from "./lib/nodes/math/fsqrt.js";
import { FMod } from "./lib/nodes/math/fmod.js";
import { FTofixed } from "./lib/nodes/math/ftofixed.js";

// Import arrays nodes
import { APush } from "./lib/nodes/array/apush.js";
import { FAConst } from "./lib/nodes/array/faconst.js";
import { FAMake } from "./lib/nodes/array/famake.js";
import { FAGet } from "./lib/nodes/array/faget.js";
import { FALength } from "./lib/nodes/array/falength.js";
import { AMap } from "./lib/nodes/array/amap.js";
import { FAMap } from "./lib/nodes/array/famap.js";
import { AReduce } from "./lib/nodes/array/areduce.js";
import { FAReduce } from "./lib/nodes/array/fareduce.js";

// Import objects nodes
import { FOMake } from "./lib/nodes/object/fomake.js";
import { FOBreak } from "./lib/nodes/object/fobreak.js";

export {
  Env,
  Node,
  Program,
  Socket,
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

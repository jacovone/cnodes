/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

// Export core nodes
export * from "./lib/core/env.js";
export * from "./lib/core/node.js";
export * from "./lib/core/program.js";
export * from "./lib/core/socket.js";
export * from "./lib/core/type.js";
export * from "./lib/nodes/call.js";
export * from "./lib/nodes/console.js";
export * from "./lib/nodes/fgetvar.js";
export * from "./lib/nodes/for.js";
export * from "./lib/nodes/getvar.js";
export * from "./lib/nodes/if.js";
export * from "./lib/nodes/setvar.js";
export * from "./lib/nodes/while.js";

// Export boolean nodes
export * from "./lib/nodes/bool/fcompare.js";

// Export string nodes
export * from "./lib/nodes/string/fsconst.js";
export * from "./lib/nodes/string/fconcat.js";

// Export math nodes
export * from "./lib/nodes/math/fadd.js";
export * from "./lib/nodes/math/fdiv.js";
export * from "./lib/nodes/math/fmul.js";
export * from "./lib/nodes/math/fsqrt.js";

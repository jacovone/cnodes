/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

// Export core nodes
export * from "./src/core/env.js";
export * from "./src/core/node.js";
export * from "./src/core/program.js";
export * from "./src/core/socket.js";
export * from "./src/core/type.js";
export * from "./src/nodes/call.js";
export * from "./src/nodes/console.js";
export * from "./src/nodes/fgetvar.js";
export * from "./src/nodes/for.js";
export * from "./src/nodes/getvar.js";
export * from "./src/nodes/if.js";
export * from "./src/nodes/setvar.js";
export * from "./src/nodes/while.js";

// Export boolean nodes
export * from "./src/nodes/bool/fcompare.js";

// Export math nodes
export * from "./src/nodes/math/fadd.js";
export * from "./src/nodes/math/fdiv.js";
export * from "./src/nodes/math/fmul.js";

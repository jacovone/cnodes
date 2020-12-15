/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

// Export core nodes
export * from "./core/env.js";
export * from "./core/node.js";
export * from "./core/program.js";
export * from "./core/socket.js";
export * from "./core/type.js";
export * from "./nodes/call.js";
export * from "./nodes/console.js";
export * from "./nodes/fgetvar.js";
export * from "./nodes/for.js";
export * from "./nodes/getvar.js";
export * from "./nodes/if.js";
export * from "./nodes/setvar.js";
export * from "./nodes/while.js";

// Export boolean nodes
export * from "./nodes/bool/fcompare.js";

// Export math nodes
export * from "./nodes/math/fadd.js";
export * from "./nodes/math/fdiv.js";
export * from "./nodes/math/fmul.js";

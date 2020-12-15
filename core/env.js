/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

import { callNode } from "../nodes/call.js";
import { consoleNode } from "../nodes/console.js";
import { fgetvarNode } from "../nodes/fgetvar.js";
import { forNode } from "../nodes/for.js";
import { getvarNode } from "../nodes/getvar.js";
import { setvarNode } from "../nodes/setvar.js";
import { whileNode } from "../nodes/while.js";
import { ifNode } from "../nodes/if.js";

import { faddNode } from "../nodes/math/fadd.js";
import { fdivNode } from "../nodes/math/fdiv.js";
import { fmulNode } from "../nodes/math/fmul.js";

import { fcompareNode } from "../nodes/bool/fcompare.js";

/**
 * This class representa a main global environmento for cnodes.
 * The class is a "stati" class that is responible for maintaining a global
 * registry of registered nodes. A node registration is a object with three fields: a node name,
 * a category name and a factory, a that returns a new instance for that node.
 * The global Env instance must be initialized one-time by calling the Env.init() method,
 * this method register all built-in nodes.
 */
export class Env {
  static #nodeRegistry = new Map();

  /**
   * Initialize the CNodes global environment
   */
  static init() {
    // Core nodes
    Env.registerNode("call", "Core", callNode);
    Env.registerNode("console", "Core", consoleNode);
    Env.registerNode("fgetvar", "Core", fgetvarNode);
    Env.registerNode("for", "Core", forNode);
    Env.registerNode("getvar", "Core", getvarNode);
    Env.registerNode("if", "Core", ifNode);
    Env.registerNode("setvar", "Core", setvarNode);
    Env.registerNode("while", "Core", whileNode);

    // Math nodes
    Env.registerNode("fadd", "Math", faddNode);
    Env.registerNode("fdiv", "Math", fdivNode);
    Env.registerNode("fmul", "Math", fmulNode);

    // Boolean Nodes
    Env.registerNode("fcompare", "Boolean", fcompareNode);
  }

  /**
   * Register a node type
   * @param {*} name The name of the node
   * @param {*} category The category of the node
   * @param {*} factory A
   */
  static registerNode(name, category, factory) {
    Env.#nodeRegistry.set(name, { category: category, factory: factory });
  }

  /**
   * Return the list of unique registered categories
   */
  static getCategories() {
    let categoryMap = new Map();
    Array.from(this.#nodeRegistry.values()).forEach((element) => {
      categoryMap.set(element.category, 0);
    });
    return Array.from(categoryMap.keys());
  }

  /**
   * Return an array of registrations for nodes.
   * Registrations have the sign: {name, category, factory}
   * @param {*} category The category for which seacrh registrations
   */
  static getCategoryNodes(category) {
    let registrations = [];
    Array.from(this.#nodeRegistry.entries()).forEach((entry) => {
      if (entry[1].category === category) {
        registrations.push({
          name: entry[0],
          category: entry[1].category,
          factory: entry[1].factory,
        });
      }
    });
    return registrations;
  }

  /**
   * Instantiate a node by name
   * @param {*} name The name of the node
   */
  static getInstance(name) {
    let reg = this.#nodeRegistry.get(name);
    if (reg) {
      return reg.factory();
    } else {
      return null;
    }
  }
}

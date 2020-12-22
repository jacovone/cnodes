/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

import { enterNode } from "./enter.js";
import { exitNode } from "./exit.js";

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

import { fequalNode } from "../nodes/bool/fequal.js";
import { fgtNode } from "../nodes/bool/fgt.js";
import { fgteNode } from "../nodes/bool/fgte.js";
import { fltNode } from "../nodes/bool/flt.js";
import { flteNode } from "../nodes/bool/flte.js";
import { fnotequalNode } from "../nodes/bool/fnotequal.js";

import { Program } from "./program.js";
import {
  InputSocket,
  NextSocket,
  OutputSocket,
  PrevSocket,
  Socket,
} from "./socket.js";
import { Node } from "./node.js";
import { Type } from "./type.js";

/**
 * This class represents a main global environment for cnodes.
 * The class is a "static" class that is responible for maintaining a global
 * registry of registered nodes. A node registration is a object with three fields: a node name,
 * a category name and a factory, that returns a new instance for that node.
 * The global Env instance must be initialized one-time by calling the Env.init() method,
 * this method register all built-in nodes. Eventual custom nodes must be registered manually
 * via Env.registerNode(name, category, factory).
 */
export class Env {
  static #nodeRegistry = new Map();

  /**
   * Initialize the CNodes global environment
   */
  static init() {
    Env.#nodeRegistry = new Map();

    // Core nodes
    Env.registerNode("Call", "Core", callNode);
    Env.registerNode("Console", "Core", consoleNode);
    Env.registerNode("FGetvar", "Core", fgetvarNode);
    Env.registerNode("For", "Core", forNode);
    Env.registerNode("Getvar", "Core", getvarNode);
    Env.registerNode("If", "Core", ifNode);
    Env.registerNode("Setvar", "Core", setvarNode);
    Env.registerNode("While", "Core", whileNode);
    Env.registerNode("Enter", "Core", enterNode);
    Env.registerNode("Exit", "Core", exitNode);

    // Math nodes
    Env.registerNode("FAdd", "Math", faddNode);
    Env.registerNode("FDiv", "Math", fdivNode);
    Env.registerNode("FMul", "Math", fmulNode);

    // Boolean Nodes
    Env.registerNode("FEqual", "Boolean", fequalNode);
    Env.registerNode("FGT", "Boolean", fgtNode);
    Env.registerNode("FGTE", "Boolean", fgteNode);
    Env.registerNode("FLT", "Boolean", fltNode);
    Env.registerNode("FLTE", "Boolean", flteNode);
    Env.registerNode("FNotEqual", "Boolean", fnotequalNode);
  }

  /**
   * Register a node type
   * @param {string} name The name of the node
   * @param {string} category The category of the node
   * @param {any} factory A class that instantiate the node
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
   * @param {string} category The category for which seacrh registrations
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
   * @param {string} name The name of the node
   */
  static getInstance(name) {
    let reg = this.#nodeRegistry.get(name);
    if (reg) {
      return reg.factory();
    } else {
      return null;
    }
  }

  /**
   * Creates and returns a JSON representation of the entire program
   * @param {Program} program The program to export
   */
  static export(program) {
    let exp = {
      id: program.id,
      version: Program.version,
      lastNodeIndex: Node.lastNodeIdIndex,
      lastSocketIndex: Socket.lastSocketIdIndex,
      enter: program.enter.id,
      exit: program.exit.id,
      nodes: [],
      connections: [],
    };

    for (let node of program.nodes) {
      let nodeExp = {
        id: node.id,
        name: node.name,
        functional: node.functional,
        meta: node.meta,
        inputs: node.inputs.map((inp) => {
          return {
            id: inp.id,
            name: inp.name,
            node: null,
            type: { type: inp.type.type, isArray: inp.type.isArray },
            value: inp.value,
            peer: null,
          };
        }),
        outputs: node.outputs.map((outp) => {
          return {
            id: outp.id,
            name: outp.name,
            node: null,
            type: { type: outp.type.type, isArray: outp.type.isArray },
            value: outp.value,
            peers: [],
          };
        }),
        prev: !node.prev
          ? null
          : {
              id: node.prev.id,
              name: node.prev.name,
              node: null,
              peers: [],
            },
        nexts: node.nexts.map((next) => {
          return {
            id: next.id,
            name: next.name,
            node: null,
            peer: null,
          };
        }),
      };

      exp.nodes.push(nodeExp);
    }

    /**
     * Define a inner-function that prevent duplicates connections
     * @param {any} connection The connection to push
     */
    function pushConnection(connection) {
      if (
        exp.connections.findIndex(
          (c) =>
            c.type === connection.type &&
            c.sourceNode === connection.sourceNode &&
            c.sourceSocket === connection.sourceSocket &&
            c.targetNode === connection.targetNode &&
            c.targetSocket === connection.targetSocket
        ) === -1
      ) {
        exp.connections.push(connection);
      }
    }

    for (let node of program.nodes) {
      if (node.prev && node.prev.peers && node.prev.peers.length > 0) {
        for (let peer of node.prev.peers) {
          let connectionExp = {
            type: "pn",
            sourceNode: peer.node.id,
            sourceSocket: peer.id,
            targetNode: node.id,
            targetSocket: node.prev.id,
          };
          pushConnection(connectionExp);
        }
      }
      for (let inp of node.inputs) {
        if (inp.peer) {
          let connectionExp = {
            type: "io",
            sourceNode: inp.peer.node.id,
            sourceSocket: inp.peer.id,
            targetNode: node.id,
            targetSocket: inp.id,
          };
          pushConnection(connectionExp);
        }
      }
      for (let outp of node.outputs) {
        for (let peer of outp.peers) {
          if (peer) {
            let connectionExp = {
              type: "io",
              sourceNode: node.id,
              sourceSocket: outp.id,
              targetNode: peer.node.id,
              targetSocket: peer.id,
            };
            pushConnection(connectionExp);
          }
        }
      }
      for (let next of node.nexts) {
        if (next.peer) {
          let connectionExp = {
            type: "pn",
            sourceNode: node.id,
            sourceSocket: next.id,
            targetNode: next.peer.node.id,
            targetSocket: next.peer.id,
          };
          pushConnection(connectionExp);
        }
      }
    }

    return exp;
  }

  /**
   * Create a program instance based on export data created with export() method
   * @param {any} data A object with the export data format
   */
  static import(data) {
    if (data.version !== 1) {
      throw new Error("Imported data must have version 1");
    }

    let p = new Program();

    // Removes enter and exit auto-nodes, these
    // will be re-created by import procedure
    p.removeNode(p.enter);
    p.removeNode(p.exit);

    Program.version = data.version;

    // Now import nodes without connections
    for (let nodeData of data.nodes) {
      let node = Env.getInstance(nodeData.name);

      // Delete default sockets (created by getInstance())
      node.inputs = [];
      node.outputs = [];
      node.prev = null;
      node.nexts = [];

      if (!node) {
        throw new Error(`Node type '${nodeData.name}' is not registered`);
      }
      node.id = nodeData.id;
      node.functional = nodeData.functional;
      node.meta = nodeData.meta;
      for (let inpData of nodeData.inputs) {
        let inp = new InputSocket(
          inpData.name,
          node,
          new Type(inpData.type.type, inpData.type.isArray),
          inpData.value
        );
        inp.id = inpData.id;
        node.inputs.push(inp);
      }
      for (let outpData of nodeData.outputs) {
        let outp = new OutputSocket(
          outpData.name,
          node,
          new Type(outpData.type.type, outpData.type.isArray),
          outpData.value
        );
        outp.id = outpData.id;
        node.outputs.push(outp);
      }
      if (nodeData.prev) {
        let prev = new PrevSocket(nodeData.prev.name, node);
        prev.id = nodeData.prev.id;
        node.prev = prev;
      }
      for (let nextData of nodeData.nexts) {
        let next = new NextSocket(nextData.name, node);
        next.id = nextData.id;
        node.nexts.push(next);
      }

      p.addNode(node);
    }

    p.enter = p.nodes.find((n) => n.id === data.enter);
    p.exit = p.nodes.find((n) => n.id === data.exit);

    // Now import connections
    for (let connectionData of data.connections) {
      let sourceNode = p.nodes.find((n) => n.id === connectionData.sourceNode);
      let targetNode = p.nodes.find((n) => n.id === connectionData.targetNode);

      let sourceSocket =
        connectionData.type === "pn"
          ? sourceNode.nexts.find((n) => n.id === connectionData.sourceSocket)
          : sourceNode.outputs.find(
              (o) => o.id === connectionData.sourceSocket
            );
      let targetSocket =
        connectionData.type === "pn"
          ? targetNode.prev
          : targetNode.inputs.find((i) => i.id === connectionData.targetSocket);

      sourceSocket.connect(targetSocket);
    }

    // These two static variable must be assigned at the end because
    // the new InputSocket(), new OutputSocket(), ... increment it during
    // the import phase
    Node.lastNodeIdIndex = data.lastNodeIndex;
    Socket.lastSocketIdIndex = data.lastSocketIndex;

    return p;
  }
}

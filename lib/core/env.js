/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

import { program, Program } from "./program.js";
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
import { apushNode } from "../nodes/array/apush.js";
import { faconstNode } from "../nodes/array/faconst.js";
import { famakeNode } from "../nodes/array/famake.js";
import { fagetNode } from "../nodes/array/faget.js";
import { falengthNode } from "../nodes/array/falength.js";
import { faddNode } from "../nodes/math/fadd.js";
import { fdivNode } from "../nodes/math/fdiv.js";
import { fmulNode } from "../nodes/math/fmul.js";
import { fsqrtNode } from "../nodes/math/fsqrt.js";
import { fequalNode } from "../nodes/bool/fequal.js";
import { fgtNode } from "../nodes/bool/fgt.js";
import { fgteNode } from "../nodes/bool/fgte.js";
import { fltNode } from "../nodes/bool/flt.js";
import { flteNode } from "../nodes/bool/flte.js";
import { fnotequalNode } from "../nodes/bool/fnotequal.js";
import {
  InputSocket,
  NextSocket,
  OutputSocket,
  PrevSocket,
  Socket,
} from "./socket.js";
import { Node } from "./node.js";
import { fsconstNode } from "../nodes/string/fsconst.js";
import { fconcatNode } from "../nodes/string/fconcat.js";
import { fmodNode } from "../nodes/math/fmod.js";
import { fifNode } from "../nodes/fif.js";
import { fnconstNode } from "../nodes/math/fnconst.js";
import { FOMake, fomakeNode } from "../nodes/object/fomake.js";
import { FOBreak, fobreakNode } from "../nodes/object/fobreak.js";
import { amapNode } from "../nodes/array/amap.js";
import { areduceNode } from "../nodes/array/areduce.js";
import { famapNode } from "../nodes/array/famap.js";
import { Types } from "./type.js";
import { fareduceNode } from "../nodes/array/fareduce.js";

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

    Env.registerNode("Program", "Core", program);
    Env.registerNode("Call", "Core", callNode);
    Env.registerNode("Console", "Core", consoleNode);
    Env.registerNode("FGetvar", "Core", fgetvarNode);
    Env.registerNode("For", "Core", forNode);
    Env.registerNode("Getvar", "Core", getvarNode);
    Env.registerNode("If", "Core", ifNode);
    Env.registerNode("FIf", "Core", fifNode);
    Env.registerNode("Setvar", "Core", setvarNode);
    Env.registerNode("While", "Core", whileNode);
    Env.registerNode("Enter", "Core", enterNode);
    Env.registerNode("Exit", "Core", exitNode);

    // String nodes
    Env.registerNode("FSConst", "String", fsconstNode);
    Env.registerNode("FConcat", "String", fconcatNode);

    // Math nodes
    Env.registerNode("FNConst", "Math", fnconstNode);
    Env.registerNode("FAdd", "Math", faddNode);
    Env.registerNode("FDiv", "Math", fdivNode);
    Env.registerNode("FMod", "Math", fmodNode);
    Env.registerNode("FMul", "Math", fmulNode);
    Env.registerNode("FSqrt", "Math", fsqrtNode);

    // Boolean Nodes
    Env.registerNode("FEqual", "Boolean", fequalNode);
    Env.registerNode("FGT", "Boolean", fgtNode);
    Env.registerNode("FGTE", "Boolean", fgteNode);
    Env.registerNode("FLT", "Boolean", fltNode);
    Env.registerNode("FLTE", "Boolean", flteNode);
    Env.registerNode("FNotEqual", "Boolean", fnotequalNode);

    // Arrays Nodes
    Env.registerNode("APush", "Arrays", apushNode);
    Env.registerNode("FAConst", "Arrays", faconstNode);
    Env.registerNode("FAMake", "Arrays", famakeNode);
    Env.registerNode("FAGet", "Arrays", fagetNode);
    Env.registerNode("FALength", "Arrays", falengthNode);
    Env.registerNode("AMap", "Arrays", amapNode);
    Env.registerNode("FAMap", "Arrays", famapNode);
    Env.registerNode("AReduce", "Arrays", areduceNode);
    Env.registerNode("FAReduce", "Arrays", fareduceNode);

    // Object Nodes
    Env.registerNode("FOMake", "Objects", fomakeNode);
    Env.registerNode("FOBreak", "Objects", fobreakNode);
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
   * Create helper maker nodes to support user with dealing with
   * specific object structures. This method accepts optional
   * options that let you specify what exactly create:
   * {
   *   recursive: true,
   *   fillValues: true,
   *   forceTypes: true
   *   editableInputs: true
   * }
   *
   * @param {any} obj The object structure to consider whiel create nodes
   * @param {any} opts The options on create nodes
   */
  static registerMaker(name, obj, opts = {}) {
    /**
     * This function will be registered as creator for
     * instances of the OMake node for the user object
     */
    let createMake = function () {
      let makeNode = new FOMake();
      makeNode.title = name;
      makeNode.inputs = [];

      for (let field in obj) {
        let is = new InputSocket(field, makeNode, Types.ANY, 0);

        if (opts.editableInputs) {
          is.canEditName = true;
          is.canEditType = true;
        }

        switch (typeof obj[field]) {
          case "string":
            is.type = opts.forceTypes ? Types.STRING : Types.ANY;
            is.value = opts.fillValues ? obj[field] : "";
            break;
          case "number":
            is.type = opts.forceTypes ? Types.NUMBER : Types.ANY;
            is.value = opts.fillValues ? obj[field] : opts.forceTypes ? 0 : "";
            break;
          case "boolean":
            is.type = opts.forceTypes ? Types.BOOLEAN : Types.ANY;
            is.value = opts.fillValues
              ? obj[field]
              : opts.forceTypes
              ? false
              : "";
            break;
          case "object":
            if (obj[field] instanceof Array) {
              is.type = opts.forceTypes ? Types.ARRAY : Types.ANY;
              is.value = opts.fillValues
                ? obj[field]
                : opts.forceTypes
                ? []
                : "";
            } else if (obj[field] instanceof Object) {
              is.type = opts.forceTypes ? Types.OBJECT : Types.ANY;
              is.value = opts.fillValues
                ? obj[field]
                : opts.forceTypes
                ? {}
                : "";
            } else {
              throw new Error("Unknown field type: " + field);
            }
            break;
          default:
            throw new Error("Unknown field type: " + field);
        }
        makeNode.inputs.push(is);
      }

      return makeNode;
    };

    // Reigister factory objects
    Env.registerNode(name, "Custom", createMake);

    if (opts.recursive) {
      for (let field in obj) {
        if (typeof obj[field] === "object" && !(obj[field] instanceof Array)) {
          Env.registerMaker(name + "." + field, obj[field], opts);
        }
      }
    }
  }

  /**
   * Create helper breaker nodes to support user with dealing with
   * specific object structures. This method accepts optional
   * options that let you specify what exactly create:
   * {
   *   recursive: true,
   *   forceTypes: true,
   *   editableOutputs: true
   * }
   *
   * @param {any} obj The object structure to consider whiel create nodes
   * @param {any} opts The options on create nodes
   */
  static registerBreaker(name, obj, opts = {}) {
    /**
     * This function will be registered as creator for
     * instances of the OBreak node for the user object
     */
    let createBreak = function () {
      let breakNode = new FOBreak();
      breakNode.title = name;
      breakNode.outputs = [];

      for (let field in obj) {
        let os = new OutputSocket(field, breakNode, Types.ANY, 0);
        if (opts.editableOutputs) {
          os.canEditName = true;
          os.canEditType = true;
        }

        switch (typeof obj[field]) {
          case "string":
            os.type = opts.forceTypes ? Types.STRING : Types.ANY;
            break;
          case "number":
            os.type = opts.forceTypes ? Types.NUMBER : Types.ANY;
            break;
          case "boolean":
            os.type = opts.forceTypes ? Types.BOOLEAN : Types.ANY;
            break;
          case "object":
            if (obj[field] instanceof Array) {
              os.type = opts.forceTypes ? Types.ARRAY : Types.ANY;
            } else if (obj[field] instanceof Object) {
              os.type = opts.forceTypes ? Types.OBJECT : Types.ANY;
            } else {
              throw new Error("Unknown field type: " + field);
            }
            break;
          default:
            throw new Error("Unknown field type: " + field);
        }
        breakNode.outputs.push(os);
      }

      return breakNode;
    };

    // Reigister factory objects
    Env.registerNode(name, "Custom", createBreak);

    if (opts.recursive) {
      for (let field in obj) {
        if (typeof obj[field] === "object" && !(obj[field] instanceof Array)) {
          Env.registerBreaker(name + "." + field, obj[field], opts);
        }
      }
    }
  }

  /**
   * Create both helper maker and breaker nodes to support user with dealing with
   * specific object structures. This method accepts optional
   * options that let you specify what exactly create:
   * {
   *   recursive: true,
   *   fillValues: true,
   *   forceTypes: true,
   *   editableInputs: true
   *   editableOutputs: true
   * }
   *
   * @param {any} obj The object structure to consider whiel create nodes
   * @param {any} opts The options on create nodes
   */
  static registerObject(name, obj, opts = {}) {
    Env.registerMaker("Make " + name, obj, opts);
    Env.registerBreaker("Break " + name, obj, opts);
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
        title: node.title,
        functional: node.functional,
        meta: node.meta,
        program: node instanceof Program ? Env.export(node) : undefined,
        inputs: node.inputs.map((inp) => {
          return {
            id: inp.id,
            name: inp.name,
            node: null,
            type: inp.type,
            value: inp.value,
            canEditName: inp.canEditName,
            peer: null,
          };
        }),
        outputs: node.outputs.map((outp) => {
          return {
            id: outp.id,
            name: outp.name,
            node: null,
            type: outp.type,
            value: outp.value,
            cached: outp.cached,
            canEditName: outp.canEditName,
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
      let node;

      // If this node is a program node, let the import
      // procedure to create the node
      if (nodeData.program) {
        node = Env.import(nodeData.program);
      } else {
        // Otherwise import the node
        node = Env.getInstance(nodeData.name);
      }
      // Delete default sockets (created by getInstance())
      node.inputs = [];
      node.outputs = [];
      node.prev = null;
      node.nexts = [];

      if (!node) {
        throw new Error(`Node type '${nodeData.name}' is not registered`);
      }
      node.title = nodeData.title;
      node.id = nodeData.id;
      node.functional = nodeData.functional;
      node.meta = nodeData.meta;
      for (let inpData of nodeData.inputs) {
        let inp = new InputSocket(
          inpData.name,
          node,
          inpData.type,
          inpData.value
        );
        inp.id = inpData.id;
        inp.canEditName = inpData.canEditName;
        node.inputs.push(inp);
      }
      for (let outpData of nodeData.outputs) {
        let outp = new OutputSocket(
          outpData.name,
          node,
          outpData.type,
          outpData.value,
          outpData.cached
        );
        outp.canEditName = outpData.canEditName;
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

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Env = undefined;

var _program = require("./program.js");

var _enter = require("./enter.js");

var _exit = require("./exit.js");

var _call = require("../nodes/call.js");

var _console = require("../nodes/console.js");

var _fgetvar = require("../nodes/fgetvar.js");

var _for = require("../nodes/for.js");

var _getvar = require("../nodes/getvar.js");

var _setvar = require("../nodes/setvar.js");

var _while = require("../nodes/while.js");

var _if = require("../nodes/if.js");

var _apush = require("../nodes/array/apush.js");

var _faconst = require("../nodes/array/faconst.js");

var _famake = require("../nodes/array/famake.js");

var _faget = require("../nodes/array/faget.js");

var _falength = require("../nodes/array/falength.js");

var _fadd = require("../nodes/math/fadd.js");

var _fdiv = require("../nodes/math/fdiv.js");

var _fmul = require("../nodes/math/fmul.js");

var _fsqrt = require("../nodes/math/fsqrt.js");

var _fequal = require("../nodes/bool/fequal.js");

var _fgt = require("../nodes/bool/fgt.js");

var _fgte = require("../nodes/bool/fgte.js");

var _flt = require("../nodes/bool/flt.js");

var _flte = require("../nodes/bool/flte.js");

var _fnotequal = require("../nodes/bool/fnotequal.js");

var _socket = require("./socket.js");

var _node = require("./node.js");

var _fsconst = require("../nodes/string/fsconst.js");

var _fconcat = require("../nodes/string/fconcat.js");

var _fmod = require("../nodes/math/fmod.js");

var _fif = require("../nodes/fif.js");

var _fnconst = require("../nodes/math/fnconst.js");

var _fomake = require("../nodes/object/fomake.js");

var _fobreak = require("../nodes/object/fobreak.js");

var _amap = require("../nodes/array/amap.js");

var _areduce = require("../nodes/array/areduce.js");

var _famap = require("../nodes/array/famap.js");

var _type = require("./type.js");

var _fareduce = require("../nodes/array/fareduce.js");

var _log = require("../nodes/log.js");

var _ftofixed = require("../nodes/math/ftofixed.js");

var _wait = require("../nodes/wait.js");

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

/**
 * This class represents a main global environment for cnodes.
 * The class is a "static" class that is responible for maintaining a global
 * registry of registered nodes. A node registration is a object with three fields: a node name,
 * a category name and a factory, that returns a new instance for that node.
 * The global Env instance must be initialized one-time by calling the Env.init() method,
 * this method register all built-in nodes. Eventual custom nodes must be registered manually
 * via Env.registerNode(name, category, factory).
 */
class Env {
  /** The internal node registry */

  /**
   * Initialize the CNodes global environment
   */
  static init() {
    _classStaticPrivateFieldSpecSet(Env, Env, _nodeRegistry, new Map()); // Core nodes


    Env.registerNode("Program", "Core", _program.Program.instance);
    Env.registerNode("Call", "Core", _call.Call.instance);
    Env.registerNode("Console", "Core", _console.Console.instance);
    Env.registerNode("Log", "Core", _log.Log.instance);
    Env.registerNode("FGetvar", "Core", _fgetvar.FGetvar.instance);
    Env.registerNode("For", "Core", _for.For.instance);
    Env.registerNode("Getvar", "Core", _getvar.Getvar.instance);
    Env.registerNode("If", "Core", _if.If.instance);
    Env.registerNode("FIf", "Core", _fif.FIf.instance);
    Env.registerNode("Setvar", "Core", _setvar.Setvar.instance);
    Env.registerNode("While", "Core", _while.While.instance);
    Env.registerNode("Enter", "Core", _enter.Enter.instance);
    Env.registerNode("Exit", "Core", _exit.Exit.instance);
    Env.registerNode("Wait", "Core", _wait.Wait.instance); // String nodes

    Env.registerNode("FSConst", "String", _fsconst.FSConst.instance);
    Env.registerNode("FConcat", "String", _fconcat.FConcat.instance); // Math nodes

    Env.registerNode("FNConst", "Math", _fnconst.FNConst.instance);
    Env.registerNode("FAdd", "Math", _fadd.FAdd.instance);
    Env.registerNode("FDiv", "Math", _fdiv.FDiv.instance);
    Env.registerNode("FMod", "Math", _fmod.FMod.instance);
    Env.registerNode("FMul", "Math", _fmul.FMul.instance);
    Env.registerNode("FSqrt", "Math", _fsqrt.FSqrt.instance);
    Env.registerNode("FTofixed", "Math", _ftofixed.FTofixed.instance); // Boolean Nodes

    Env.registerNode("FEqual", "Boolean", _fequal.FEqual.instance);
    Env.registerNode("FGT", "Boolean", _fgt.FGT.instance);
    Env.registerNode("FGTE", "Boolean", _fgte.FGTE.instance);
    Env.registerNode("FLT", "Boolean", _flt.FLT.instance);
    Env.registerNode("FLTE", "Boolean", _flte.FLTE.instance);
    Env.registerNode("FNotEqual", "Boolean", _fnotequal.FNotEqual.instance); // Arrays Nodes

    Env.registerNode("APush", "Arrays", _apush.APush.instance);
    Env.registerNode("FAConst", "Arrays", _faconst.FAConst.instance);
    Env.registerNode("FAMake", "Arrays", _famake.FAMake.instance);
    Env.registerNode("FAGet", "Arrays", _faget.FAGet.instance);
    Env.registerNode("FALength", "Arrays", _falength.FALength.instance);
    Env.registerNode("AMap", "Arrays", _amap.AMap.instance);
    Env.registerNode("FAMap", "Arrays", _famap.FAMap.instance);
    Env.registerNode("AReduce", "Arrays", _areduce.AReduce.instance);
    Env.registerNode("FAReduce", "Arrays", _fareduce.FAReduce.instance); // Object Nodes

    Env.registerNode("FOMake", "Objects", _fomake.FOMake.instance);
    Env.registerNode("FOBreak", "Objects", _fobreak.FOBreak.instance);
  }
  /**
   * Register a node type
   * @param {string} description The name of the node
   * @param {string} category The category of the node
   * @param {any} factory A function that instantiate the node
   */


  static registerNode(description, category, factory) {
    let inst = factory();

    _classStaticPrivateFieldSpecGet(Env, Env, _nodeRegistry).set(inst.name, {
      description,
      category,
      factory
    });
  }
  /**
   * Return the list of unique registered categories
   */


  static getCategories() {
    let categoryMap = new Map();
    Array.from(_classStaticPrivateFieldSpecGet(this, Env, _nodeRegistry).values()).forEach(element => {
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
    Array.from(_classStaticPrivateFieldSpecGet(this, Env, _nodeRegistry).entries()).forEach(entry => {
      if (entry[1].category === category) {
        registrations.push({
          name: entry[0],
          category: entry[1].category,
          description: entry[1].description,
          factory: entry[1].factory
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
    let reg = _classStaticPrivateFieldSpecGet(this, Env, _nodeRegistry).get(name);

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
      let makeNode = new _fomake.FOMake();
      makeNode.name = makeNode.name + "::" + name;
      makeNode.title = name;
      makeNode.inputs = [];

      for (let field in obj) {
        let is = new _socket.InputSocket(field, makeNode, _type.Types.ANY, 0);

        if (opts.editableInputs) {
          is.canEditName = true;
          is.canEditType = true;
        }

        switch (typeof obj[field]) {
          case "string":
            is.type = opts.forceTypes ? _type.Types.STRING : _type.Types.ANY;
            is.value = opts.fillValues ? obj[field] : "";
            break;

          case "number":
            is.type = opts.forceTypes ? _type.Types.NUMBER : _type.Types.ANY;
            is.value = opts.fillValues ? obj[field] : opts.forceTypes ? 0 : "";
            break;

          case "boolean":
            is.type = opts.forceTypes ? _type.Types.BOOLEAN : _type.Types.ANY;
            is.value = opts.fillValues ? obj[field] : opts.forceTypes ? false : "";
            break;

          case "object":
            if (obj[field] instanceof Array) {
              is.type = opts.forceTypes ? _type.Types.ARRAY : _type.Types.ANY;
              is.value = opts.fillValues ? obj[field] : opts.forceTypes ? [] : "";
            } else if (obj[field] instanceof Object) {
              is.type = opts.forceTypes ? _type.Types.OBJECT : _type.Types.ANY;
              is.value = opts.fillValues ? obj[field] : opts.forceTypes ? {} : "";
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
    }; // Reigister factory objects


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
      let breakNode = new _fobreak.FOBreak();
      breakNode.name = breakNode.name + "::" + name;
      breakNode.title = name;
      breakNode.outputs = [];

      for (let field in obj) {
        let os = new _socket.OutputSocket(field, breakNode, _type.Types.ANY, 0);

        if (opts.editableOutputs) {
          os.canEditName = true;
          os.canEditType = true;
        }

        switch (typeof obj[field]) {
          case "string":
            os.type = opts.forceTypes ? _type.Types.STRING : _type.Types.ANY;
            break;

          case "number":
            os.type = opts.forceTypes ? _type.Types.NUMBER : _type.Types.ANY;
            break;

          case "boolean":
            os.type = opts.forceTypes ? _type.Types.BOOLEAN : _type.Types.ANY;
            break;

          case "object":
            if (obj[field] instanceof Array) {
              os.type = opts.forceTypes ? _type.Types.ARRAY : _type.Types.ANY;
            } else if (obj[field] instanceof Object) {
              os.type = opts.forceTypes ? _type.Types.OBJECT : _type.Types.ANY;
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
    }; // Reigister factory objects


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
      version: _program.Program.version,
      lastNodeIndex: _node.Node.lastNodeIdIndex,
      lastSocketIndex: _socket.Socket.lastSocketIdIndex,
      enter: program.enter.id,
      exit: program.exit.id,
      nodes: [],
      connections: []
    };

    for (let node of program.nodes) {
      let nodeExp = {
        id: node.id,
        name: node.name,
        title: node.title,
        functional: node.functional,
        meta: JSON.parse(JSON.stringify(node.meta)),
        program: node instanceof _program.Program ? Env.export(node) : undefined,
        inputs: node.inputs.map(inp => {
          return {
            id: inp.id,
            name: inp.name,
            node: null,
            type: inp.type,
            value: inp.value,
            canEditName: inp.canEditName,
            canEditType: inp.canEditType,
            peer: null
          };
        }),
        outputs: node.outputs.map(outp => {
          return {
            id: outp.id,
            name: outp.name,
            node: null,
            type: outp.type,
            value: outp.value,
            cached: outp.cached,
            canEditName: outp.canEditName,
            canEditType: outp.canEditType,
            peers: []
          };
        }),
        prev: !node.prev ? null : {
          id: node.prev.id,
          name: node.prev.name,
          node: null,
          peers: []
        },
        nexts: node.nexts.map(next => {
          return {
            id: next.id,
            name: next.name,
            node: null,
            peer: null
          };
        })
      };
      exp.nodes.push(nodeExp);
    }
    /**
     * Define a inner-function that prevent duplicates connections
     * @param {any} connection The connection to push
     */


    function pushConnection(connection) {
      if (exp.connections.findIndex(c => c.type === connection.type && c.sourceNode === connection.sourceNode && c.sourceSocket === connection.sourceSocket && c.targetNode === connection.targetNode && c.targetSocket === connection.targetSocket) === -1) {
        exp.connections.push(connection);
      }
    }

    for (let node of program.nodes) {
      if (node.prev?.peers?.length > 0) {
        for (let peer of node.prev.peers) {
          let connectionExp = {
            type: "pn",
            sourceNode: peer.node.id,
            sourceSocket: peer.id,
            targetNode: node.id,
            targetSocket: node.prev.id
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
            targetSocket: inp.id
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
              targetSocket: peer.id
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
            targetSocket: next.peer.id
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

    let p = new _program.Program(); // Removes enter and exit auto-nodes, these
    // will be re-created by import procedure

    p.removeNode(p.enter);
    p.removeNode(p.exit);
    _program.Program.version = data.version; // Now import nodes without connections

    for (let nodeData of data.nodes) {
      let node; // If this node is a program node, let the import
      // procedure to create the node

      if (nodeData.program) {
        node = Env.import(nodeData.program);
      } else {
        // Otherwise import the node
        node = Env.getInstance(nodeData.name);
      } // Delete default sockets (created by getInstance())


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
      node.meta = JSON.parse(JSON.stringify(nodeData.meta));

      for (let inpData of nodeData.inputs) {
        let inp = new _socket.InputSocket(inpData.name, node, inpData.type, inpData.value);
        inp.id = inpData.id;
        inp.canEditName = inpData.canEditName;
        node.inputs.push(inp);
      }

      for (let outpData of nodeData.outputs) {
        let outp = new _socket.OutputSocket(outpData.name, node, outpData.type, outpData.value, outpData.cached);
        outp.canEditName = outpData.canEditName;
        outp.id = outpData.id;
        node.outputs.push(outp);
      }

      if (nodeData.prev) {
        let prev = new _socket.PrevSocket(nodeData.prev.name, node);
        prev.id = nodeData.prev.id;
        node.prev = prev;
      }

      for (let nextData of nodeData.nexts) {
        let next = new _socket.NextSocket(nextData.name, node);
        next.id = nextData.id;
        node.nexts.push(next);
      }

      p.addNode(node);
    }

    p.enter = p.nodes.find(n => n.id === data.enter);
    p.exit = p.nodes.find(n => n.id === data.exit); // Now import connections

    for (let connectionData of data.connections) {
      let sourceNode = p.nodes.find(n => n.id === connectionData.sourceNode);
      let targetNode = p.nodes.find(n => n.id === connectionData.targetNode);
      let sourceSocket = connectionData.type === "pn" ? sourceNode.nexts.find(n => n.id === connectionData.sourceSocket) : sourceNode.outputs.find(o => o.id === connectionData.sourceSocket);
      let targetSocket = connectionData.type === "pn" ? targetNode.prev : targetNode.inputs.find(i => i.id === connectionData.targetSocket);
      sourceSocket.connect(targetSocket);
    } // These two static variable must be assigned at the end because
    // the new InputSocket(), new OutputSocket(), ... increment it during
    // the import phase


    _node.Node.lastNodeIdIndex = data.lastNodeIndex;
    _socket.Socket.lastSocketIdIndex = data.lastSocketIndex;
    return p;
  }

}

exports.Env = Env;
var _nodeRegistry = {
  writable: true,
  value: new Map()
};
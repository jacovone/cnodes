"use strict";

require("core-js/modules/es6.array.is-array.js");

require("core-js/modules/es6.regexp.to-string.js");

require("core-js/modules/es6.date.to-string.js");

require("core-js/modules/es7.symbol.async-iterator.js");

require("core-js/modules/es6.symbol.js");

require("core-js/modules/es6.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Env = void 0;

require("core-js/modules/es6.array.find.js");

require("core-js/modules/es6.array.map.js");

require("core-js/modules/es6.function.name.js");

require("core-js/modules/es6.array.find-index.js");

require("core-js/modules/es6.array.from.js");

require("core-js/modules/es6.array.for-each.js");

require("core-js/modules/web.dom.iterable.js");

require("core-js/modules/es6.array.iterator.js");

require("core-js/modules/es6.object.to-string.js");

require("core-js/modules/es6.string.iterator.js");

require("core-js/modules/es6.map.js");

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

var _node2 = require("./node.js");

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

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
var Env = /*#__PURE__*/function () {
  function Env() {
    _classCallCheck(this, Env);
  }

  _createClass(Env, null, [{
    key: "init",

    /** The internal node registry */

    /**
     * Initialize the CNodes global environment
     */
    value: function init() {
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
     * @param {string} name The name of the node
     * @param {string} category The category of the node
     * @param {any} factory A function that instantiate the node
     */

  }, {
    key: "registerNode",
    value: function registerNode(name, category, factory) {
      _classStaticPrivateFieldSpecGet(Env, Env, _nodeRegistry).set(name, {
        category: category,
        factory: factory
      });
    }
    /**
     * Return the list of unique registered categories
     */

  }, {
    key: "getCategories",
    value: function getCategories() {
      var categoryMap = new Map();
      Array.from(_classStaticPrivateFieldSpecGet(this, Env, _nodeRegistry).values()).forEach(function (element) {
        categoryMap.set(element.category, 0);
      });
      return Array.from(categoryMap.keys());
    }
    /**
     * Return an array of registrations for nodes.
     * Registrations have the sign: {name, category, factory}
     * @param {string} category The category for which seacrh registrations
     */

  }, {
    key: "getCategoryNodes",
    value: function getCategoryNodes(category) {
      var registrations = [];
      Array.from(_classStaticPrivateFieldSpecGet(this, Env, _nodeRegistry).entries()).forEach(function (entry) {
        if (entry[1].category === category) {
          registrations.push({
            name: entry[0],
            category: entry[1].category,
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

  }, {
    key: "getInstance",
    value: function getInstance(name) {
      var reg = _classStaticPrivateFieldSpecGet(this, Env, _nodeRegistry).get(name);

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

  }, {
    key: "registerMaker",
    value: function registerMaker(name, obj) {
      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      /**
       * This function will be registered as creator for
       * instances of the OMake node for the user object
       */
      var createMake = function createMake() {
        var makeNode = new _fomake.FOMake();
        makeNode.title = name;
        makeNode.inputs = [];

        for (var field in obj) {
          var is = new _socket.InputSocket(field, makeNode, _type.Types.ANY, 0);

          if (opts.editableInputs) {
            is.canEditName = true;
            is.canEditType = true;
          }

          switch (_typeof(obj[field])) {
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
        for (var field in obj) {
          if (_typeof(obj[field]) === "object" && !(obj[field] instanceof Array)) {
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

  }, {
    key: "registerBreaker",
    value: function registerBreaker(name, obj) {
      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      /**
       * This function will be registered as creator for
       * instances of the OBreak node for the user object
       */
      var createBreak = function createBreak() {
        var breakNode = new _fobreak.FOBreak();
        breakNode.title = name;
        breakNode.outputs = [];

        for (var field in obj) {
          var os = new _socket.OutputSocket(field, breakNode, _type.Types.ANY, 0);

          if (opts.editableOutputs) {
            os.canEditName = true;
            os.canEditType = true;
          }

          switch (_typeof(obj[field])) {
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
        for (var field in obj) {
          if (_typeof(obj[field]) === "object" && !(obj[field] instanceof Array)) {
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

  }, {
    key: "registerObject",
    value: function registerObject(name, obj) {
      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      Env.registerMaker("Make " + name, obj, opts);
      Env.registerBreaker("Break " + name, obj, opts);
    }
    /**
     * Creates and returns a JSON representation of the entire program
     * @param {Program} program The program to export
     */

  }, {
    key: "export",
    value: function _export(program) {
      var exp = {
        id: program.id,
        version: _program.Program.version,
        lastNodeIndex: _node2.Node.lastNodeIdIndex,
        lastSocketIndex: _socket.Socket.lastSocketIdIndex,
        enter: program.enter.id,
        exit: program.exit.id,
        nodes: [],
        connections: []
      };

      var _iterator = _createForOfIteratorHelper(program.nodes),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var node = _step.value;
          var nodeExp = {
            id: node.id,
            name: node.name,
            title: node.title,
            functional: node.functional,
            meta: node.meta,
            program: node instanceof _program.Program ? Env["export"](node) : undefined,
            inputs: node.inputs.map(function (inp) {
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
            outputs: node.outputs.map(function (outp) {
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
            nexts: node.nexts.map(function (next) {
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

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      function pushConnection(connection) {
        if (exp.connections.findIndex(function (c) {
          return c.type === connection.type && c.sourceNode === connection.sourceNode && c.sourceSocket === connection.sourceSocket && c.targetNode === connection.targetNode && c.targetSocket === connection.targetSocket;
        }) === -1) {
          exp.connections.push(connection);
        }
      }

      var _iterator2 = _createForOfIteratorHelper(program.nodes),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _node$prev, _node$prev$peers;

          var _node = _step2.value;

          if (((_node$prev = _node.prev) === null || _node$prev === void 0 ? void 0 : (_node$prev$peers = _node$prev.peers) === null || _node$prev$peers === void 0 ? void 0 : _node$prev$peers.length) > 0) {
            var _iterator3 = _createForOfIteratorHelper(_node.prev.peers),
                _step3;

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var peer = _step3.value;
                var connectionExp = {
                  type: "pn",
                  sourceNode: peer.node.id,
                  sourceSocket: peer.id,
                  targetNode: _node.id,
                  targetSocket: _node.prev.id
                };
                pushConnection(connectionExp);
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
          }

          var _iterator4 = _createForOfIteratorHelper(_node.inputs),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var inp = _step4.value;

              if (inp.peer) {
                var _connectionExp = {
                  type: "io",
                  sourceNode: inp.peer.node.id,
                  sourceSocket: inp.peer.id,
                  targetNode: _node.id,
                  targetSocket: inp.id
                };
                pushConnection(_connectionExp);
              }
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }

          var _iterator5 = _createForOfIteratorHelper(_node.outputs),
              _step5;

          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var outp = _step5.value;

              var _iterator7 = _createForOfIteratorHelper(outp.peers),
                  _step7;

              try {
                for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                  var _peer = _step7.value;

                  if (_peer) {
                    var _connectionExp2 = {
                      type: "io",
                      sourceNode: _node.id,
                      sourceSocket: outp.id,
                      targetNode: _peer.node.id,
                      targetSocket: _peer.id
                    };
                    pushConnection(_connectionExp2);
                  }
                }
              } catch (err) {
                _iterator7.e(err);
              } finally {
                _iterator7.f();
              }
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }

          var _iterator6 = _createForOfIteratorHelper(_node.nexts),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var next = _step6.value;

              if (next.peer) {
                var _connectionExp3 = {
                  type: "pn",
                  sourceNode: _node.id,
                  sourceSocket: next.id,
                  targetNode: next.peer.node.id,
                  targetSocket: next.peer.id
                };
                pushConnection(_connectionExp3);
              }
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return exp;
    }
    /**
     * Create a program instance based on export data created with export() method
     * @param {any} data A object with the export data format
     */

  }, {
    key: "import",
    value: function _import(data) {
      if (data.version !== 1) {
        throw new Error("Imported data must have version 1");
      }

      var p = new _program.Program(); // Removes enter and exit auto-nodes, these
      // will be re-created by import procedure

      p.removeNode(p.enter);
      p.removeNode(p.exit);
      _program.Program.version = data.version; // Now import nodes without connections

      var _iterator8 = _createForOfIteratorHelper(data.nodes),
          _step8;

      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var nodeData = _step8.value;
          var node = void 0; // If this node is a program node, let the import
          // procedure to create the node

          if (nodeData.program) {
            node = Env["import"](nodeData.program);
          } else {
            // Otherwise import the node
            node = Env.getInstance(nodeData.name);
          } // Delete default sockets (created by getInstance())


          node.inputs = [];
          node.outputs = [];
          node.prev = null;
          node.nexts = [];

          if (!node) {
            throw new Error("Node type '".concat(nodeData.name, "' is not registered"));
          }

          node.title = nodeData.title;
          node.id = nodeData.id;
          node.functional = nodeData.functional;
          node.meta = nodeData.meta;

          var _iterator10 = _createForOfIteratorHelper(nodeData.inputs),
              _step10;

          try {
            for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
              var inpData = _step10.value;
              var inp = new _socket.InputSocket(inpData.name, node, inpData.type, inpData.value);
              inp.id = inpData.id;
              inp.canEditName = inpData.canEditName;
              node.inputs.push(inp);
            }
          } catch (err) {
            _iterator10.e(err);
          } finally {
            _iterator10.f();
          }

          var _iterator11 = _createForOfIteratorHelper(nodeData.outputs),
              _step11;

          try {
            for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
              var outpData = _step11.value;
              var outp = new _socket.OutputSocket(outpData.name, node, outpData.type, outpData.value, outpData.cached);
              outp.canEditName = outpData.canEditName;
              outp.id = outpData.id;
              node.outputs.push(outp);
            }
          } catch (err) {
            _iterator11.e(err);
          } finally {
            _iterator11.f();
          }

          if (nodeData.prev) {
            var prev = new _socket.PrevSocket(nodeData.prev.name, node);
            prev.id = nodeData.prev.id;
            node.prev = prev;
          }

          var _iterator12 = _createForOfIteratorHelper(nodeData.nexts),
              _step12;

          try {
            for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
              var nextData = _step12.value;
              var next = new _socket.NextSocket(nextData.name, node);
              next.id = nextData.id;
              node.nexts.push(next);
            }
          } catch (err) {
            _iterator12.e(err);
          } finally {
            _iterator12.f();
          }

          p.addNode(node);
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }

      p.enter = p.nodes.find(function (n) {
        return n.id === data.enter;
      });
      p.exit = p.nodes.find(function (n) {
        return n.id === data.exit;
      }); // Now import connections

      var _iterator9 = _createForOfIteratorHelper(data.connections),
          _step9;

      try {
        var _loop = function _loop() {
          var connectionData = _step9.value;
          var sourceNode = p.nodes.find(function (n) {
            return n.id === connectionData.sourceNode;
          });
          var targetNode = p.nodes.find(function (n) {
            return n.id === connectionData.targetNode;
          });
          var sourceSocket = connectionData.type === "pn" ? sourceNode.nexts.find(function (n) {
            return n.id === connectionData.sourceSocket;
          }) : sourceNode.outputs.find(function (o) {
            return o.id === connectionData.sourceSocket;
          });
          var targetSocket = connectionData.type === "pn" ? targetNode.prev : targetNode.inputs.find(function (i) {
            return i.id === connectionData.targetSocket;
          });
          sourceSocket.connect(targetSocket);
        };

        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          _loop();
        } // These two static variable must be assigned at the end because
        // the new InputSocket(), new OutputSocket(), ... increment it during
        // the import phase

      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }

      _node2.Node.lastNodeIdIndex = data.lastNodeIndex;
      _socket.Socket.lastSocketIdIndex = data.lastSocketIndex;
      return p;
    }
  }]);

  return Env;
}();

exports.Env = Env;
var _nodeRegistry = {
  writable: true,
  value: new Map()
};
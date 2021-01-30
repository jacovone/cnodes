"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Program = void 0;

var _events = require("events");

var _enter2 = require("./enter.mjs");

var _exit2 = require("./exit.mjs");

var _node = require("./node.mjs");

var _socket = require("./socket.mjs");

var _type = require("./type.mjs");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

var _nodes = new WeakMap();

var _enter = new WeakMap();

var _exit = new WeakMap();

var _currentNode = new WeakMap();

var _vars = new WeakMap();

/**
 * A program is a special node that contains nodes. The program
 * manages the flow of the global execution by starting from the
 * "Enter" default, autocreated node, call its process() method and receive the next
 * "next". A program also store a global variable space
 */
var Program = /*#__PURE__*/function (_Node) {
  _inherits(Program, _Node);

  var _super = _createSuper(Program);

  // Provide a node instance

  /** Engine version */

  /** The nodes in this program */

  /** The Enter node */

  /** The Exit node */

  /** The instruction pointer equivalent :) */

  /** The variable global space */

  /** The event emitter connected to the program */

  /**
   * Construct a new Program node
   */
  function Program() {
    var _this;

    _classCallCheck(this, Program);

    _this = _super.call(this, "Program");

    _nodes.set(_assertThisInitialized(_this), {
      writable: true,
      value: []
    });

    _enter.set(_assertThisInitialized(_this), {
      writable: true,
      value: null
    });

    _exit.set(_assertThisInitialized(_this), {
      writable: true,
      value: null
    });

    _currentNode.set(_assertThisInitialized(_this), {
      writable: true,
      value: null
    });

    _vars.set(_assertThisInitialized(_this), {
      writable: true,
      value: new Map()
    });

    _defineProperty(_assertThisInitialized(_this), "events", new _events.EventEmitter());

    _this.inputs = [new _socket.InputSocket("Val", _assertThisInitialized(_this), _type.Types.ANY, 0)];
    _this.outputs = [new _socket.OutputSocket("Val", _assertThisInitialized(_this), _type.Types.ANY, 0)];
    _this.nexts = [new _socket.NextSocket("Out", _assertThisInitialized(_this))];
    _this.prev = new _socket.PrevSocket("In", _assertThisInitialized(_this)); // Create default enter, exit nodes

    _this.addNode(_classPrivateFieldSet(_assertThisInitialized(_this), _enter, new _enter2.Enter())).addNode(_classPrivateFieldSet(_assertThisInitialized(_this), _exit, new _exit2.Exit()));

    _this.events.on("log", function (msg) {
      console.log("catched: ", msg);
    });

    return _this;
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  _createClass(Program, [{
    key: "clone",
    value: function clone() {
      var factory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Program.instance;

      var retNode = _get(_getPrototypeOf(Program.prototype), "clone", this).call(this, factory); // Clone internal nodes


      retNode.nodes = Program.cloneNodes(_classPrivateFieldGet(this, _nodes)); // Connect actual Enter and Exit

      retNode.enter = retNode.nodes.find(function (n) {
        return n instanceof _enter2.Enter;
      });
      retNode.exit = retNode.nodes.find(function (n) {
        return n instanceof _exit2.Exit;
      });
      return retNode;
    }
    /**
     * This method clone a group of nodes, by reconstructing the
     * connections from sockets too. All connections involvong nodes
     * outside this set will be not reconstructed.
     * @param {Node[]} nodes Nodes (and) connections to clone
     */

  }, {
    key: "addNode",

    /**
     * Add a new node to this program
     * @param {Node} node The node to add
     */
    value: function addNode(node) {
      _classPrivateFieldGet(this, _nodes).push(node); // Set this program to the node


      node.program = this;
      return this;
    }
    /**
     * Removes a node from this program, disconnect all sockets
     * @param {Node} node The node to remove
     */

  }, {
    key: "removeNode",
    value: function removeNode(node) {
      // Disconnect its sockets
      node.disconnectAllSockets();

      _classPrivateFieldSet(this, _nodes, _classPrivateFieldGet(this, _nodes).filter(function (n) {
        return n.id !== node.id;
      }));

      node.program = null;
      return this;
    }
    /**
     * The process method will start from the Enter node and
     * cycle over nexts returned by the process functions of nodes.
     * The Program node couldn't be a top-level program, but a sub-nod
     * of another program. For that reason, the process() method copy the
     * value of the only input in the Program node to the only one
     * output of the "Enter" node.
     * This is a limitation: The Program node can be actually only 1 input
     * and only 1 output. At the same, Enter and Exit nodes will have only
     * 1 output and 1 input respectively.
     * At the end, the process() methos of the Program node, will copy the
     * value of the Exit's intput to the unique output of the Program node
     */

  }, {
    key: "process",
    value: function () {
      var _process = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.evaluateInputs();

              case 2:
                _classPrivateFieldGet(this, _enter).output("Val").value = this.input("Val").value;
                _context.next = 5;
                return this.processFrom(_classPrivateFieldGet(this, _enter));

              case 5:
                this.output("Val").value = _classPrivateFieldGet(this, _exit).input("Val").value;
                return _context.abrupt("return", this.getFlowResult(this.next("Out")));

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function process() {
        return _process.apply(this, arguments);
      }

      return process;
    }()
    /**
     * Execute a program useng node as starting point
     * @param {Node} node Starting point node
     */

  }, {
    key: "processFrom",
    value: function () {
      var _processFrom = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(node) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.currentNode = node;

              case 1:
                if (!(this.currentNode !== null)) {
                  _context2.next = 8;
                  break;
                }

                _context2.next = 4;
                return this.currentNode.process();

              case 4:
                result = _context2.sent;
                this.currentNode = result.next;
                _context2.next = 1;
                break;

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function processFrom(_x) {
        return _processFrom.apply(this, arguments);
      }

      return processFrom;
    }()
  }, {
    key: "vars",
    get: function get() {
      return _classPrivateFieldGet(this, _vars);
    },
    set: function set(val) {
      _classPrivateFieldSet(this, _vars, val);
    }
  }, {
    key: "enter",
    get: function get() {
      return _classPrivateFieldGet(this, _enter);
    },
    set: function set(val) {
      _classPrivateFieldSet(this, _enter, val);
    }
  }, {
    key: "exit",
    get: function get() {
      return _classPrivateFieldGet(this, _exit);
    },
    set: function set(val) {
      _classPrivateFieldSet(this, _exit, val);
    }
  }, {
    key: "currentNode",
    get: function get() {
      return _classPrivateFieldGet(this, _currentNode);
    },
    set: function set(val) {
      _classPrivateFieldSet(this, _currentNode, val);
    }
  }, {
    key: "nodes",
    get: function get() {
      return _classPrivateFieldGet(this, _nodes);
    },
    set: function set(val) {
      _classPrivateFieldSet(this, _nodes, val);
    }
  }], [{
    key: "cloneNodes",
    value: function cloneNodes(nodes) {
      // First of all, clone all nodes
      var retNodes = [];

      var _iterator = _createForOfIteratorHelper(nodes),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _n = _step.value;

          var cloneN = _n.clone(); // Setup a temporary link between each node and its peer


          cloneN.__peer = _n;
          _n.__peer = cloneN;
          retNodes.push(cloneN);
        } // Reconstruct all links by traversong all nodes and
        // consider all output-->input and next-->prev connections
        // and duplicate them in clone nodes

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var _iterator2 = _createForOfIteratorHelper(nodes),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _n2 = _step2.value;

          // Clone output->input
          var _iterator4 = _createForOfIteratorHelper(_n2.outputs),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var o = _step4.value;

              var _iterator6 = _createForOfIteratorHelper(o.peers),
                  _step6;

              try {
                for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                  var p = _step6.value;

                  if (nodes.includes(p.node)) {
                    _n2.__peer.output(o.name).connect(p.node.__peer.input(p.name));
                  }
                }
              } catch (err) {
                _iterator6.e(err);
              } finally {
                _iterator6.f();
              }
            } // Clone next->prev

          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }

          var _iterator5 = _createForOfIteratorHelper(_n2.nexts),
              _step5;

          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var nx = _step5.value;

              if (nx.peer) {
                if (nodes.includes(nx.peer.node)) {
                  _n2.__peer.next(nx.name).connect(nx.peer.node.__peer.prev);
                }
              }
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
        } // Remove __peer fields

      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      var _iterator3 = _createForOfIteratorHelper(nodes),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _n3 = _step3.value;
          _n3.__peer = undefined;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      for (var _i = 0, _retNodes = retNodes; _i < _retNodes.length; _i++) {
        var n = _retNodes[_i];
        n.__peer = undefined;
      }

      return retNodes;
    }
  }]);

  return Program;
}(_node.Node);

exports.Program = Program;

_defineProperty(Program, "instance", function () {
  return new Program();
});

_defineProperty(Program, "version", 1);
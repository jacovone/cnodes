"use strict";

require("core-js/modules/es6.array.is-array.js");

require("core-js/modules/es7.symbol.async-iterator.js");

require("core-js/modules/es6.symbol.js");

require("core-js/modules/es6.array.from.js");

require("core-js/modules/es6.regexp.to-string.js");

require("core-js/modules/es6.date.to-string.js");

require("core-js/modules/es6.promise.js");

require("core-js/modules/es6.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Result = exports.Node = void 0;

require("core-js/modules/web.dom.iterable.js");

require("core-js/modules/es6.array.iterator.js");

require("core-js/modules/es6.object.to-string.js");

require("core-js/modules/es6.string.iterator.js");

require("core-js/modules/es6.weak-map.js");

require("regenerator-runtime/runtime.js");

require("core-js/modules/es6.function.name.js");

require("core-js/modules/es6.array.find.js");

var _socket = require("./socket.js");

var _type = require("./type.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

var _id = new WeakMap();

var _name = new WeakMap();

var _title = new WeakMap();

var _functional = new WeakMap();

var _inputs = new WeakMap();

var _outputs = new WeakMap();

var _nexts = new WeakMap();

var _prev = new WeakMap();

var _program = new WeakMap();

var _meta = new WeakMap();

var _removable = new WeakMap();

var _creatable = new WeakMap();

var _canAddInput = new WeakMap();

var _canAddOutput = new WeakMap();

var _canAddNext = new WeakMap();

/**
 * This is the base node class. A node have some input and output
 * to exchange data with other nodes, some nexts to determine next
 * execution nodes, and a prev to identify the entry point.
 * A node can be functional or iterative. If the node is funcitonal
 * the execution of the process method is repeated each time other
 * nodes read the output values, otherwise output nodes reports
 * the last computed value. Each node has a unique id to identify it
 */
var Node = /*#__PURE__*/function () {
  /** An incremental index to generate unique node IDs */

  /** The internal unique identifier */

  /** The internal name of the node */

  /** The external name of the node */

  /** Is this node a functional node? */

  /** List of node's inputs */

  /** List of node's outputs */

  /** List of node's nexts in execution */

  /** The execution entry point */

  /** Reference to the enclosing program */

  /** Additional info (UIs can write anything to store graphical behaviors) */

  /** Can the node be removed by the user? */

  /** Can the node be created by the user? */

  /** Can the user add an input? */

  /** Can the user add an output? */

  /** Can the user add a next? */

  /**
   * Construct a new Node
   * @param {string} [name] The name of the node
   * @param {string} [title] The title of the node
   */
  function Node(name) {
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : name;

    _classCallCheck(this, Node);

    _id.set(this, {
      writable: true,
      value: null
    });

    _name.set(this, {
      writable: true,
      value: ""
    });

    _title.set(this, {
      writable: true,
      value: ""
    });

    _functional.set(this, {
      writable: true,
      value: false
    });

    _inputs.set(this, {
      writable: true,
      value: []
    });

    _outputs.set(this, {
      writable: true,
      value: []
    });

    _nexts.set(this, {
      writable: true,
      value: []
    });

    _prev.set(this, {
      writable: true,
      value: null
    });

    _program.set(this, {
      writable: true,
      value: null
    });

    _meta.set(this, {
      writable: true,
      value: null
    });

    _removable.set(this, {
      writable: true,
      value: true
    });

    _creatable.set(this, {
      writable: true,
      value: true
    });

    _canAddInput.set(this, {
      writable: true,
      value: false
    });

    _canAddOutput.set(this, {
      writable: true,
      value: false
    });

    _canAddNext.set(this, {
      writable: true,
      value: false
    });

    _classPrivateFieldSet(this, _name, name);

    _classPrivateFieldSet(this, _title, title);

    _classPrivateFieldSet(this, _id, "NID_" + Node.lastNodeIdIndex++);
  }

  _createClass(Node, [{
    key: "input",

    /**
     * Returns the input by name
     * @param {string} name Name of the input
     */
    value: function input(name) {
      return this.inputs.find(function (i) {
        return i.name === name;
      });
    }
    /**
     * Returns the output by name
     * @param {string} name The name of the output
     */

  }, {
    key: "output",
    value: function output(name) {
      return this.outputs.find(function (o) {
        return o.name === name;
      });
    }
    /**
     * Returns the next by name
     * @param {string} name The name of the next
     */

  }, {
    key: "next",
    value: function next(name) {
      if (!name) {
        return this.nexts[0];
      }

      return this.nexts.find(function (n) {
        return n.name === name;
      });
    }
    /**
     * Evaluate all imputs of this node. Inputs are sockets.
     * If the socket is connected the evaluation will search
     * for the socket's peer and evaluate the output counterpart
     * eventually reprocess the output's nod, if the node is
     * functional
     */

  }, {
    key: "evaluateInputs",
    value: function () {
      var _evaluateInputs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _iterator, _step, inp;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _iterator = _createForOfIteratorHelper(this.inputs);
                _context.prev = 1;

                _iterator.s();

              case 3:
                if ((_step = _iterator.n()).done) {
                  _context.next = 9;
                  break;
                }

                inp = _step.value;
                _context.next = 7;
                return inp.evaluate();

              case 7:
                _context.next = 3;
                break;

              case 9:
                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](1);

                _iterator.e(_context.t0);

              case 14:
                _context.prev = 14;

                _iterator.f();

                return _context.finish(14);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 11, 14, 17]]);
      }));

      function evaluateInputs() {
        return _evaluateInputs.apply(this, arguments);
      }

      return evaluateInputs;
    }()
    /**
     * This is an helper method to construct a Result instance
     * by name
     * @param {Socket} socket The Socket on which construct the Result instance
     */

  }, {
    key: "getFlowResult",
    value: function getFlowResult(socket) {
      if (socket.peer) {
        return new Result(socket.peer.node);
      } else {
        return new Result();
      }
    }
    /**
     * This method disconnect all sockets from the node
     */

  }, {
    key: "disconnectAllSockets",
    value: function disconnectAllSockets() {
      if (_classPrivateFieldGet(this, _prev)) {
        while (_classPrivateFieldGet(this, _prev).peers.length > 0) {
          _classPrivateFieldGet(this, _prev).disconnect(_classPrivateFieldGet(this, _prev).peers[0]);

          _classPrivateFieldGet(this, _prev).peers.splice(0, 1);
        }
      }

      var _iterator2 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _inputs)),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var i = _step2.value;

          if (i.peer) {
            i.disconnect();
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      var _iterator3 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _outputs)),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var o = _step3.value;

          while (o.peers.length > 0) {
            o.peers[0].disconnect();
            o.peers.splice(0, 1);
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      var _iterator4 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _nexts)),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var n = _step4.value;

          if (n.peer) {
            n.disconnect();
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
    /**
     * If this.#canAddInput is true, the user can add an input
     * Subclass with variable number of input should override this method
     */

  }, {
    key: "addInput",
    value: function addInput() {
      throw new Error("Can't add input!");
    }
    /**
     * This method removes a specific input from the node, if
     * this is possible whit this instance
     * Subclass with variable number of input should override this method
     * @param {InputSocket} input The input to remove
     */

  }, {
    key: "removeInput",
    value: function removeInput(input) {
      throw new Error("Can't remove input");
    }
    /**
     * Can this node remove a specific input?
     * Subclass with variable number of input should override this method
     * @param {InputSocket} input The input to remove
     */

  }, {
    key: "canRemoveInput",
    value: function canRemoveInput(input) {
      return false;
    }
    /**
     * If this.#canAddOutput is true, the user can add an output
     * Subclass with variable number of output should override this method
     */

  }, {
    key: "addOutput",
    value: function addOutput() {
      throw new Error("Can't add output!");
    }
    /**
     * This method removes a specific output from the node, if
     * this is possible whit this instance
     * Subclass with variable number of output should override this method
     * @param {OutputSocket} output The output to remove
     */

  }, {
    key: "removeOutput",
    value: function removeOutput(output) {
      throw new Error("Can't remove output");
    }
    /**
     * Can this node remove a specific output?
     * Subclass with variable number of output should override this method
     * @param {OutputSocket} output The output to remove
     */

  }, {
    key: "canRemoveOutput",
    value: function canRemoveOutput(output) {
      return false;
    }
    /**
     * This method defines if a particular socket of this node can
     * be connected to another one, based on sockets type.
     * Default implementation checks for types of sockets, following the rule:
     * - if sockets are FlowSockets, return true
     * - Otherwise if the type of one socket is Types.ANY, return true
     * - Otherwise if the two types are the same, return true
     * - Otherwise return false
     * @param {Socket} thisSocket The instance of socket of this node
     * @param {Socket} otherSocket The other socket
     */

  }, {
    key: "canBeConnected",
    value: function canBeConnected(thisSocket, otherSocket) {
      if (thisSocket instanceof _socket.FlowSocket && !(otherSocket instanceof _socket.FlowSocket)) {
        return false;
      }

      if (otherSocket instanceof _socket.FlowSocket && !(thisSocket instanceof _socket.FlowSocket)) {
        return false;
      }

      if (thisSocket instanceof _socket.FlowSocket || otherSocket instanceof _socket.FlowSocket) {
        return true;
      }

      if (thisSocket.type === _type.Types.ANY || otherSocket.type === _type.Types.ANY) {
        return true;
      }

      if (thisSocket.type === otherSocket.type) {
        return true;
      }

      return false;
    }
    /** The base version of the node does nothing */

  }, {
    key: "process",
    value: function () {
      var _process = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", new Result());

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function process() {
        return _process.apply(this, arguments);
      }

      return process;
    }()
    /**
     * This method clones the node. Cloning will create a new node
     * of the same type of the particular node, so each node must
     * override this method to return the exact class type to the
     * caller. The param "factory" is a function to create the specific
     * class instance, to this base version of the method can create
     * the instance and clone all sockets, and other propertiesthat
     * is a same process for all different instances
     *
     * @param {Function} factory A function that return a new instance of the class
     */

  }, {
    key: "clone",
    value: function clone() {
      var factory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
        return new Node("Node");
      };
      var n = factory(); // Copy all inputs

      n.inputs = [];

      var _iterator5 = _createForOfIteratorHelper(this.inputs),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var i = _step5.value;
          var cloneI = i.clone();
          cloneI.node = n;
          n.inputs.push(cloneI);
        } // Copy all outputs

      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      n.outputs = [];

      var _iterator6 = _createForOfIteratorHelper(this.outputs),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var o = _step6.value;
          var cloneO = o.clone();
          cloneO.node = n;
          n.outputs.push(cloneO);
        } // Copy all nexts

      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }

      n.nexts = [];

      var _iterator7 = _createForOfIteratorHelper(this.nexts),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var nx = _step7.value;
          var cloneNx = nx.clone();
          cloneNx.node = n;
          n.nexts.push(cloneNx);
        } // Copy prev

      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }

      n.prev = null;

      if (this.prev) {
        var clonePrev = this.prev.clone();
        clonePrev.node = n;
        n.prev = clonePrev;
      } // Copy base properties


      n.id = "NID_" + Node.lastNodeIdIndex++;
      n.name = this.name;
      n.title = this.title;
      n.functional = this.functional;
      n.program = this.program;
      n.meta = this.meta ? JSON.parse(JSON.stringify(this.meta)) : null;
      n.removable = this.removable;
      n.creatable = this.creatable;
      n.canAddInput = this.canAddInput;
      n.canAddOutput = this.canAddOutput;
      n.canAddNext = this.canAddNext;
      return n;
    }
  }, {
    key: "id",
    get: function get() {
      return _classPrivateFieldGet(this, _id);
    },
    set: function set(val) {
      _classPrivateFieldSet(this, _id, val);
    }
  }, {
    key: "name",
    get: function get() {
      return _classPrivateFieldGet(this, _name);
    },
    set: function set(val) {
      _classPrivateFieldSet(this, _name, val);
    }
  }, {
    key: "title",
    get: function get() {
      return _classPrivateFieldGet(this, _title);
    },
    set: function set(val) {
      _classPrivateFieldSet(this, _title, val);
    }
  }, {
    key: "functional",
    get: function get() {
      return _classPrivateFieldGet(this, _functional);
    },
    set: function set(val) {
      _classPrivateFieldSet(this, _functional, val);
    }
  }, {
    key: "inputs",
    get: function get() {
      return _classPrivateFieldGet(this, _inputs);
    },
    set: function set(val) {
      _classPrivateFieldSet(this, _inputs, val);
    }
  }, {
    key: "outputs",
    get: function get() {
      return _classPrivateFieldGet(this, _outputs);
    },
    set: function set(val) {
      _classPrivateFieldSet(this, _outputs, val);
    }
  }, {
    key: "nexts",
    get: function get() {
      return _classPrivateFieldGet(this, _nexts);
    },
    set: function set(val) {
      _classPrivateFieldSet(this, _nexts, val);
    }
  }, {
    key: "prev",
    get: function get() {
      return _classPrivateFieldGet(this, _prev);
    },
    set: function set(val) {
      _classPrivateFieldSet(this, _prev, val);
    }
  }, {
    key: "program",
    get: function get() {
      return _classPrivateFieldGet(this, _program);
    },
    set: function set(val) {
      _classPrivateFieldSet(this, _program, val);
    }
  }, {
    key: "removable",
    get: function get() {
      return _classPrivateFieldGet(this, _removable);
    },
    set: function set(val) {
      _classPrivateFieldSet(this, _removable, val);
    }
  }, {
    key: "creatable",
    get: function get() {
      return _classPrivateFieldGet(this, _creatable);
    },
    set: function set(val) {
      _classPrivateFieldSet(this, _creatable, val);
    }
  }, {
    key: "canAddInput",
    get: function get() {
      return _classPrivateFieldGet(this, _canAddInput);
    },
    set: function set(val) {
      _classPrivateFieldSet(this, _canAddInput, val);
    }
  }, {
    key: "canAddOutput",
    get: function get() {
      return _classPrivateFieldGet(this, _canAddOutput);
    },
    set: function set(val) {
      _classPrivateFieldSet(this, _canAddOutput, val);
    }
  }, {
    key: "canAddNext",
    get: function get() {
      return _classPrivateFieldGet(this, _canAddNext);
    },
    set: function set(val) {
      _classPrivateFieldSet(this, _canAddNext, val);
    }
  }, {
    key: "meta",
    get: function get() {
      return _classPrivateFieldGet(this, _meta);
    },
    set: function set(val) {
      _classPrivateFieldSet(this, _meta, val);
    }
  }]);

  return Node;
}();
/**
 * The result class used by programs to receive
 * the next "next" in the flow
 */


exports.Node = Node;

_defineProperty(Node, "lastNodeIdIndex", 0);

var _next2 = new WeakMap();

var Result = /*#__PURE__*/function () {
  /** The next node */

  /**
   * Construct a new Result
   * @param {Socket} next The next socket to follow
   */
  function Result() {
    var next = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, Result);

    _next2.set(this, {
      writable: true,
      value: null
    });

    _classPrivateFieldSet(this, _next2, next);
  }

  _createClass(Result, [{
    key: "next",
    get: function get() {
      return _classPrivateFieldGet(this, _next2);
    },
    set: function set(val) {
      _classPrivateFieldSet(this, _next2, val);
    }
  }]);

  return Result;
}();

exports.Result = Result;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NextSocket = exports.PrevSocket = exports.FlowSocket = exports.OutputSocket = exports.InputSocket = exports.ValueSocket = exports.Socket = void 0;

var _type2 = require("./type.mjs");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

var _id = new WeakMap();

var _name = new WeakMap();

var _node = new WeakMap();

/**
 * A socket is an object that represent an input,
 * output, next or prev for the node
 */
var Socket = /*#__PURE__*/function () {
  /** An incremental index to generate unique socket IDs */

  /** The internal id of the socket */

  /** The name of this socket */

  /** The parent node */

  /**
   * Construct a new socket on a node with a given name
   * @param {string} name The name of the socket
   * @param {Node} node The parent node of the socket
   */
  function Socket(name, node) {
    _classCallCheck(this, Socket);

    _id.set(this, {
      writable: true,
      value: ""
    });

    _name.set(this, {
      writable: true,
      value: ""
    });

    _node.set(this, {
      writable: true,
      value: null
    });

    _classPrivateFieldSet(this, _id, "SID_" + Socket.lastSocketIdIndex++);

    _classPrivateFieldSet(this, _name, name);

    _classPrivateFieldSet(this, _node, node);
  }

  _createClass(Socket, [{
    key: "clone",

    /** Clone the spcket */
    value: function clone() {
      throw new Error("You must override this method");
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
    key: "node",
    get: function get() {
      return _classPrivateFieldGet(this, _node);
    },
    set: function set(val) {
      _classPrivateFieldSet(this, _node, val);
    }
  }]);

  return Socket;
}();
/**
 * The value socket represent a input or a output value
 * for the node, so it has a value and a type
 */


exports.Socket = Socket;

_defineProperty(Socket, "lastSocketIdIndex", 0);

var _type = new WeakMap();

var _value = new WeakMap();

var _canEditName = new WeakMap();

var _canEditType = new WeakMap();

var ValueSocket = /*#__PURE__*/function (_Socket) {
  _inherits(ValueSocket, _Socket);

  var _super = _createSuper(ValueSocket);

  /** The type for the socket's value */

  /** The stored value */

  /**
   * Some input/output sockets needs to have a name that users can change.
   * That's because the name of the socket is part of what the user can
   * choose. Think for example at a node that can make a data structure,
   * the user will want configure each field of the structure, in terms of
   * data value and name. The node will have a single output with the structure
   * as output. In this case the user can select a variable number of input
   * sockets, and can configure values (or connection) for each input as well
   * as the name of each socket, that whill be the name of the field in the structure.
   * This type of socket should be represented as a text field in a UI library.
   */

  /**
   * Some input/output sockets needs to change their type.
   * Nodes are responsible to configure this behavior of
   * sockets during the construction
   */

  /**
   * Construct a new ValueSocket
   * @param {string} name Name of the socket
   * @param {Node} node The parent node
   * @param {Type} type The type of this socket
   * @param {any} value The default value of the socket
   */
  function ValueSocket(name, node) {
    var _this;

    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _type2.Types.NUMBER;
    var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    _classCallCheck(this, ValueSocket);

    _this = _super.call(this, name, node);

    _type.set(_assertThisInitialized(_this), {
      writable: true,
      value: _type2.Types.NUMBER
    });

    _value.set(_assertThisInitialized(_this), {
      writable: true,
      value: 0
    });

    _canEditName.set(_assertThisInitialized(_this), {
      writable: true,
      value: false
    });

    _canEditType.set(_assertThisInitialized(_this), {
      writable: true,
      value: false
    });

    _this.type = type;
    _this.value = value;
    return _this;
  }

  _createClass(ValueSocket, [{
    key: "evaluate",

    /**
     * This method evaluates a socket in terms of the real value
     * that is staying inside. The meaning is different in case of
     * InputSocket and OutputSocket, that re-defines this method
     */
    value: function evaluate() {
      throw new Error("This method must be redefined in a subclass!");
    }
    /** Clone the socket */

  }, {
    key: "clone",
    value: function clone() {
      throw new Error("You must override this method");
    }
  }, {
    key: "type",
    get: function get() {
      return _classPrivateFieldGet(this, _type);
    },
    set: function set(val) {
      _classPrivateFieldSet(this, _type, val);
    }
  }, {
    key: "value",
    get: function get() {
      return _classPrivateFieldGet(this, _value);
    },
    set: function set(val) {
      _classPrivateFieldSet(this, _value, val);
    }
  }, {
    key: "canEditName",
    get: function get() {
      return _classPrivateFieldGet(this, _canEditName);
    },
    set: function set(val) {
      _classPrivateFieldSet(this, _canEditName, val);
    }
  }, {
    key: "canEditType",
    get: function get() {
      return _classPrivateFieldGet(this, _canEditType);
    },
    set: function set(val) {
      _classPrivateFieldSet(this, _canEditType, val);
    }
  }]);

  return ValueSocket;
}(Socket);
/**
 * This is an input socket value for the node, it
 * can have only a peer socket, because its value
 * have to be defined in a deterministic way
 */


exports.ValueSocket = ValueSocket;

var _peer = new WeakMap();

var InputSocket = /*#__PURE__*/function (_ValueSocket) {
  _inherits(InputSocket, _ValueSocket);

  var _super2 = _createSuper(InputSocket);

  /** The only peer socket */

  /**
   * Construct a new InputSocket
   * @param {string} name The name of the socket
   * @param {Node} node The parent node
   * @param {Type} type The type of the socket
   * @param {any} value The default value of the socket
   */
  function InputSocket(name, node) {
    var _this2;

    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _type2.Types.NUMBER;
    var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    _classCallCheck(this, InputSocket);

    _this2 = _super2.call(this, name, node, type, value);

    _peer.set(_assertThisInitialized(_this2), {
      writable: true,
      value: null
    });

    return _this2;
  }

  _createClass(InputSocket, [{
    key: "evaluate",

    /**
     * Evaluate the socket value. If the socket is connected,
     * this method goes to the peer socket and take the value.
     * Else the current socket value remains unchanged
     */
    value: function () {
      var _evaluate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.peer !== null)) {
                  _context.next = 4;
                  break;
                }

                _context.next = 3;
                return this.peer.evaluate();

              case 3:
                // OutputSocket
                this.value = this.peer.value;

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function evaluate() {
        return _evaluate.apply(this, arguments);
      }

      return evaluate;
    }()
    /**
     * Connect this socket to another (output) socket
     * @param {Socket} socket The output socket to connect
     */

  }, {
    key: "connect",
    value: function connect(socket) {
      var _this3 = this;

      this.peer = socket;

      if (socket.peers.find(function (s) {
        return s === _this3;
      }) === undefined) {
        socket.peers.push(this);
      }
    }
    /**
     * Disconnects this socket from its peer
     */

  }, {
    key: "disconnect",
    value: function disconnect() {
      var _this4 = this;

      if (this.peer) {
        var index = this.peer.peers.findIndex(function (s) {
          return s === _this4;
        });

        if (index !== -1) {
          this.peer.peers.splice(index, 1);
        }
      }

      this.peer = null;
    }
    /** Clone the spcket */

  }, {
    key: "clone",
    value: function clone() {
      var s = new InputSocket(this.name, null, this.type, this.value);
      s.id = "SID_" + Socket.lastSocketIdIndex++;
      s.peer = null;
      s.canEditName = this.canEditName;
      s.canEditType = this.canEditType;
      return s;
    }
  }, {
    key: "peer",
    get: function get() {
      return _classPrivateFieldGet(this, _peer);
    },
    set: function set(val) {
      _classPrivateFieldSet(this, _peer, val);
    }
  }]);

  return InputSocket;
}(ValueSocket);
/**
 * This is a output value socket and represent an output
 * value for the node. Output value socket can be connected to
 * many peer input value sockets, because many socket would like
 * to take the value from this.
 */


exports.InputSocket = InputSocket;

var _peers = new WeakMap();

var _cached = new WeakMap();

var OutputSocket = /*#__PURE__*/function (_ValueSocket2) {
  _inherits(OutputSocket, _ValueSocket2);

  var _super3 = _createSuper(OutputSocket);

  /** A list of input value connected sockets */

  /**
   * This flag indicates that the socket don't try to
   * cal the process() method of its node upon the
   * evaluation. Normally, functional nodes have output
   * sockets not cached, so an evaluation of its values
   * will result in a call of process() method
   */

  /**
   * Construct a new OutputSocket
   * @param {string} name The name of the socket
   * @param {Node} node The parent node
   * @param {Type} type The type of the socket
   * @param {any} value The default value of the socket
   * @param {boolean} [cached] This socket is cached?
   */
  function OutputSocket(name, node) {
    var _this5;

    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _type2.Types.NUMBER;
    var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var cached = arguments.length > 4 ? arguments[4] : undefined;

    _classCallCheck(this, OutputSocket);

    _this5 = _super3.call(this, name, node, type, value); // default to true if the node is not functional and false
    // if the node is functional

    _peers.set(_assertThisInitialized(_this5), {
      writable: true,
      value: []
    });

    _cached.set(_assertThisInitialized(_this5), {
      writable: true,
      value: true
    });

    _classPrivateFieldSet(_assertThisInitialized(_this5), _cached, cached !== null && cached !== void 0 ? cached : !node.functional);

    return _this5;
  }

  _createClass(OutputSocket, [{
    key: "evaluate",

    /**
     * The evaluation of a OutputSocket depends from two factors:
     * - The node of the socket is functional
     * - The socket is market to be "cached"
     *
     * If the parent node is not functional, simply does nothing, because
     * the value of this socket have to be unchanged from mthe last process
     * call
     * Otherwise, if the node is functional, we have to check if this particular
     * socket is marked to be "cached", in that case, the value have to remain unchanged,
     * otherwise the process() method have to be called again
     */
    value: function () {
      var _evaluate2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this$node;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!((_this$node = this.node) !== null && _this$node !== void 0 && _this$node.functional && !this.cached)) {
                  _context2.next = 3;
                  break;
                }

                _context2.next = 3;
                return this.node.process();

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function evaluate() {
        return _evaluate2.apply(this, arguments);
      }

      return evaluate;
    }()
    /**
     * Connects this socket to a input socket
     * @param {Socket} socket Socket to connect to
     */

  }, {
    key: "connect",
    value: function connect(socket) {
      if (this.peers.find(function (s) {
        return s === socket;
      }) === undefined) {
        this.peers.push(socket);
      }

      socket.peer = this;
    }
    /**
     * Disconnect this socket from a specific input peer
     * @param {Socket} socket The socket to disconnect
     */

  }, {
    key: "disconnect",
    value: function disconnect(socket) {
      var index = this.peers.findIndex(function (s) {
        return s === socket;
      });

      if (index !== undefined) {
        this.peers.splice(index, 1);
        socket.peer = null;
      }
    }
    /** Clone the socket */

  }, {
    key: "clone",
    value: function clone() {
      var s = new OutputSocket(this.name, null, this.type, this.value, this.cached);
      s.id = "SID_" + Socket.lastSocketIdIndex++;
      s.peers = [];
      s.canEditName = this.canEditName;
      s.canEditType = this.canEditType;
      return s;
    }
  }, {
    key: "peers",
    get: function get() {
      return _classPrivateFieldGet(this, _peers);
    },
    set: function set(val) {
      _classPrivateFieldSet(this, _peers, val);
    }
  }, {
    key: "cached",
    get: function get() {
      return _classPrivateFieldGet(this, _cached);
    },
    set: function set(val) {
      _classPrivateFieldSet(this, _cached, val);
    }
  }]);

  return OutputSocket;
}(ValueSocket);
/**
 * A flow socket is a socket to connect two nodes in
 * terms of execution flow
 */


exports.OutputSocket = OutputSocket;

var FlowSocket = /*#__PURE__*/function (_Socket2) {
  _inherits(FlowSocket, _Socket2);

  var _super4 = _createSuper(FlowSocket);

  /**
   * Construct a new FlowSocket
   * @param {sring} name Name of the socket
   * @param {Node} node The parent node
   */
  function FlowSocket(name, node) {
    _classCallCheck(this, FlowSocket);

    return _super4.call(this, name, node);
  }
  /** Clone the spcket */


  _createClass(FlowSocket, [{
    key: "clone",
    value: function clone() {
      throw new Error("You must override this method");
    }
  }]);

  return FlowSocket;
}(Socket);
/**
 * This class representa a prev socket, a socket that
 * can be connected to other nexts sockets. The prev socket
 * cab have many peer (next) socket because the execution
 * can come from anywhere in the program
 */


exports.FlowSocket = FlowSocket;

var _peers2 = new WeakMap();

var PrevSocket = /*#__PURE__*/function (_FlowSocket) {
  _inherits(PrevSocket, _FlowSocket);

  var _super5 = _createSuper(PrevSocket);

  /** List of (next) peer sockets */

  /**
   * Construct a new PrevSocket
   * @param {string} name Name of the socket
   * @param {Node} node Parent node
   */
  function PrevSocket(name, node) {
    var _this6;

    _classCallCheck(this, PrevSocket);

    _this6 = _super5.call(this, name, node);

    _peers2.set(_assertThisInitialized(_this6), {
      writable: true,
      value: []
    });

    return _this6;
  }

  _createClass(PrevSocket, [{
    key: "connect",

    /**
     * Connect this socket to a next socket
     * @param {Socket} socket The next socket to connect
     */
    value: function connect(socket) {
      if (this.peers.find(function (s) {
        return s === socket;
      }) === undefined) {
        this.peers.push(socket);
      }

      socket.peer = this;
    }
    /**
     * Disconnect this socket from a next socket
     * @param {Socket} socket The next socket to disconnect
     */

  }, {
    key: "disconnect",
    value: function disconnect(socket) {
      var index = this.peers.findIndex(function (s) {
        return s === socket;
      });

      if (index !== undefined) {
        this.peers.splice(index, 1);
        socket.peer = null;
      }
    }
    /** Clone the socket */

  }, {
    key: "clone",
    value: function clone() {
      var s = new PrevSocket(this.name, null);
      s.id = "SID_" + Socket.lastSocketIdIndex++;
      s.peers = [];
      return s;
    }
  }, {
    key: "peers",
    get: function get() {
      return _classPrivateFieldGet(this, _peers2);
    },
    set: function set(val) {
      _classPrivateFieldSet(this, _peers2, val);
    }
  }]);

  return PrevSocket;
}(FlowSocket);
/**
 * This class represents a socket to redirect the flow
 * to another node via a node's prev socket. This socket can
 * be connected to only one (prev) socket, because the program
 * flow have to be well defined
 */


exports.PrevSocket = PrevSocket;

var _peer2 = new WeakMap();

var NextSocket = /*#__PURE__*/function (_FlowSocket2) {
  _inherits(NextSocket, _FlowSocket2);

  var _super6 = _createSuper(NextSocket);

  /** The peer (prev) socket */

  /**
   * Construct a new NextSocket
   * @param {string} name Name of the socket
   * @param {Node} node The parent node of the socket
   */
  function NextSocket(name, node) {
    var _this7;

    _classCallCheck(this, NextSocket);

    _this7 = _super6.call(this, name, node);

    _peer2.set(_assertThisInitialized(_this7), {
      writable: true,
      value: null
    });

    return _this7;
  }

  _createClass(NextSocket, [{
    key: "connect",

    /**
     * Connect this socket to another (prev) socket
     * @param {Socket} socket The prev socket to connect to
     */
    value: function connect(socket) {
      var _this8 = this;

      this.peer = socket;

      if (socket.peers.find(function (s) {
        return s === _this8;
      }) === undefined) {
        socket.peers.push(this);
      }
    }
    /**
     * Disconnect this socket from the peer
     */

  }, {
    key: "disconnect",
    value: function disconnect() {
      var _this9 = this;

      if (this.peer) {
        var index = this.peer.peers.findIndex(function (s) {
          return s === _this9;
        });

        if (index !== -1) {
          this.peer.peers.splice(index, 1);
        }

        this.peer = null;
      }
    }
    /** Clone the spcket */

  }, {
    key: "clone",
    value: function clone() {
      var s = new NextSocket(this.name, null);
      s.id = "SID_" + Socket.lastSocketIdIndex++;
      s.peer = null;
      return s;
    }
  }, {
    key: "peer",
    get: function get() {
      return _classPrivateFieldGet(this, _peer2);
    },
    set: function set(val) {
      _classPrivateFieldSet(this, _peer2, val);
    }
  }]);

  return NextSocket;
}(FlowSocket);

exports.NextSocket = NextSocket;
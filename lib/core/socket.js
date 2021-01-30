"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NextSocket = exports.PrevSocket = exports.FlowSocket = exports.OutputSocket = exports.InputSocket = exports.ValueSocket = exports.Socket = undefined;

var _type2 = require("./type.js");

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
class Socket {
  /** An incremental index to generate unique socket IDs */

  /** The internal id of the socket */

  /** The name of this socket */

  /** The parent node */

  /**
   * Construct a new socket on a node with a given name
   * @param {string} name The name of the socket
   * @param {Node} node The parent node of the socket
   */
  constructor(name, node) {
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

  get id() {
    return _classPrivateFieldGet(this, _id);
  }

  set id(val) {
    _classPrivateFieldSet(this, _id, val);
  }

  get name() {
    return _classPrivateFieldGet(this, _name);
  }

  set name(val) {
    _classPrivateFieldSet(this, _name, val);
  }

  get node() {
    return _classPrivateFieldGet(this, _node);
  }

  set node(val) {
    _classPrivateFieldSet(this, _node, val);
  }
  /** Clone the spcket */


  clone() {
    throw new Error("You must override this method");
  }

}

exports.Socket = Socket;
/**
 * The value socket represent a input or a output value
 * for the node, so it has a value and a type
 */

_defineProperty(Socket, "lastSocketIdIndex", 0);

var _type = new WeakMap();

var _value = new WeakMap();

var _canEditName = new WeakMap();

var _canEditType = new WeakMap();

class ValueSocket extends Socket {
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
  constructor(name, node, type = _type2.Types.NUMBER, value = 0) {
    super(name, node);

    _type.set(this, {
      writable: true,
      value: _type2.Types.NUMBER
    });

    _value.set(this, {
      writable: true,
      value: 0
    });

    _canEditName.set(this, {
      writable: true,
      value: false
    });

    _canEditType.set(this, {
      writable: true,
      value: false
    });

    this.type = type;
    this.value = value;
  }

  get type() {
    return _classPrivateFieldGet(this, _type);
  }

  set type(val) {
    _classPrivateFieldSet(this, _type, val);
  }

  get value() {
    return _classPrivateFieldGet(this, _value);
  }

  set value(val) {
    _classPrivateFieldSet(this, _value, val);
  }

  get canEditName() {
    return _classPrivateFieldGet(this, _canEditName);
  }

  set canEditName(val) {
    _classPrivateFieldSet(this, _canEditName, val);
  }

  get canEditType() {
    return _classPrivateFieldGet(this, _canEditType);
  }

  set canEditType(val) {
    _classPrivateFieldSet(this, _canEditType, val);
  }
  /**
   * This method evaluates a socket in terms of the real value
   * that is staying inside. The meaning is different in case of
   * InputSocket and OutputSocket, that re-defines this method
   */


  evaluate() {
    throw new Error("This method must be redefined in a subclass!");
  }
  /** Clone the socket */


  clone() {
    throw new Error("You must override this method");
  }

}

exports.ValueSocket = ValueSocket;
/**
 * This is an input socket value for the node, it
 * can have only a peer socket, because its value
 * have to be defined in a deterministic way
 */

var _peer = new WeakMap();

class InputSocket extends ValueSocket {
  /** The only peer socket */

  /**
   * Construct a new InputSocket
   * @param {string} name The name of the socket
   * @param {Node} node The parent node
   * @param {Type} type The type of the socket
   * @param {any} value The default value of the socket
   */
  constructor(name, node, type = _type2.Types.NUMBER, value = 0) {
    super(name, node, type, value);

    _peer.set(this, {
      writable: true,
      value: null
    });
  }

  get peer() {
    return _classPrivateFieldGet(this, _peer);
  }

  set peer(val) {
    _classPrivateFieldSet(this, _peer, val);
  }
  /**
   * Evaluate the socket value. If the socket is connected,
   * this method goes to the peer socket and take the value.
   * Else the current socket value remains unchanged
   */


  async evaluate() {
    if (this.peer !== null) {
      await this.peer.evaluate(); // OutputSocket

      this.value = this.peer.value;
    }
  }
  /**
   * Connect this socket to another (output) socket
   * @param {Socket} socket The output socket to connect
   */


  connect(socket) {
    this.peer = socket;

    if (socket.peers.find(s => s === this) === undefined) {
      socket.peers.push(this);
    }
  }
  /**
   * Disconnects this socket from its peer
   */


  disconnect() {
    if (this.peer) {
      let index = this.peer.peers.findIndex(s => s === this);

      if (index !== -1) {
        this.peer.peers.splice(index, 1);
      }
    }

    this.peer = null;
  }
  /** Clone the spcket */


  clone() {
    let s = new InputSocket(this.name, null, this.type, this.value);
    s.id = "SID_" + Socket.lastSocketIdIndex++;
    s.peer = null;
    s.canEditName = this.canEditName;
    s.canEditType = this.canEditType;
    return s;
  }

}

exports.InputSocket = InputSocket;
/**
 * This is a output value socket and represent an output
 * value for the node. Output value socket can be connected to
 * many peer input value sockets, because many socket would like
 * to take the value from this.
 */

var _peers = new WeakMap();

var _cached = new WeakMap();

class OutputSocket extends ValueSocket {
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
  constructor(name, node, type = _type2.Types.NUMBER, value = 0, cached) {
    super(name, node, type, value); // default to true if the node is not functional and false
    // if the node is functional

    _peers.set(this, {
      writable: true,
      value: []
    });

    _cached.set(this, {
      writable: true,
      value: true
    });

    _classPrivateFieldSet(this, _cached, cached ?? !node.functional);
  }

  get peers() {
    return _classPrivateFieldGet(this, _peers);
  }

  set peers(val) {
    _classPrivateFieldSet(this, _peers, val);
  }

  get cached() {
    return _classPrivateFieldGet(this, _cached);
  }

  set cached(val) {
    _classPrivateFieldSet(this, _cached, val);
  }
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


  async evaluate() {
    if (this.node?.functional && !this.cached) {
      await this.node.process();
    }
  }
  /**
   * Connects this socket to a input socket
   * @param {Socket} socket Socket to connect to
   */


  connect(socket) {
    if (this.peers.find(s => s === socket) === undefined) {
      this.peers.push(socket);
    }

    socket.peer = this;
  }
  /**
   * Disconnect this socket from a specific input peer
   * @param {Socket} socket The socket to disconnect
   */


  disconnect(socket) {
    let index = this.peers.findIndex(s => s === socket);

    if (index !== undefined) {
      this.peers.splice(index, 1);
      socket.peer = null;
    }
  }
  /** Clone the socket */


  clone() {
    let s = new OutputSocket(this.name, null, this.type, this.value, this.cached);
    s.id = "SID_" + Socket.lastSocketIdIndex++;
    s.peers = [];
    s.canEditName = this.canEditName;
    s.canEditType = this.canEditType;
    return s;
  }

}

exports.OutputSocket = OutputSocket;
/**
 * A flow socket is a socket to connect two nodes in
 * terms of execution flow
 */

class FlowSocket extends Socket {
  /**
   * Construct a new FlowSocket
   * @param {sring} name Name of the socket
   * @param {Node} node The parent node
   */
  constructor(name, node) {
    super(name, node);
  }
  /** Clone the spcket */


  clone() {
    throw new Error("You must override this method");
  }

}

exports.FlowSocket = FlowSocket;
/**
 * This class representa a prev socket, a socket that
 * can be connected to other nexts sockets. The prev socket
 * cab have many peer (next) socket because the execution
 * can come from anywhere in the program
 */

var _peers2 = new WeakMap();

class PrevSocket extends FlowSocket {
  /** List of (next) peer sockets */

  /**
   * Construct a new PrevSocket
   * @param {string} name Name of the socket
   * @param {Node} node Parent node
   */
  constructor(name, node) {
    super(name, node);

    _peers2.set(this, {
      writable: true,
      value: []
    });
  }

  get peers() {
    return _classPrivateFieldGet(this, _peers2);
  }

  set peers(val) {
    _classPrivateFieldSet(this, _peers2, val);
  }
  /**
   * Connect this socket to a next socket
   * @param {Socket} socket The next socket to connect
   */


  connect(socket) {
    if (this.peers.find(s => s === socket) === undefined) {
      this.peers.push(socket);
    }

    socket.peer = this;
  }
  /**
   * Disconnect this socket from a next socket
   * @param {Socket} socket The next socket to disconnect
   */


  disconnect(socket) {
    let index = this.peers.findIndex(s => s === socket);

    if (index !== undefined) {
      this.peers.splice(index, 1);
      socket.peer = null;
    }
  }
  /** Clone the socket */


  clone() {
    let s = new PrevSocket(this.name, null);
    s.id = "SID_" + Socket.lastSocketIdIndex++;
    s.peers = [];
    return s;
  }

}

exports.PrevSocket = PrevSocket;
/**
 * This class represents a socket to redirect the flow
 * to another node via a node's prev socket. This socket can
 * be connected to only one (prev) socket, because the program
 * flow have to be well defined
 */

var _peer2 = new WeakMap();

class NextSocket extends FlowSocket {
  /** The peer (prev) socket */

  /**
   * Construct a new NextSocket
   * @param {string} name Name of the socket
   * @param {Node} node The parent node of the socket
   */
  constructor(name, node) {
    super(name, node);

    _peer2.set(this, {
      writable: true,
      value: null
    });
  }

  get peer() {
    return _classPrivateFieldGet(this, _peer2);
  }

  set peer(val) {
    _classPrivateFieldSet(this, _peer2, val);
  }
  /**
   * Connect this socket to another (prev) socket
   * @param {Socket} socket The prev socket to connect to
   */


  connect(socket) {
    this.peer = socket;

    if (socket.peers.find(s => s === this) === undefined) {
      socket.peers.push(this);
    }
  }
  /**
   * Disconnect this socket from the peer
   */


  disconnect() {
    if (this.peer) {
      let index = this.peer.peers.findIndex(s => s === this);

      if (index !== -1) {
        this.peer.peers.splice(index, 1);
      }

      this.peer = null;
    }
  }
  /** Clone the spcket */


  clone() {
    let s = new NextSocket(this.name, null);
    s.id = "SID_" + Socket.lastSocketIdIndex++;
    s.peer = null;
    return s;
  }

}

exports.NextSocket = NextSocket;
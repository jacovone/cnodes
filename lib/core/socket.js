/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

import { Types, type, Type } from "./type.js";

/**
 * A socket is an object that represent an input,
 * output, next or prev for the node
 */
export class Socket {
  /** An incremental index to generate unique socket IDs */
  static lastSocketIdIndex = 0;

  /** The internal id of the socket */
  #id = "";

  /** The name of this socket */
  #name = "";

  /** The parent node */
  #node = null;

  /**
   * Construct a new socket on a node with a given name
   * @param {string} name The name of the socket
   * @param {Node} node The parent node of the socket
   */
  constructor(name, node) {
    this.#id = "SID_" + Socket.lastSocketIdIndex++;

    this.#name = name;
    this.#node = node;
  }
  get id() {
    return this.#id;
  }
  set id(val) {
    this.#id = val;
  }
  get name() {
    return this.#name;
  }
  set name(val) {
    this.#name = val;
  }
  get node() {
    return this.#node;
  }
  set node(val) {
    this.#node = val;
  }
}

/**
 * The value socket represent a input or a output value
 * for the node, so it has a value and a type
 */
export class ValueSocket extends Socket {
  /** The type for the socket's value */
  #type = type(Types.NUMBER, false);

  /** The stored value */
  #value = 0;

  /**
   * Construct a new ValueSocket
   * @param {string} name Name of the socket
   * @param {Node} node The parent node
   * @param {Type} type The type of this socket
   * @param {any} value The default value of the socket
   */
  constructor(name, node, type = type(Types.NUMBER, false), value = 0) {
    super(name, node);
    this.type = type;
    this.value = value;
  }

  get type() {
    return this.#type;
  }
  set type(val) {
    this.#type = val;
  }
  get value() {
    return this.#value;
  }
  set value(val) {
    this.#value = val;
  }
}

/**
 * This is an input socket value for the node, it
 * can have only a peer socket, because its value
 * have to be defined in a deterministic way
 */
export class InputSocket extends ValueSocket {
  /** The only peer socket */
  #peer = null;

  /**
   * Construct a new InputSocket
   * @param {string} name The name of the socket
   * @param {Node} node The parent node
   * @param {Type} type The type of the socket
   * @param {any} value The default value of the socket
   */
  constructor(name, node, type = type(Types.NUMBER, false), value = 0) {
    super(name, node, type, value);
  }
  get peer() {
    return this.#peer;
  }
  set peer(val) {
    this.#peer = val;
  }

  /**
   * Evaluate the socket value. If the socket is connected,
   * this method goes to the peer socket and take the value.
   * If the peer socket is part of a functional node, the process()
   * method is executed before taking the value
   */
  evaluate() {
    if (this.peer !== null) {
      if (this.peer.node && this.peer.node.functional) {
        this.peer.node.process();
      }
      this.type = this.peer.type;
      this.value = this.peer.value;
    }
  }

  /**
   * Connect this socket to another (output) socket
   * @param {Socket} socket The output socket to connect
   */
  connect(socket) {
    this.peer = socket;
    if (socket.peers.find((s) => s === this) === undefined) {
      socket.peers.push(this);
    }
  }

  /**
   * Disconnects this socket from its peer
   */
  disconnect() {
    if (this.peer) {
      let index = this.peer.peers.findIndex((s) => s === this);
      if (index !== -1) {
        this.peer.peers.splice(index, 1);
      }
    }
    this.peer = null;
  }
}

/**
 * This is a output value socket and represent an output
 * value for the node. Output value socket can be connected to
 * many peer input value sockets, because many socket would like
 * to take the value from this.
 */
export class OutputSocket extends ValueSocket {
  /** A list of input value connected sockets */
  #peers = [];

  /**
   * Construct a new OutputSocket
   * @param {string} name The name of the socket
   * @param {Node} node The parent node
   * @param {Type} type The type of the socket
   * @param {any} value The default value of the socket
   */
  constructor(name, node, type = type(Types.NUMBER, false), value = 0) {
    super(name, node, type, value);
  }
  get peers() {
    return this.#peers;
  }
  set peers(val) {
    this.#peers = val;
  }

  /**
   * Connects this socket to a input socket
   * @param {Socket} socket Socket to connect to
   */
  connect(socket) {
    if (this.peers.find((s) => s === socket) === undefined) {
      this.peers.push(socket);
    }
    socket.peer = this;
  }

  /**
   * Disconnect this socket from a specific input peer
   * @param {Socket} socket The socket to disconnect
   */
  disconnect(socket) {
    let index = this.peers.findIndex((s) => s === socket);
    if (index !== undefined) {
      this.peers.splice(index, 1);
      socket.peer = null;
    }
  }
}

/**
 * A flow socket is a socket to connect two nodes in
 * terms of execution flow
 */
export class FlowSocket extends Socket {
  /**
   * Construct a new FlowSocket
   * @param {sring} name Name of the socket
   * @param {Node} node The parent node
   */
  constructor(name, node) {
    super(name, node);
  }
}

/**
 * This class representa a prev socket, a socket that
 * can be connected to other nexts sockets. The prev socket
 * cab have many peer (next) socket because the execution
 * can come from anywhere in the program
 */
export class PrevSocket extends FlowSocket {
  /** List of (next) peer sockets */
  #peers = [];

  /**
   * Construct a new PrevSocket
   * @param {string} name Name of the socket
   * @param {Node} node Parent node
   */
  constructor(name, node) {
    super(name, node);
  }
  get peers() {
    return this.#peers;
  }
  set peers(val) {
    this.#peers = val;
  }

  /**
   * Connect this socket to a next socket
   * @param {Socket} socket The next socket to connect
   */
  connect(socket) {
    if (this.peers.find((s) => s === socket) === undefined) {
      this.peers.push(socket);
    }
    socket.peer = this;
  }

  /**
   * Disconnect this socket from a next socket
   * @param {Socket} socket The next socket to disconnect
   */
  disconnect(socket) {
    let index = this.peers.findIndex((s) => s === socket);
    if (index !== undefined) {
      this.peers.splice(index, 1);
      socket.peer = null;
    }
  }
}

/**
 * This class represents a socket to redirect the flow
 * to another node via a node's prev socket. This socket can
 * be connected to only one (prev) socket, because the program
 * flow have to be well defined
 */
export class NextSocket extends FlowSocket {
  /** The peer (prev) socket */
  #peer = null;

  /**
   * Construct a new NextSocket
   * @param {string} name Name of the socket
   * @param {Node} node The parent node of the socket
   */
  constructor(name, node) {
    super(name, node);
  }
  get peer() {
    return this.#peer;
  }
  set peer(val) {
    this.#peer = val;
  }

  /**
   * Connect this socket to another (prev) socket
   * @param {Socket} socket The prev socket to connect to
   */
  connect(socket) {
    this.peer = socket;
    if (socket.peers.find((s) => s === this) === undefined) {
      socket.peers.push(this);
    }
  }

  /**
   * Disconnect this socket from the peer
   */
  disconnect() {
    if (this.peer) {
      let index = this.peer.peers.findIndex((s) => s === this);
      if (index !== -1) {
        this.peer.peers.splice(index, 1);
      }
      this.peer = null;
    }
  }
}

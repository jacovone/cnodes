/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

import { Types, Type, type } from "./type.js";

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

  export() {}
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
   * @param {*} socket The output socket to connect
   */
  connect(socket) {
    this.peer = socket;
    if (socket.peers.find((s) => s.peer === this) === undefined) {
      socket.peers.push(this);
    }
  }

  /**
   * Disconnects thi socket from its peer
   * @param {*} socket Peer socket to disconnect
   */
  disconnect(socket) {
    this.peer = null;
    let index = socket.peers.findIndex((s) => s.peer === this);
    if (index !== -1) {
      socket.peers.splice(index, 1);
    }
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
   * @param {*} socket
   */
  connect(socket) {
    if (this.peers.find((s) => s.peer === socket) === undefined) {
      this.peers.push(socket);
    }
    socket.peer = this;
  }

  /** Disconnect this socket from a specific input peer */
  disconnect(socket) {
    let index = this.peers.find((s) => s.peer === socket);
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
   * @param {*} socket The next socket to connect
   */
  connect(socket) {
    if (this.peers.find((s) => s.peer === socket) === undefined) {
      this.peers.push(socket);
    }
    socket.peer = this;
  }

  /**
   * Disconnect this socket from a next socket
   * @param {*} socket The next socket to disconnect
   */
  disconnect(socket) {
    let index = this.peers.find((s) => s.peer === socket);
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
   * Export the socket
   */
  export() {
    return {
      id: this.id,
      name: this.name,
      node: this.node.id,
      peer: this.peer ? this.peer.id : null,
    };
  }

  /**
   * Import the socket from data
   * @param {*} data The data to import
   */
  static import(data) {
    let socket = new NextSocket(data.name, data.node);
    socket.id = data.id;
    socket.peer = data.peer;
    return socket;
  }

  /**
   * Connect this socket to another (prev) socket
   * @param {*} socket The prev socket to connect to
   */
  connect(socket) {
    this.peer = socket;
    if (socket.peers.find((s) => s.peer === this) === undefined) {
      socket.peers.push(this);
    }
  }

  /**
   * Thisconnect this socket from the peer
   * @param {*} socket The peer to disconnect
   */
  disconnect(socket) {
    this.peer = null;
    let index = socket.peers.findIndex((s) => s.peer === this);
    if (index !== -1) {
      socket.peers.splice(index, 1);
    }
  }
}

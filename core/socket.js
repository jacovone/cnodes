import { Types, type } from './type.js';
import { v4 as uuidv4 } from "uuid";

export class Socket {

  #id = '';
  #name = '';
  #node = null;

  constructor(name, node) {
    this.#id = uuidv4();
    this.#name = name;
    this.#node = node;
  }
  get id() {
    return this.#id;
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

export class ValueSocket extends Socket {
  #type = type(Types.NUMBER, false);
  #value = 0;

  constructor(name, node, type = type(Types.NUMBER, false), value = 0) {
    super(name, node);
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

export class InputSocket extends ValueSocket {
  #peer = null;

  constructor(name, node, type, value) {
    super(name, node, type, value);
  }
  get peer() {
    return this.#peer;
  }
  set peer(val) {
    this.#peer = val;
  }
  evaluate() {
    if (this.peer !== null) {
      if (this.peer.node && this.peer.node.functional) {
        this.peer.node.process();
      }
      this.type = this.peer.type;
      this.value = this.peer.value;
    }
  }
  connect(socket) {
    this.peer = socket;
    if (socket.peers.find((s) => s.peer === this) === undefined) {
      socket.peers.push(this);
    }
  }
  disconnect(socket) {
    this.peer = null;
    let index = socket.peers.findIndex((s) => s.peer === this);
    if (index !== -1) {
      socket.peers.splice(index, 1);
    }
  }
}

export class OutputSocket extends ValueSocket {
  #peers = [];

  constructor(name, node, type, value) {
    super(name, node, value, type);
  }
  get peers() {
    return this.#peers;
  }
  set peers(val) {
    this.#peers = val;
  }
  connect(socket) {
    if (this.peers.find((s) => s.peer === socket) === undefined) {
      this.peers.push(socket);
    }
    socket.peer = this;
  }
  disconnect(socket) {
    let index = this.peers.find((s) => s.peer === socket);
    if (index !== undefined) {
      this.peers.splice(index, 1);
      socket.peer = null;
    }
  }
}

export class FlowSocket extends Socket {
  constructor(name, node) {
    super(name, node);
  }
}

export class PrevSocket extends FlowSocket {
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
  connect(socket) {
    if (this.peers.find((s) => s.peer === socket) === undefined) {
      this.peers.push(socket);
    }
    socket.peer = this;
  }
  disconnect(socket) {
    let index = this.peers.find((s) => s.peer === socket);
    if (index !== undefined) {
      this.peers.splice(index, 1);
      socket.peer = null;
    }
  }
}

export class NextSocket extends FlowSocket {
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
  connect(socket) {
    this.peer = socket;
    if (socket.peers.find((s) => s.peer === this) === undefined) {
      socket.peers.push(this);
    }
  }
  disconnect(socket) {
    this.peer = null;
    let index = socket.peers.findIndex((s) => s.peer === this);
    if (index !== -1) {
      socket.peers.splice(index, 1);
    }
  }
}

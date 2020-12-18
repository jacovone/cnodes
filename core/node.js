/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

/**
 * This is the base node class. A node have some input and output
 * to exchange data with other nodes, some nexts to determine next
 * execution nodes, and a prev to identify the entry point.
 * A node can be functional or iterative. If the node is funcitonal
 * the execution of the process method is repeated each time other
 * nodes read the output values, otherwise output nodes reports
 * the last computed value. Each node has a unique id to identify it
 */
export class Node {
  /** An incremental index to generate unique node IDs */
  static lastNodeIdIndex = 0;

  /** The internal unique identifier */
  #id = null;

  /** The internal name of the node */
  #name = "";

  /** Is this node a functional node? */
  #functional = false;

  /** List of node's inputs */
  #inputs = [];

  /** List of node's outputs */
  #outputs = [];

  /** List of node's nexts in execution */
  #nexts = [];

  /** The execution entry point */
  #prev = null;

  /** Reference to the enclosing program */
  #program = null;

  constructor(name) {
    this.#name = name;
    this.#id = "NID_" + Node.lastNodeIdIndex++;
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
  get functional() {
    return this.#functional;
  }
  set functional(val) {
    this.#functional = val;
  }
  get inputs() {
    return this.#inputs;
  }
  set inputs(val) {
    this.#inputs = val;
  }
  get outputs() {
    return this.#outputs;
  }
  set outputs(val) {
    this.#outputs = val;
  }
  get nexts() {
    return this.#nexts;
  }
  set nexts(val) {
    this.#nexts = val;
  }
  get prev() {
    return this.#prev;
  }
  set prev(val) {
    this.#prev = val;
  }
  get program() {
    return this.#program;
  }
  set program(val) {
    this.#program = val;
  }

  /**
   * Returns the input by name
   * @param {*} name Name of the input
   */
  input(name) {
    return this.inputs.find((i) => i.name === name);
  }

  /**
   * Returns the output by name
   * @param {*} name The name of the output
   */
  output(name) {
    return this.outputs.find((o) => o.name === name);
  }

  /**
   * Returns the next by name
   * @param {*} name The name of the next
   */
  next(name) {
    if (!name) {
      return this.nexts[0];
    }
    return this.nexts.find((n) => n.name === name);
  }

  /**
   * Evaluate all imputs of this node. Inputs are sockets.
   * If the socket is connected the evaluation will search
   * for the socket's peer and evaluate the output counterpart
   * eventually reprocess the output's nod, if the node is
   * functional
   */
  evaluateInputs() {
    for (let inp of this.inputs) {
      inp.evaluate();
    }
  }

  /**
   * This is an helper method to construct a Result instance
   * by name
   * @param {*} socket
   */
  getFlowResult(socket) {
    if (socket.peer) {
      return new Result(socket.peer.node);
    } else {
      return new Result();
    }
  }

  /**
   * This method disconnect all sockets from the node
   */
  disconnectAllSockets() {
    if (this.#prev && this.#prev.peer) {
      this.#prev.disconnect();
    }
    for (let i of this.#inputs) {
      if (i.peer) {
        i.disconnect();
      }
    }
    for (let o of this.#outputs) {
      while (o.peers.length > 0) {
        o.peers[0].disconnect();
      }
    }
    for (let n of this.#nexts) {
      if (n.peer) {
        n.disconnect();
      }
    }
  }

  /** The base version of the node does nothing */
  process() {
    return new Result();
  }
}

/**
 * The result class used by programs to receive
 * the next "next" in the flow
 */
export class Result {
  /** The next node */
  #next = null;

  constructor(next = null) {
    this.#next = next;
  }
  get next() {
    return this.#next;
  }
  set next(val) {
    this.#next = val;
  }
}

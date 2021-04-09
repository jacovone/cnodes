/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020-2021
 */

import { EventEmitter } from "events";
import { Enter } from "./enter.mjs";
import { Exit } from "./exit.mjs";
import { Node } from "./node.mjs";
import {
  InputSocket,
  NextSocket,
  OutputSocket,
  PrevSocket,
} from "./socket.mjs";
import { Types } from "./type.mjs";

/**
 * A program is a special node that contains nodes. The program
 * manages the flow of the global execution by starting from the
 * "Enter" default, autocreated node, call its process() method and receive the next
 * "next". A program also store a global variable space
 */
export class Program extends Node {
  // Provide a node instance
  static instance = () => new Program();

  /** Engine version */
  static version = 1;

  /** The nodes in this program */
  #nodes = [];

  /** The Enter node */
  #enter = null;

  /** The Exit node */
  #exit = null;

  /** The instruction pointer equivalent :) */
  #currentNode = null;

  /** The variable global space */
  #vars = new Map();

  /** The event emitter connected to the program */
  static events = new EventEmitter();

  /**
   * Construct a new Program node
   */
  constructor() {
    super("Program");
    this.inputs = [new InputSocket("Val", this, Types.ANY, 0)];
    this.outputs = [new OutputSocket("Val", this, Types.ANY, 0)];
    this.nexts = [new NextSocket("Out", this)];
    this.prev = new PrevSocket("In", this);

    // Create default enter, exit nodes
    this.addNode((this.#enter = new Enter())).addNode(
      (this.#exit = new Exit())
    );

    this.events.on("log", (msg) => {
      console.log("catched: ", msg);
    });
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = Program.instance) {
    let retNode = super.clone(factory);

    // Clone internal nodes
    retNode.nodes = Program.cloneNodes(this.#nodes);

    // Connect actual Enter and Exit
    retNode.enter = retNode.nodes.find((n) => n instanceof Enter);
    retNode.exit = retNode.nodes.find((n) => n instanceof Exit);

    return retNode;
  }

  /**
   * This method clone a group of nodes, by reconstructing the
   * connections from sockets too. All connections involvong nodes
   * outside this set will be not reconstructed.
   * @param {Node[]} nodes Nodes (and) connections to clone
   */
  static cloneNodes(nodes) {
    // First of all, clone all nodes
    let retNodes = [];

    for (let n of nodes) {
      let cloneN = n.clone();

      // Setup a temporary link between each node and its peer
      cloneN.__peer = n;
      n.__peer = cloneN;

      retNodes.push(cloneN);
    }

    // Reconstruct all links by traversong all nodes and
    // consider all output-->input and next-->prev connections
    // and duplicate them in clone nodes
    for (let n of nodes) {
      // Clone output->input
      for (let o of n.outputs) {
        for (let p of o.peers) {
          if (nodes.includes(p.node)) {
            n.__peer.output(o.name).connect(p.node.__peer.input(p.name));
          }
        }
      }
      // Clone next->prev
      for (let nx of n.nexts) {
        if (nx.peer) {
          if (nodes.includes(nx.peer.node)) {
            n.__peer.next(nx.name).connect(nx.peer.node.__peer.prev);
          }
        }
      }
    }

    // Remove __peer fields
    for (let n of nodes) {
      n.__peer = undefined;
    }
    for (let n of retNodes) {
      n.__peer = undefined;
    }

    return retNodes;
  }

  get vars() {
    return this.#vars;
  }
  set vars(val) {
    this.#vars = val;
  }
  get enter() {
    return this.#enter;
  }
  set enter(val) {
    this.#enter = val;
  }
  get exit() {
    return this.#exit;
  }
  set exit(val) {
    this.#exit = val;
  }
  get currentNode() {
    return this.#currentNode;
  }
  set currentNode(val) {
    this.#currentNode = val;
  }
  get nodes() {
    return this.#nodes;
  }
  set nodes(val) {
    this.#nodes = val;
  }

  /**
   * Add a new node to this program
   * @param {Node} node The node to add
   */
  addNode(node) {
    this.#nodes.push(node);

    // Set this program to the node
    node.program = this;
    return this;
  }

  /**
   * Removes a node from this program, disconnect all sockets
   * @param {Node} node The node to remove
   */
  removeNode(node) {
    // Disconnect its sockets
    node.disconnectAllSockets();

    this.#nodes = this.#nodes.filter((n) => n.id !== node.id);
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
  async process() {
    await this.evaluateInputs();

    this.#enter.output("Val").value = this.input("Val").value;

    await this.processFrom(this.#enter);

    this.output("Val").value = this.#exit.input("Val").value;

    return this.getFlowResult(this.next("Out"));
  }

  /**
   * Execute a program useng node as starting point
   * @param {Node} node Starting point node
   */
  async processFrom(node) {
    this.currentNode = node;
    while (this.currentNode !== null) {
      let result = await this.currentNode.process();
      this.currentNode = result.next;
    }
  }
}

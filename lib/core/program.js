"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Program = undefined;

var _events = require("events");

var _enter2 = require("./enter.js");

var _exit2 = require("./exit.js");

var _node = require("./node.js");

var _socket = require("./socket.js");

var _type = require("./type.js");

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
class Program extends _node.Node {
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
  constructor() {
    super("Program");

    _nodes.set(this, {
      writable: true,
      value: []
    });

    _enter.set(this, {
      writable: true,
      value: null
    });

    _exit.set(this, {
      writable: true,
      value: null
    });

    _currentNode.set(this, {
      writable: true,
      value: null
    });

    _vars.set(this, {
      writable: true,
      value: new Map()
    });

    _defineProperty(this, "events", new _events.EventEmitter());

    this.inputs = [new _socket.InputSocket("Val", this, _type.Types.ANY, 0)];
    this.outputs = [new _socket.OutputSocket("Val", this, _type.Types.ANY, 0)];
    this.nexts = [new _socket.NextSocket("Out", this)];
    this.prev = new _socket.PrevSocket("In", this); // Create default enter, exit nodes

    this.addNode(_classPrivateFieldSet(this, _enter, new _enter2.Enter())).addNode(_classPrivateFieldSet(this, _exit, new _exit2.Exit()));
    this.events.on("log", msg => {
      console.log("catched: ", msg);
    });
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = Program.instance) {
    let retNode = super.clone(factory); // Clone internal nodes

    retNode.nodes = Program.cloneNodes(_classPrivateFieldGet(this, _nodes)); // Connect actual Enter and Exit

    retNode.enter = retNode.nodes.find(n => n instanceof _enter2.Enter);
    retNode.exit = retNode.nodes.find(n => n instanceof _exit2.Exit);
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
      let cloneN = n.clone(); // Setup a temporary link between each node and its peer

      cloneN.__peer = n;
      n.__peer = cloneN;
      retNodes.push(cloneN);
    } // Reconstruct all links by traversong all nodes and
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
      } // Clone next->prev


      for (let nx of n.nexts) {
        if (nx.peer) {
          if (nodes.includes(nx.peer.node)) {
            n.__peer.next(nx.name).connect(nx.peer.node.__peer.prev);
          }
        }
      }
    } // Remove __peer fields


    for (let n of nodes) {
      n.__peer = undefined;
    }

    for (let n of retNodes) {
      n.__peer = undefined;
    }

    return retNodes;
  }

  get vars() {
    return _classPrivateFieldGet(this, _vars);
  }

  set vars(val) {
    _classPrivateFieldSet(this, _vars, val);
  }

  get enter() {
    return _classPrivateFieldGet(this, _enter);
  }

  set enter(val) {
    _classPrivateFieldSet(this, _enter, val);
  }

  get exit() {
    return _classPrivateFieldGet(this, _exit);
  }

  set exit(val) {
    _classPrivateFieldSet(this, _exit, val);
  }

  get currentNode() {
    return _classPrivateFieldGet(this, _currentNode);
  }

  set currentNode(val) {
    _classPrivateFieldSet(this, _currentNode, val);
  }

  get nodes() {
    return _classPrivateFieldGet(this, _nodes);
  }

  set nodes(val) {
    _classPrivateFieldSet(this, _nodes, val);
  }
  /**
   * Add a new node to this program
   * @param {Node} node The node to add
   */


  addNode(node) {
    _classPrivateFieldGet(this, _nodes).push(node); // Set this program to the node


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

    _classPrivateFieldSet(this, _nodes, _classPrivateFieldGet(this, _nodes).filter(n => n.id !== node.id));

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
    _classPrivateFieldGet(this, _enter).output("Val").value = this.input("Val").value;
    await this.processFrom(_classPrivateFieldGet(this, _enter));
    this.output("Val").value = _classPrivateFieldGet(this, _exit).input("Val").value;
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

exports.Program = Program;

_defineProperty(Program, "instance", () => new Program());

_defineProperty(Program, "version", 1);
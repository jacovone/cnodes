"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Result = exports.Node = undefined;

var _socket = require("./socket.js");

var _type = require("./type.js");

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
class Node {
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
  constructor(name, title = name) {
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

  get title() {
    return _classPrivateFieldGet(this, _title);
  }

  set title(val) {
    _classPrivateFieldSet(this, _title, val);
  }

  get functional() {
    return _classPrivateFieldGet(this, _functional);
  }

  set functional(val) {
    _classPrivateFieldSet(this, _functional, val);
  }

  get inputs() {
    return _classPrivateFieldGet(this, _inputs);
  }

  set inputs(val) {
    _classPrivateFieldSet(this, _inputs, val);
  }

  get outputs() {
    return _classPrivateFieldGet(this, _outputs);
  }

  set outputs(val) {
    _classPrivateFieldSet(this, _outputs, val);
  }

  get nexts() {
    return _classPrivateFieldGet(this, _nexts);
  }

  set nexts(val) {
    _classPrivateFieldSet(this, _nexts, val);
  }

  get prev() {
    return _classPrivateFieldGet(this, _prev);
  }

  set prev(val) {
    _classPrivateFieldSet(this, _prev, val);
  }

  get program() {
    return _classPrivateFieldGet(this, _program);
  }

  set program(val) {
    _classPrivateFieldSet(this, _program, val);
  }

  get removable() {
    return _classPrivateFieldGet(this, _removable);
  }

  set removable(val) {
    _classPrivateFieldSet(this, _removable, val);
  }

  get creatable() {
    return _classPrivateFieldGet(this, _creatable);
  }

  set creatable(val) {
    _classPrivateFieldSet(this, _creatable, val);
  }

  get canAddInput() {
    return _classPrivateFieldGet(this, _canAddInput);
  }

  set canAddInput(val) {
    _classPrivateFieldSet(this, _canAddInput, val);
  }

  get canAddOutput() {
    return _classPrivateFieldGet(this, _canAddOutput);
  }

  set canAddOutput(val) {
    _classPrivateFieldSet(this, _canAddOutput, val);
  }

  get canAddNext() {
    return _classPrivateFieldGet(this, _canAddNext);
  }

  set canAddNext(val) {
    _classPrivateFieldSet(this, _canAddNext, val);
  }

  get meta() {
    return _classPrivateFieldGet(this, _meta);
  }

  set meta(val) {
    _classPrivateFieldSet(this, _meta, val);
  }
  /**
   * Returns the input by name
   * @param {string} name Name of the input
   */


  input(name) {
    return this.inputs.find(i => i.name === name);
  }
  /**
   * Returns the output by name
   * @param {string} name The name of the output
   */


  output(name) {
    return this.outputs.find(o => o.name === name);
  }
  /**
   * Returns the next by name
   * @param {string} name The name of the next
   */


  next(name) {
    if (!name) {
      return this.nexts[0];
    }

    return this.nexts.find(n => n.name === name);
  }
  /**
   * Evaluate all imputs of this node. Inputs are sockets.
   * If the socket is connected the evaluation will search
   * for the socket's peer and evaluate the output counterpart
   * eventually reprocess the output's nod, if the node is
   * functional
   */


  async evaluateInputs() {
    for (let inp of this.inputs) {
      await inp.evaluate();
    }
  }
  /**
   * This is an helper method to construct a Result instance
   * by name
   * @param {Socket} socket The Socket on which construct the Result instance
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
    if (_classPrivateFieldGet(this, _prev)) {
      while (_classPrivateFieldGet(this, _prev).peers.length > 0) {
        _classPrivateFieldGet(this, _prev).disconnect(_classPrivateFieldGet(this, _prev).peers[0]);

        _classPrivateFieldGet(this, _prev).peers.splice(0, 1);
      }
    }

    for (let i of _classPrivateFieldGet(this, _inputs)) {
      if (i.peer) {
        i.disconnect();
      }
    }

    for (let o of _classPrivateFieldGet(this, _outputs)) {
      while (o.peers.length > 0) {
        o.peers[0].disconnect();
        o.peers.splice(0, 1);
      }
    }

    for (let n of _classPrivateFieldGet(this, _nexts)) {
      if (n.peer) {
        n.disconnect();
      }
    }
  }
  /**
   * If this.#canAddInput is true, the user can add an input
   * Subclass with variable number of input should override this method
   */


  addInput() {
    throw new Error("Can't add input!");
  }
  /**
   * This method removes a specific input from the node, if
   * this is possible whit this instance
   * Subclass with variable number of input should override this method
   * @param {InputSocket} input The input to remove
   */


  removeInput(input) {
    throw new Error("Can't remove input");
  }
  /**
   * Can this node remove a specific input?
   * Subclass with variable number of input should override this method
   * @param {InputSocket} input The input to remove
   */


  canRemoveInput(input) {
    return false;
  }
  /**
   * If this.#canAddOutput is true, the user can add an output
   * Subclass with variable number of output should override this method
   */


  addOutput() {
    throw new Error("Can't add output!");
  }
  /**
   * This method removes a specific output from the node, if
   * this is possible whit this instance
   * Subclass with variable number of output should override this method
   * @param {OutputSocket} output The output to remove
   */


  removeOutput(output) {
    throw new Error("Can't remove output");
  }
  /**
   * Can this node remove a specific output?
   * Subclass with variable number of output should override this method
   * @param {OutputSocket} output The output to remove
   */


  canRemoveOutput(output) {
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


  canBeConnected(thisSocket, otherSocket) {
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


  async process() {
    return new Result();
  }
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


  clone(factory = () => new Node("Node")) {
    let n = factory(); // Copy all inputs

    n.inputs = [];

    for (let i of this.inputs) {
      let cloneI = i.clone();
      cloneI.node = n;
      n.inputs.push(cloneI);
    } // Copy all outputs


    n.outputs = [];

    for (let o of this.outputs) {
      let cloneO = o.clone();
      cloneO.node = n;
      n.outputs.push(cloneO);
    } // Copy all nexts


    n.nexts = [];

    for (let nx of this.nexts) {
      let cloneNx = nx.clone();
      cloneNx.node = n;
      n.nexts.push(cloneNx);
    } // Copy prev


    n.prev = null;

    if (this.prev) {
      let clonePrev = this.prev.clone();
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

}

exports.Node = Node;
/**
 * The result class used by programs to receive
 * the next "next" in the flow
 */

_defineProperty(Node, "lastNodeIdIndex", 0);

var _next = new WeakMap();

class Result {
  /** The next node */

  /**
   * Construct a new Result
   * @param {Socket} next The next socket to follow
   */
  constructor(next = null) {
    _next.set(this, {
      writable: true,
      value: null
    });

    _classPrivateFieldSet(this, _next, next);
  }

  get next() {
    return _classPrivateFieldGet(this, _next);
  }

  set next(val) {
    _classPrivateFieldSet(this, _next, val);
  }

}

exports.Result = Result;
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
  static lastNodeIdIndex: number;
  /**
   * Construct a new Node
   * @param {string} name The name of the node
   * @param {string} title The title of the node
   */
  constructor(name?: string, title?: string);
  set id(arg: any);
  get id(): any;
  set name(arg: string);
  get name(): string;
  set title(arg: string);
  get title(): string;
  set functional(arg: boolean);
  get functional(): boolean;
  set inputs(arg: any[]);
  get inputs(): any[];
  set outputs(arg: any[]);
  get outputs(): any[];
  set nexts(arg: any[]);
  get nexts(): any[];
  set prev(arg: any);
  get prev(): any;
  set program(arg: any);
  get program(): any;
  set removable(arg: boolean);
  get removable(): boolean;
  set creatable(arg: boolean);
  get creatable(): boolean;
  set canAddInput(arg: boolean);
  get canAddInput(): boolean;
  set canAddOutput(arg: boolean);
  get canAddOutput(): boolean;
  set canAddNext(arg: boolean);
  get canAddNext(): boolean;
  set meta(arg: any);
  get meta(): any;
  /**
   * Returns the input by name
   * @param {string} name Name of the input
   */
  input(name: string): any;
  /**
   * Returns the output by name
   * @param {string} name The name of the output
   */
  output(name: string): any;
  /**
   * Returns the next by name
   * @param {string} name The name of the next
   */
  next(name: string): any;
  /**
   * Evaluate all imputs of this node. Inputs are sockets.
   * If the socket is connected the evaluation will search
   * for the socket's peer and evaluate the output counterpart
   * eventually reprocess the output's nod, if the node is
   * functional
   */
  evaluateInputs(): Promise<void>;
  /**
   * This is an helper method to construct a Result instance
   * by name
   * @param {Socket} socket The Socket on which construct the Result instance
   */
  getFlowResult(socket: Socket): Result;
  /**
   * This method disconnect all sockets from the node
   */
  disconnectAllSockets(): void;
  /**
   * If this.#canAddInput is true, the user can add an input
   * Subclass with variable number of input should override this method
   */
  addInput(): void;
  /**
   * This method removes a specific input from the node, if
   * this is possible whit this instance
   * Subclass with variable number of input should override this method
   * @param {InputSocket} input The input to remove
   */
  removeInput(input: any): void;
  /**
   * Can this node remove a specific input?
   * Subclass with variable number of input should override this method
   * @param {InputsSocket} input The input to remove
   */
  canRemoveInput(input: any): boolean;
  /**
   * If this.#canAddOutput is true, the user can add an output
   * Subclass with variable number of output should override this method
   */
  addOutput(): void;
  /**
   * This method removes a specific output from the node, if
   * this is possible whit this instance
   * Subclass with variable number of output should override this method
   * @param {OutputSocket} output The output to remove
   */
  removeOutput(output: OutputSocket): void;
  /**
   * Can this node remove a specific output?
   * Subclass with variable number of output should override this method
   * @param {OutputSocket} output The output to remove
   */
  canRemoveOutput(output: OutputSocket): boolean;
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
  canBeConnected(thisSocket: Socket, otherSocket: Socket): boolean;
  /** The base version of the node does nothing */
  process(): Promise<Result>;
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
  clone(factory?: Function): any;
  #private;
}
/**
 * The result class used by programs to receive
 * the next "next" in the flow
 */
export class Result {
  /**
   * Construct a new Result
   * @param {Socket} next The next socket to follow
   */
  constructor(next?: Socket);
  set next(arg: any);
  get next(): any;
  #private;
}
import { Socket } from "./socket.js";
import { OutputSocket } from "./socket.js";

/**
 * A program is a special node that contains nodes. The program
 * manages the flow of the global execution by starting from the
 * "Enter" default, autocreated node, call its process() method and receive the next
 * "next". A program also store a global variable space
 */
export class Program extends Node {
  static instance: () => Program;
  /** Engine version */
  static version: number;
  /**
   * This method clone a group of nodes, by reconstructing the
   * connections from sockets too. All connections involvong nodes
   * outside this set will be not reconstructed.
   * @param {Node[]} nodes Nodes (and) connections to clone
   */
  static cloneNodes(nodes: Node[]): any[];
  /** The event emitter connected to the program */
  events: EventEmitter;
  set vars(arg: Map<any, any>);
  get vars(): Map<any, any>;
  set enter(arg: any);
  get enter(): any;
  set exit(arg: any);
  get exit(): any;
  set currentNode(arg: any);
  get currentNode(): any;
  set nodes(arg: any[]);
  get nodes(): any[];
  /**
   * Add a new node to this program
   * @param {Node} node The node to add
   */
  addNode(node: Node): Program;
  /**
   * Removes a node from this program, disconnect all sockets
   * @param {Node} node The node to remove
   */
  removeNode(node: Node): Program;
  /**
   * Execute a program useng node as starting point
   * @param {Node} node Starting point node
   */
  processFrom(node: Node): Promise<void>;
  #private;
}
import { Node } from "./node.js";
import { EventEmitter } from "events";

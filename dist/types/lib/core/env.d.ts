/**
 * This class represents a main global environment for cnodes.
 * The class is a "static" class that is responible for maintaining a global
 * registry of registered nodes. A node registration is a object with three fields: a node name,
 * a category name and a factory, that returns a new instance for that node.
 * The global Env instance must be initialized one-time by calling the Env.init() method,
 * this method register all built-in nodes. Eventual custom nodes must be registered manually
 * via Env.registerNode(name, category, factory).
 */
export class Env {
    /** The internal node registry */
    static "__#11@#nodeRegistry": Map<any, any>;
    /**
     * Initialize the CNodes global environment
     */
    static init(): void;
    /**
     * Register a node type
     * @param {string} name The name of the node
     * @param {string} category The category of the node
     * @param {any} factory A class that instantiate the node
     */
    static registerNode(name: string, category: string, factory: any): void;
    /**
     * Return the list of unique registered categories
     */
    static getCategories(): any[];
    /**
     * Return an array of registrations for nodes.
     * Registrations have the sign: {name, category, factory}
     * @param {string} category The category for which seacrh registrations
     */
    static getCategoryNodes(category: string): any[];
    /**
     * Instantiate a node by name
     * @param {string} name The name of the node
     */
    static getInstance(name: string): any;
    /**
     * Create helper maker nodes to support user with dealing with
     * specific object structures. This method accepts optional
     * options that let you specify what exactly create:
     * {
     *   recursive: true,
     *   fillValues: true,
     *   forceTypes: true
     *   editableInputs: true
     * }
     *
     * @param {any} obj The object structure to consider whiel create nodes
     * @param {any} opts The options on create nodes
     */
    static registerMaker(name: any, obj: any, opts?: any): void;
    /**
     * Create helper breaker nodes to support user with dealing with
     * specific object structures. This method accepts optional
     * options that let you specify what exactly create:
     * {
     *   recursive: true,
     *   forceTypes: true,
     *   editableOutputs: true
     * }
     *
     * @param {any} obj The object structure to consider whiel create nodes
     * @param {any} opts The options on create nodes
     */
    static registerBreaker(name: any, obj: any, opts?: any): void;
    /**
     * Create both helper maker and breaker nodes to support user with dealing with
     * specific object structures. This method accepts optional
     * options that let you specify what exactly create:
     * {
     *   recursive: true,
     *   fillValues: true,
     *   forceTypes: true,
     *   editableInputs: true
     *   editableOutputs: true
     * }
     *
     * @param {any} obj The object structure to consider whiel create nodes
     * @param {any} opts The options on create nodes
     */
    static registerObject(name: any, obj: any, opts?: any): void;
    /**
     * Creates and returns a JSON representation of the entire program
     * @param {Program} program The program to export
     */
    static export(program: Program): {
        id: any;
        version: number;
        lastNodeIndex: number;
        lastSocketIndex: number;
        enter: any;
        exit: any;
        nodes: any[];
        connections: any[];
    };
    /**
     * Create a program instance based on export data created with export() method
     * @param {any} data A object with the export data format
     */
    static import(data: any): Program;
}
import { Program } from "./program.js";

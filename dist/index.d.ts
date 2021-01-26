

declare module cnui {
    export namespace Types {
        const NUMBER: string;
        const STRING: string;
        const BOOLEAN: string;
        const OBJECT: string;
        const ARRAY: string;
        const ANY: string;
    }
    /**
     * A socket is an object that represent an input,
     * output, next or prev for the node
     */
    export class Socket {
        /** An incremental index to generate unique socket IDs */
        static lastSocketIdIndex: number;
        /**
         * Construct a new socket on a node with a given name
         * @param {string} name The name of the socket
         * @param {Node} node The parent node of the socket
         */
        constructor(name: string, node: Node);
        set id(arg: string);
        get id(): string;
        set name(arg: string);
        get name(): string;
        set node(arg: any);
        get node(): any;
        /** Clone the spcket */
        clone(): void;
        #private;
    }
    /**
     * The value socket represent a input or a output value
     * for the node, so it has a value and a type
     */
    export class ValueSocket extends Socket {
        /**
         * Construct a new ValueSocket
         * @param {string} name Name of the socket
         * @param {Node} node The parent node
         * @param {Type} type The type of this socket
         * @param {any} value The default value of the socket
         */
        constructor(name: string, node: Node, type?: any, value?: any);
        set type(arg: string);
        get type(): string;
        set value(arg: number);
        get value(): number;
        set canEditName(arg: boolean);
        get canEditName(): boolean;
        set canEditType(arg: boolean);
        get canEditType(): boolean;
        /**
         * This method evaluates a socket in terms of the real value
         * that is staying inside. The meaning is different in case of
         * InputSocket and OutputSocket, that re-defines this method
         */
        evaluate(): void;
        #private;
    }
    /**
     * This is an input socket value for the node, it
     * can have only a peer socket, because its value
     * have to be defined in a deterministic way
     */
    export class InputSocket extends ValueSocket {
        /**
         * Construct a new InputSocket
         * @param {string} name The name of the socket
         * @param {Node} node The parent node
         * @param {Type} type The type of the socket
         * @param {any} value The default value of the socket
         */
        constructor(name: string, node: Node, type?: any, value?: any);
        set peer(arg: any);
        get peer(): any;
        /**
         * Connect this socket to another (output) socket
         * @param {Socket} socket The output socket to connect
         */
        connect(socket: Socket): void;
        /**
         * Disconnects this socket from its peer
         */
        disconnect(): void;
        #private;
    }
    /**
     * This is a output value socket and represent an output
     * value for the node. Output value socket can be connected to
     * many peer input value sockets, because many socket would like
     * to take the value from this.
     */
    export class OutputSocket extends ValueSocket {
        /**
         * Construct a new OutputSocket
         * @param {string} name The name of the socket
         * @param {Node} node The parent node
         * @param {Type} type The type of the socket
         * @param {any} value The default value of the socket
         */
        constructor(name: string, node: Node, type: any, value: any, cached: any);
        set peers(arg: any[]);
        get peers(): any[];
        set cached(arg: boolean);
        get cached(): boolean;
        /**
         * Connects this socket to a input socket
         * @param {Socket} socket Socket to connect to
         */
        connect(socket: Socket): void;
        /**
         * Disconnect this socket from a specific input peer
         * @param {Socket} socket The socket to disconnect
         */
        disconnect(socket: Socket): void;
        #private;
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
        constructor(name: any, node: Node);
        #private;
    }
    /**
     * This class representa a prev socket, a socket that
     * can be connected to other nexts sockets. The prev socket
     * cab have many peer (next) socket because the execution
     * can come from anywhere in the program
     */
    export class PrevSocket extends FlowSocket {
        /**
         * Construct a new PrevSocket
         * @param {string} name Name of the socket
         * @param {Node} node Parent node
         */
        constructor(name: string, node: Node);
        set peers(arg: any[]);
        get peers(): any[];
        /**
         * Connect this socket to a next socket
         * @param {Socket} socket The next socket to connect
         */
        connect(socket: Socket): void;
        /**
         * Disconnect this socket from a next socket
         * @param {Socket} socket The next socket to disconnect
         */
        disconnect(socket: Socket): void;
        #private;
    }
    /**
     * This class represents a socket to redirect the flow
     * to another node via a node's prev socket. This socket can
     * be connected to only one (prev) socket, because the program
     * flow have to be well defined
     */
    export class NextSocket extends FlowSocket {
        /**
         * Construct a new NextSocket
         * @param {string} name Name of the socket
         * @param {Node} node The parent node of the socket
         */
        constructor(name: string, node: Node);
        set peer(arg: any);
        get peer(): any;
        /**
         * Connect this socket to another (prev) socket
         * @param {Socket} socket The prev socket to connect to
         */
        connect(socket: Socket): void;
        /**
         * Disconnect this socket from the peer
         */
        disconnect(): void;
        #private;
    }
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
         * @param {string} [name] The name of the node
         * @param {string} [title] The title of the node
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
    /**
     * This class implements a cnode that is the starting point for a
     * program. The program can be top-level or not
     */
    export class Enter extends Node {
        static instance: () => Enter;
        #private;
    }
    /**
     * This class implements a cnode that is the starting point for a
     * program. The program can be top-level or not
     */
    export class Exit extends Node {
        static instance: () => Exit;
        #private;
    }
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
        events: any;
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
    /**
     * This class implements a subroutine/function call
     */
    export class Call extends Node {
        static instance: () => Call;
        #private;
    }

    /**
     * This class implements a cnode that print to the
     * console the input value
     */
    export class Console extends Node {
        static instance: () => Console;
        #private;
    }
    /**
     * This class implements a functional GetVar node,
     * a node to read a variable's value from the global
     * program's space
     */
    export class FGetvar extends Node {
        static instance: () => FGetvar;
        #private;
    }
    /**
     * This class implements a node that is able to
     * iterate over a range of integers, like the form
     * for(let i=start; i<end; i++) do();
     */
    export class For extends Node {
        static instance: () => For;
        #private;
    }
    /**
     * This class implements a node to get a variable's value
     * in the program's global space. This node has a functional
     * counterpart naamed FGetvar
     */
    export class Getvar extends Node {
        static instance: () => Getvar;
        #private;
    }
    /**
     * This class implements a node to set a variable
     * value in the program's global space. If the variable
     * don't exists, the processo function will create it
     */
    export class Setvar extends Node {
        static instance: () => Setvar;
        #private;
    }
    /**
     * This class implements a node that is able to
     * iterate until a condition become false, like
     * while(condition) do();
     */
    export class While extends Node {
        static instance: () => While;
        #private;
    }
    /**
     * This class implements a node that is able to
     * redirect the flow of execution based on the
     * "condition" input value
     */
    export class If extends Node {
        static instance: () => If;
        #private;
    }
    /**
     * This class implements a cnode that pushes a value
     * into an array
     */
    export class APush extends Node {
        static instance: () => APush;
        #private;
    }
    /**
     * This class implements a node to get an array
     * as a string constant by JSON.parse() the input string.
     */
    export class FAConst extends Node {
        static instance: () => FAConst;
        #private;
    }
    /**
     * This class implements a node to get an array
     * from a list of inputs
     */
    export class FAMake extends Node {
        static instance: () => FAMake;
        #private;
    }
    /**
     * This class implements a functional node for pick
     * a single value from an array
     */
    export class FAGet extends Node {
        static instance: () => FAGet;
        #private;
    }
    /**
     * This class implements a functional node for get
     * the length of an array
     */
    export class FALength extends Node {
        static instance: () => FALength;
        #private;
    }
    /**
     * This class implements a functional node for adding numeric values.
     * Supports a indefinite number of value inputs and one single output
     */
    export class FAdd extends Node {
        static instance: () => FAdd;
        #private;
    }
    /**
     * This class implements a functional node for divide numeric values.
     */
    export class FDiv extends Node {
        static instance: () => FDiv;
        #private;
    }
    /**
     * This class implements a functional node for multiply numeric values.
     * Supports a indefinite number of value inputs and one single output
     */
    export class FMul extends Node {
        static instance: () => FMul;
        #private;
    }
    /**
     * This class implements a functional node for Square Root.
     */
    export class FSqrt extends Node {
        static instance: () => FSqrt;
        #private;
    }
    export namespace Comparision {
        const EQUAL: string;
        const GT: string;
        const GTE: string;
        const LT: string;
        const LTE: string;
        const NOT_EQUAL: string;
    }
    /**
     * This class implements a functional node for compairing numeric values.
     */
    export class FCompare extends Node {
        static instance: () => FCompare;
        /**
         * Construct a new FCompare node
         * @param {Comparision} comparision The comparision type
         */
        constructor(comparision?: {
            EQUAL: string;
            GT: string;
            GTE: string;
            LT: string;
            LTE: string;
            NOT_EQUAL: string;
        });
        set comparision(arg: string);
        get comparision(): string;
        #private;
    }
    /**
     * This class override the FCompare node with a comparision of EQUAL
     */
    export class FEqual extends FCompare {
        #private;
    }
    /**
     * This class override the FCompare node with a comparision of GT
     */
    export class FGT extends FCompare {
        #private;
    }
    /**
     * This class override the FCompare node with a comparision of GTE
     */
    export class FGTE extends FCompare {
        #private;
    }
    /**
     * This class override the FCompare node with a comparision of FLT
     */
    export class FLT extends FCompare {
        #private;
    }
    /**
     * This class override the FCompare node with a comparision of FLTE
     */
    export class FLTE extends FCompare {
        #private;
    }
    /**
     * This class override the FCompare node with a comparision of NOT_EQUAL
     */
    export class FNotEqual extends FCompare {
        #private;
    }
    /**
     * This class implements a node to get return a simple
     * string constant. This is a functional node.
     */
    export class FSConst extends Node {
        static instance: () => FSConst;
        #private;
    }
    /**
     * This class implements a node that conctas two strings.
     * If other type are passed, these are converted to strings
     */
    export class FConcat extends Node {
        static instance: () => FConcat;
        #private;
    }
    /**
     * This class implements a functional node for modulus (%)
     */
    export class FMod extends Node {
        static instance: () => FMod;
        #private;
    }
    /**
     * This class implements a functional conditional node
     */
    export class FIf extends Node {
        static instance: () => FIf;
        #private;
    }
    /**
     * This class implements a node to get return a simple
     * number constant. This is a functional node.
     */
    export class FNConst extends Node {
        static instance: () => FNConst;
        #private;
    }
    /**
     * This class implements a node to get an object
     * from a list of fields
     */
    export class FOMake extends Node {
        static instance: () => FOMake;
        #private;
    }
    /**
     * This class implements a node to break down
     * an object to its fields, or part of them
     */
    export class FOBreak extends Node {
        static instance: () => FOBreak;
        #private;
    }
    /**
     * This class implements a cnode that map an array to another
     * by passing all items in sequence
     */
    export class AMap extends Node {
        static instance: () => AMap;
        #private;
    }
    /**
     * This class implements a cnode that reduces an array to
     * a value
     */
    export class AReduce extends Node {
        static instance: () => AReduce;
        #private;
    }
    /**
     * This is the functional version of the FAMap node
     */
    export class FAMap extends AMap {
        static instance: () => FAMap;
        #private;
    }
    /**
     * This is the functional version of the FAReduce node
     */
    export class FAReduce extends AReduce {
        static instance: () => FAReduce;
        #private;
    }
    /**
     * This class implements a cnode that log a message through
     * the events system
     */
    export class Log extends Node {
        /** Return an instance of this node */
        static instance: () => Log;
        #private;
    }
    /**
     * This class implements a functional node for ToFixed()
     * javascript number method.
     */
    export class FTofixed extends Node {
        static instance: () => FTofixed;
        #private;
    }
    /**
     * This class implements a cnode that waits for a specified
     * number of seconds
     */
    export class Wait extends Node {
        /** Return an instance of this node */
        static instance: () => Wait;
        #private;
    }
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
  }

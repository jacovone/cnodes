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

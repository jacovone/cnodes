/**
 * This class implements a cnode that log a message through
 * the events system
 */
export class Log extends Node {
    /** Return an instance of this node */
    static instance: () => Log;
    #private;
}
import { Node } from "../core/node.js";

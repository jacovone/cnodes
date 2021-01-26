/**
 * This class implements a cnode that waits for a specified
 * number of seconds
 */
export class Wait extends Node {
    /** Return an instance of this node */
    static instance: () => Wait;
    #private;
}
import { Node } from "../core/node.js";

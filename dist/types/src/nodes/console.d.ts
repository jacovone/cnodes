/**
 * This class implements a cnode that print to the
 * console the input value
 */
export class Console extends Node {
    static instance: () => Console;
    #private;
}
import { Node } from "../core/node.js";

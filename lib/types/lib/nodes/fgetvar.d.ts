/**
 * This class implements a functional GetVar node,
 * a node to read a variable's value from the global
 * program's space
 */
export class FGetvar extends Node {
    static instance: () => FGetvar;
    #private;
}
import { Node } from "../core/node.js";

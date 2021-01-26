/**
 * This class implements a node to break down
 * an object to its fields, or part of them
 */
export class FOBreak extends Node {
    static instance: () => FOBreak;
    #private;
}
import { Node } from "../../core/node.js";

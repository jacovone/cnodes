/**
 * This class implements a node to get return a simple
 * string constant. This is a functional node.
 */
export class FSConst extends Node {
    static instance: () => FSConst;
    #private;
}
import { Node } from "../../core/node.js";

/**
 * This class implements a node to get return a simple
 * number constant. This is a functional node.
 */
export class FNConst extends Node {
    static instance: () => FNConst;
    #private;
}
import { Node } from "../../core/node.js";

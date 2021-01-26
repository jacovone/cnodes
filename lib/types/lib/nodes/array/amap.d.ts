/**
 * This class implements a cnode that map an array to another
 * by passing all items in sequence
 */
export class AMap extends Node {
    static instance: () => AMap;
    #private;
}
import { Node } from "../../core/node.js";

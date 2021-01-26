/**
 * This class implements a node to get an array
 * as a string constant by JSON.parse() the input string.
 */
export class FAConst extends Node {
    static instance: () => FAConst;
    #private;
}
import { Node } from "../../core/node.js";

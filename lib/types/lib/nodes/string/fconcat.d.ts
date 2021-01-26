/**
 * This class implements a node that conctas two strings.
 * If other type are passed, these are converted to strings
 */
export class FConcat extends Node {
    static instance: () => FConcat;
    #private;
}
import { Node } from "../../core/node.js";

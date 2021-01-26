/**
 * This class implements a functional node for adding numeric values.
 * Supports a indefinite number of value inputs and one single output
 */
export class FAdd extends Node {
    static instance: () => FAdd;
    #private;
}
import { Node } from "../../core/node.js";

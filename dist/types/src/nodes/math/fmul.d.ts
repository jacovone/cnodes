/**
 * This class implements a functional node for multiply numeric values.
 * Supports a indefinite number of value inputs and one single output
 */
export class FMul extends Node {
    static instance: () => FMul;
    #private;
}
import { Node } from "../../core/node.js";

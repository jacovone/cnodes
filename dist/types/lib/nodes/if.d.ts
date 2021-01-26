/**
 * This class implements a node that is able to
 * redirect the flow of execution based on the
 * "condition" input value
 */
export class If extends Node {
    static instance: () => If;
    #private;
}
import { Node } from "../core/node.js";

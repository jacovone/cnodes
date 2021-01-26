/**
 * This class implements a node that is able to
 * iterate until a condition become false, like
 * while(condition) do();
 */
export class While extends Node {
    static instance: () => While;
    #private;
}
import { Node } from "../core/node.js";

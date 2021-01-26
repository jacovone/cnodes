/**
 * This class implements a node that is able to
 * iterate over a range of integers, like the form
 * for(let i=start; i<end; i++) do();
 */
export class For extends Node {
    static instance: () => For;
    #private;
}
import { Node } from "../core/node.js";

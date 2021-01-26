/**
 * This class implements a node to get a variable's value
 * in the program's global space. This node has a functional
 * counterpart naamed FGetvar
 */
export class Getvar extends Node {
    static instance: () => Getvar;
    #private;
}
import { Node } from "../core/node.js";

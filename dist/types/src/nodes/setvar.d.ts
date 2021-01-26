/**
 * This class implements a node to set a variable
 * value in the program's global space. If the variable
 * don't exists, the processo function will create it
 */
export class Setvar extends Node {
    static instance: () => Setvar;
    #private;
}
import { Node } from "../core/node.js";

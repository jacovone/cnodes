/**
 * This class implements a cnode that is the starting point for a
 * program. The program can be top-level or not
 */
export class Exit extends Node {
    static instance: () => Exit;
    #private;
}
import { Node } from "./node.js";

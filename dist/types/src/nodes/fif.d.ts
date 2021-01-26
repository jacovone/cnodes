/**
 * This class implements a functional conditional node
 */
export class FIf extends Node {
    static instance: () => FIf;
    #private;
}
import { Node } from "../core/node.js";

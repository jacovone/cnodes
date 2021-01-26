/**
 * This class implements a subroutine/function call
 */
export class Call extends Node {
    static instance: () => Call;
    #private;
}
import { Node } from "../core/node.js";

export namespace Comparision {
    const EQUAL: string;
    const GT: string;
    const GTE: string;
    const LT: string;
    const LTE: string;
    const NOT_EQUAL: string;
}
/**
 * This class implements a functional node for compairing numeric values.
 */
export class FCompare extends Node {
    static instance: () => FCompare;
    constructor(comparision?: string);
    set comparision(arg: string);
    get comparision(): string;
    #private;
}
import { Node } from "../../core/node.js";

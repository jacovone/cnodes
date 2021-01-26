/**
 * This is the functional version of the FAReduce node
 */
export class FAReduce extends AReduce {
    static instance: () => FAReduce;
    #private;
}
import { AReduce } from "./areduce.js";

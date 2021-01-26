/**
 * This is the functional version of the FAMap node
 */
export class FAMap extends AMap {
    static instance: () => FAMap;
    #private;
}
import { AMap } from "./amap.js";

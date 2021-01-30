"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FAMap = undefined;

var _socket = require("../../core/socket.js");

var _amap = require("./amap.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This is the functional version of the FAMap node
 */
class FAMap extends _amap.AMap {
  // Provide a node instance

  /**
   * Construct a new FAMap node
   */
  constructor() {
    super();
    this.name = "FAMap";
    this.title = "FAMap";
    this.functional = true;
    this.nexts = [new _socket.NextSocket("Do", this)];
    this.prev = null;
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = FAMap.instance) {
    return super.clone(factory);
  }

}

exports.FAMap = FAMap;

_defineProperty(FAMap, "instance", () => new FAMap());
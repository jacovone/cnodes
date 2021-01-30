"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FAReduce = undefined;

var _socket = require("../../core/socket.js");

var _areduce = require("./areduce.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This is the functional version of the FAReduce node
 */
class FAReduce extends _areduce.AReduce {
  // Provide a node instance

  /**
   * Construct a new FACompareNode
   */
  constructor() {
    super();
    this.name = "FAReduce";
    this.title = "FAReduce";
    this.functional = true;
    this.nexts = [new _socket.NextSocket("Do", this)];
    this.prev = null;
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = FAReduce.instance) {
    return super.clone(factory);
  }

}

exports.FAReduce = FAReduce;

_defineProperty(FAReduce, "instance", () => new FAReduce());
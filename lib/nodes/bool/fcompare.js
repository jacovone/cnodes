"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FCompare = exports.Comparision = undefined;

var _node = require("../../core/node.js");

var _socket = require("../../core/socket.js");

var _type = require("../../core/type.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

/**
 * Supported comparision types
 */
const Comparision = exports.Comparision = {
  EQUAL: "equal",
  GT: "gt",
  GTE: "gte",
  LT: "lt",
  LTE: "lte",
  NOT_EQUAL: "not_equal"
};
/**
 * This class implements a functional node for compairing numeric values.
 */

var _comparision = new WeakMap();

class FCompare extends _node.Node {
  // Provide a node instance

  /** Configured comparision for this node */

  /**
   * Construct a new FCompare node
   * @param {Comparision} comparision The comparision type
   */
  constructor(comparision = Comparision.EQUAL) {
    super("FCompare");

    _comparision.set(this, {
      writable: true,
      value: Comparision.EQUAL
    });

    _classPrivateFieldSet(this, _comparision, comparision); // The node is pure functional


    this.functional = true; // Default to two numeric inputs

    this.inputs = [new _socket.InputSocket("Val1", this, _type.Types.ANY, 0), new _socket.InputSocket("Val2", this, _type.Types.ANY, 0)];
    this.outputs = [new _socket.OutputSocket("Val", this, _type.Types.BOOLEAN, 0, false)];
    this.prev = null;
    this.nexts = [];
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = FCompare.instance) {
    return super.clone(factory);
  }

  get comparision() {
    return _classPrivateFieldGet(this, _comparision);
  }

  set comparision(val) {
    _classPrivateFieldSet(this, _comparision, val);
  }
  /**
   * The process override
   */


  async process() {
    await this.evaluateInputs();
    let val1 = this.input("Val1").value;
    let val2 = this.input("Val2").value;
    let ret;

    switch (this.comparision) {
      case Comparision.EQUAL:
        {
          ret = val1 === val2;
          break;
        }

      case Comparision.NOT_EQUAL:
        {
          ret = val1 !== val2;
          break;
        }

      case Comparision.GT:
        {
          ret = val1 > val2;
          break;
        }

      case Comparision.GTE:
        {
          ret = val1 >= val2;
          break;
        }

      case Comparision.LT:
        {
          ret = val1 < val2;
          break;
        }

      case Comparision.LTE:
        {
          ret = val1 <= val2;
          break;
        }

      default:
        {
          throw "Comparision type not valid";
        }
    }

    this.output("Val").value = ret;
  }

  get comparision() {
    return _classPrivateFieldGet(this, _comparision);
  }

  set comparision(val) {
    _classPrivateFieldSet(this, _comparision, val);
  }

}

exports.FCompare = FCompare;

_defineProperty(FCompare, "instance", () => new FCompare());
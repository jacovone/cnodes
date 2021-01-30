"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator.js");

require("core-js/modules/es6.symbol.js");

require("core-js/modules/es6.promise.js");

require("core-js/modules/es6.reflect.get.js");

require("core-js/modules/es6.object.create.js");

require("core-js/modules/es6.regexp.to-string.js");

require("core-js/modules/es6.date.to-string.js");

require("core-js/modules/es6.reflect.construct.js");

require("core-js/modules/es6.object.set-prototype-of.js");

require("core-js/modules/es6.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FCompare = exports.Comparision = void 0;

require("core-js/modules/web.dom.iterable.js");

require("core-js/modules/es6.array.iterator.js");

require("core-js/modules/es6.object.to-string.js");

require("core-js/modules/es6.string.iterator.js");

require("core-js/modules/es6.weak-map.js");

require("regenerator-runtime/runtime.js");

var _node = require("../../core/node.js");

var _socket = require("../../core/socket.js");

var _type = require("../../core/type.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

/**
 * Supported comparision types
 */
var Comparision = {
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

exports.Comparision = Comparision;

var _comparision = new WeakMap();

var FCompare = /*#__PURE__*/function (_Node) {
  _inherits(FCompare, _Node);

  var _super = _createSuper(FCompare);

  // Provide a node instance

  /** Configured comparision for this node */

  /**
   * Construct a new FCompare node
   * @param {Comparision} comparision The comparision type
   */
  function FCompare() {
    var _this;

    var comparision = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Comparision.EQUAL;

    _classCallCheck(this, FCompare);

    _this = _super.call(this, "FCompare");

    _comparision.set(_assertThisInitialized(_this), {
      writable: true,
      value: Comparision.EQUAL
    });

    _classPrivateFieldSet(_assertThisInitialized(_this), _comparision, comparision); // The node is pure functional


    _this.functional = true; // Default to two numeric inputs

    _this.inputs = [new _socket.InputSocket("Val1", _assertThisInitialized(_this), _type.Types.ANY, 0), new _socket.InputSocket("Val2", _assertThisInitialized(_this), _type.Types.ANY, 0)];
    _this.outputs = [new _socket.OutputSocket("Val", _assertThisInitialized(_this), _type.Types.BOOLEAN, 0, false)];
    _this.prev = null;
    _this.nexts = [];
    return _this;
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  _createClass(FCompare, [{
    key: "clone",
    value: function clone() {
      var factory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : FCompare.instance;
      return _get(_getPrototypeOf(FCompare.prototype), "clone", this).call(this, factory);
    }
  }, {
    key: "process",

    /**
     * The process override
     */
    value: function () {
      var _process = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var val1, val2, ret;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.evaluateInputs();

              case 2:
                val1 = this.input("Val1").value;
                val2 = this.input("Val2").value;
                _context.t0 = this.comparision;
                _context.next = _context.t0 === Comparision.EQUAL ? 7 : _context.t0 === Comparision.NOT_EQUAL ? 9 : _context.t0 === Comparision.GT ? 11 : _context.t0 === Comparision.GTE ? 13 : _context.t0 === Comparision.LT ? 15 : _context.t0 === Comparision.LTE ? 17 : 19;
                break;

              case 7:
                ret = val1 === val2;
                return _context.abrupt("break", 20);

              case 9:
                ret = val1 !== val2;
                return _context.abrupt("break", 20);

              case 11:
                ret = val1 > val2;
                return _context.abrupt("break", 20);

              case 13:
                ret = val1 >= val2;
                return _context.abrupt("break", 20);

              case 15:
                ret = val1 < val2;
                return _context.abrupt("break", 20);

              case 17:
                ret = val1 <= val2;
                return _context.abrupt("break", 20);

              case 19:
                throw "Comparision type not valid";

              case 20:
                this.output("Val").value = ret;

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function process() {
        return _process.apply(this, arguments);
      }

      return process;
    }()
  }, {
    key: "comparision",
    get: function get() {
      return _classPrivateFieldGet(this, _comparision);
    },
    set: function set(val) {
      _classPrivateFieldSet(this, _comparision, val);
    }
  }]);

  return FCompare;
}(_node.Node);

exports.FCompare = FCompare;

_defineProperty(FCompare, "instance", function () {
  return new FCompare();
});
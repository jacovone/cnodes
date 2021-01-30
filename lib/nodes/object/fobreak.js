"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.promise.js");

require("core-js/modules/web.dom.iterable.js");

require("core-js/modules/es6.array.is-array.js");

require("core-js/modules/es7.symbol.async-iterator.js");

require("core-js/modules/es6.symbol.js");

require("core-js/modules/es6.string.iterator.js");

require("core-js/modules/es6.array.from.js");

require("core-js/modules/es6.reflect.get.js");

require("core-js/modules/es6.object.create.js");

require("core-js/modules/es6.regexp.to-string.js");

require("core-js/modules/es6.date.to-string.js");

require("core-js/modules/es6.object.to-string.js");

require("core-js/modules/es6.reflect.construct.js");

require("core-js/modules/es6.object.set-prototype-of.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FOBreak = void 0;

require("core-js/modules/es6.object.define-property.js");

require("core-js/modules/es6.array.filter.js");

require("core-js/modules/es6.function.name.js");

require("regenerator-runtime/runtime.js");

var _node = require("../../core/node.js");

var _socket = require("../../core/socket.js");

var _type = require("../../core/type.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

/**
 * This class implements a node to break down
 * an object to its fields, or part of them
 */
var FOBreak = /*#__PURE__*/function (_Node) {
  _inherits(FOBreak, _Node);

  var _super = _createSuper(FOBreak);

  // Provide a node instance

  /**
   * Construct a new FOBreak node
   */
  function FOBreak() {
    var _this;

    _classCallCheck(this, FOBreak);

    _this = _super.call(this, "FOBreak");
    _this.canAddOutput = true;
    _this.functional = true;
    _this.inputs = [new _socket.InputSocket("Val", _assertThisInitialized(_this), _type.Types.OBJECT, {})];
    _this.outputs = [new _socket.OutputSocket("field1", _assertThisInitialized(_this), _type.Types.ANY, "", false), new _socket.OutputSocket("field2", _assertThisInitialized(_this), _type.Types.ANY, "", false)]; // Sets all output as changeable in terms of name and type

    var _iterator = _createForOfIteratorHelper(_this.outputs),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var o = _step.value;
        o.canEditName = true;
        o.canEditType = true;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    _this.nexts = [];
    _this.prev = null;
    return _this;
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  _createClass(FOBreak, [{
    key: "clone",
    value: function clone() {
      var factory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : FOBreak.instance;
      return _get(_getPrototypeOf(FOBreak.prototype), "clone", this).call(this, factory);
    }
    /**
     * The process function
     */

  }, {
    key: "process",
    value: function () {
      var _process = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _iterator2, _step2, o;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.evaluateInputs();

              case 2:
                _iterator2 = _createForOfIteratorHelper(this.outputs);

                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    o = _step2.value;
                    o.value = this.input("Val").value[o.name];
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }

              case 4:
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
    /**
     * If this.#canAddOutput is true, the user can add an output
     * equal to the (at least one) output that already exists
     * Subclass with variable number of input should override this method
     */

  }, {
    key: "addOutput",
    value: function addOutput(o) {
      if (this.canAddOutput) {
        if (!o) {
          o = new _socket.OutputSocket("", this, _type.Types.ANY, "");
          o.canEditName = true;
          o.canEditType = true;
        }

        this.outputs.push(o);
      } else {
        throw new Error("Can't add output!");
      }
    }
    /**
     * This method removes a specific output from the node
     * @param {OutputSocket} output The output to remove
     */

  }, {
    key: "removeOutput",
    value: function removeOutput(output) {
      if (this.canRemoveOutput(output)) {
        this.outputs = this.outputs.filter(function (o) {
          return o !== output;
        });
      } else {
        throw new Error("Can't remove input");
      }
    }
    /**
     * Can this node remove a specific output?
     * There must be at least 1 output
     * @param {OutputSocket} output The output to remove
     */

  }, {
    key: "canRemoveOutput",
    value: function canRemoveOutput(output) {
      return this.outputs.length > 1;
    }
  }]);

  return FOBreak;
}(_node.Node);

exports.FOBreak = FOBreak;

_defineProperty(FOBreak, "instance", function () {
  return new FOBreak();
});
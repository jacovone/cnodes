"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.object.define-properties.js");

require("core-js/modules/es7.object.get-own-property-descriptors.js");

require("core-js/modules/es6.array.for-each.js");

require("core-js/modules/es6.array.iterator.js");

require("core-js/modules/es6.object.keys.js");

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
exports.FOMake = void 0;

require("core-js/modules/es6.object.define-property.js");

require("core-js/modules/es6.array.filter.js");

require("core-js/modules/es6.function.name.js");

require("core-js/modules/es6.array.reduce.js");

require("regenerator-runtime/runtime.js");

var _node = require("../../core/node.js");

var _socket = require("../../core/socket.js");

var _type = require("../../core/type.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
 * This class implements a node to get an object
 * from a list of fields
 */
var FOMake = /*#__PURE__*/function (_Node) {
  _inherits(FOMake, _Node);

  var _super = _createSuper(FOMake);

  // Provide a node instance

  /**
   * Construct a new FOMake node
   */
  function FOMake() {
    var _this;

    _classCallCheck(this, FOMake);

    _this = _super.call(this, "FOMake");
    _this.canAddInput = true;
    _this.functional = true;
    _this.inputs = [new _socket.InputSocket("field1", _assertThisInitialized(_this), _type.Types.ANY, ""), new _socket.InputSocket("field2", _assertThisInitialized(_this), _type.Types.ANY, "")]; // Sets all input as changeable in terms of name

    var _iterator = _createForOfIteratorHelper(_this.inputs),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var i = _step.value;
        i.canEditName = true;
        i.canEditType = true;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    _this.outputs = [new _socket.OutputSocket("Val", _assertThisInitialized(_this), _type.Types.OBJECT, {}, false)];
    _this.nexts = [];
    _this.prev = null;
    return _this;
  }
  /**
   * The process function
   */


  _createClass(FOMake, [{
    key: "process",
    value: function () {
      var _process = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var obj;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.evaluateInputs();

              case 2:
                obj = this.inputs.reduce(function (acc, val) {
                  return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, val.name, val.value));
                }, {});
                this.output("Val").value = obj;

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
     * Clone this node
     * @param {Function} factory The factory class function
     */

  }, {
    key: "clone",
    value: function clone() {
      var factory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : FOMake.instance;
      return _get(_getPrototypeOf(FOMake.prototype), "clone", this).call(this, factory);
    }
    /**
     * Can this node remove a specific input?
     * In this case, there must be at least 1 input
     * @param {InputsSocket} input The input to remove
     */

  }, {
    key: "canRemoveInput",
    value: function canRemoveInput(input) {
      return this.inputs.length > 0;
    }
    /**
     * If this.#canAddInput is true, the user can add an input
     * the new input must have this.#canEditName === true.
     * in this particular case the name is editable, so let the user
     * to choose and left it blank
     */

  }, {
    key: "addInput",
    value: function addInput() {
      var is = new _socket.InputSocket("", this, _type.Types.ANY, "");
      is.canEditName = true;
      is.canEditType = true;
      this.inputs.push(is);
    }
    /**
     * This method removes a specific input from the node
     * @param {InputSocket} input The input to remove
     */

  }, {
    key: "removeInput",
    value: function removeInput(input) {
      if (this.canRemoveInput(input)) {
        this.inputs = this.inputs.filter(function (i) {
          return i !== input;
        });
      } else {
        throw new Error("Can't remove input");
      }
    }
  }]);

  return FOMake;
}(_node.Node);

exports.FOMake = FOMake;

_defineProperty(FOMake, "instance", function () {
  return new FOMake();
});
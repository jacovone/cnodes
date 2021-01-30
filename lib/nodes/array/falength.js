"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator.js");

require("core-js/modules/es6.symbol.js");

require("core-js/modules/es6.promise.js");

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
exports.FALength = void 0;

require("core-js/modules/es6.object.define-property.js");

require("core-js/modules/es6.array.is-array.js");

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

/**
 * This class implements a functional node for get
 * the length of an array
 */
var FALength = /*#__PURE__*/function (_Node) {
  _inherits(FALength, _Node);

  var _super = _createSuper(FALength);

  // Provide a node instance

  /**
   * Construct a new FALength node
   */
  function FALength() {
    var _this;

    _classCallCheck(this, FALength);

    _this = _super.call(this, "FALength"); // The node is pure functional

    _this.functional = true; // Default to two numeric inputs

    _this.inputs = [new _socket.InputSocket("Array", _assertThisInitialized(_this), _type.Types.ARRAY, 0)];
    _this.outputs = [new _socket.OutputSocket("Val", _assertThisInitialized(_this), _type.Types.NUMBER, 0, false)];
    _this.prev = null;
    _this.nexts = [];
    return _this;
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  _createClass(FALength, [{
    key: "clone",
    value: function clone() {
      var factory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : FALength.instance;
      return _get(_getPrototypeOf(FALength.prototype), "clone", this).call(this, factory);
    }
    /**
     * The process override
     */

  }, {
    key: "process",
    value: function () {
      var _process = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var arr;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.evaluateInputs();

              case 2:
                arr = this.input("Array").value;

                if (!Array.isArray(arr)) {// TODO: Manage error
                } else {
                  this.output("Val").value = arr.length;
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
  }]);

  return FALength;
}(_node.Node);

exports.FALength = FALength;

_defineProperty(FALength, "instance", function () {
  return new FALength();
});
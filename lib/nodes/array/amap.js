"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AMap = void 0;

var _node = require("../../core/node.mjs");

var _socket = require("../../core/socket.mjs");

var _type = require("../../core/type.mjs");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
 * This class implements a cnode that map an array to another
 * by passing all items in sequence
 */
var AMap = /*#__PURE__*/function (_Node) {
  _inherits(AMap, _Node);

  var _super = _createSuper(AMap);

  // Provide a node instance

  /**
   * Construct a new AMap node
   */
  function AMap() {
    var _this;

    _classCallCheck(this, AMap);

    _this = _super.call(this, "AMap");
    _this.inputs = [new _socket.InputSocket("Array", _assertThisInitialized(_this), _type.Types.ARRAY), new _socket.InputSocket("Mapped", _assertThisInitialized(_this), _type.Types.ANY)];
    _this.outputs = [new _socket.OutputSocket("Array", _assertThisInitialized(_this), _type.Types.ARRAY, [], false), new _socket.OutputSocket("Item", _assertThisInitialized(_this), _type.Types.ANY, "", true), // cached
    new _socket.OutputSocket("Index", _assertThisInitialized(_this), _type.Types.NUMBER, 0, true) // cached
    ];
    _this.nexts = [new _socket.NextSocket("Out", _assertThisInitialized(_this)), new _socket.NextSocket("Do", _assertThisInitialized(_this))];
    _this.prev = new _socket.PrevSocket("In", _assertThisInitialized(_this));
    return _this;
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  _createClass(AMap, [{
    key: "clone",
    value: function clone() {
      var factory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : AMap.instance;
      return _get(_getPrototypeOf(AMap.prototype), "clone", this).call(this, factory);
    }
    /**
     * The process method
     */

  }, {
    key: "process",
    value: function () {
      var _process = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var arr, outArr, _iterator, _step, _step$value, index, item;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.evaluateInputs();

              case 2:
                arr = this.input("Array").value;
                outArr = [];

                if (Array.isArray(arr)) {
                  _context.next = 7;
                  break;
                }

                _context.next = 30;
                break;

              case 7:
                _iterator = _createForOfIteratorHelper(arr.entries());
                _context.prev = 8;

                _iterator.s();

              case 10:
                if ((_step = _iterator.n()).done) {
                  _context.next = 22;
                  break;
                }

                _step$value = _slicedToArray(_step.value, 2), index = _step$value[0], item = _step$value[1];
                // Set the "Index" output
                this.output("Index").value = index; // Set the "Item" output

                this.output("Item").value = item; // If there's a node connected to the "Item" next socket...

                if (!(this.next("Do").peer && this.next("Do").peer.node)) {
                  _context.next = 17;
                  break;
                }

                _context.next = 17;
                return this.program.processFrom(this.next("Do").peer.node);

              case 17:
                _context.next = 19;
                return this.input("Mapped").evaluate();

              case 19:
                outArr.push(this.input("Mapped").value);

              case 20:
                _context.next = 10;
                break;

              case 22:
                _context.next = 27;
                break;

              case 24:
                _context.prev = 24;
                _context.t0 = _context["catch"](8);

                _iterator.e(_context.t0);

              case 27:
                _context.prev = 27;

                _iterator.f();

                return _context.finish(27);

              case 30:
                // Set the "Array" output
                this.output("Array").value = outArr; // Compute result

                if (this.functional) {
                  _context.next = 33;
                  break;
                }

                return _context.abrupt("return", this.getFlowResult(this.next("Out")));

              case 33:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[8, 24, 27, 30]]);
      }));

      function process() {
        return _process.apply(this, arguments);
      }

      return process;
    }()
  }]);

  return AMap;
}(_node.Node);

exports.AMap = AMap;

_defineProperty(AMap, "instance", function () {
  return new AMap();
});
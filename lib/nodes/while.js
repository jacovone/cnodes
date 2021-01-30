"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.While = void 0;

var _node = require("../core/node.mjs");

var _socket = require("../core/socket.mjs");

var _type = require("../core/type.mjs");

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
 * This class implements a node that is able to
 * iterate until a condition become false, like
 * while(condition) do();
 */
var While = /*#__PURE__*/function (_Node) {
  _inherits(While, _Node);

  var _super = _createSuper(While);

  // Provide a node instance

  /**
   * Construct a new While node
   */
  function While() {
    var _this;

    _classCallCheck(this, While);

    _this = _super.call(this, "While");
    _this.inputs = [new _socket.InputSocket("Index", _assertThisInitialized(_this), _type.Types.NUMBER, 0), new _socket.InputSocket("Condition", _assertThisInitialized(_this), _type.Types.BOOLEAN, false)];
    _this.outputs = [new _socket.OutputSocket("Index", _assertThisInitialized(_this), _type.Types.NUMBER, 0)];
    _this.nexts = [new _socket.NextSocket("Out", _assertThisInitialized(_this)), new _socket.NextSocket("Do", _assertThisInitialized(_this))];
    _this.prev = new _socket.PrevSocket("In", _assertThisInitialized(_this));
    return _this;
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  _createClass(While, [{
    key: "clone",
    value: function clone() {
      var factory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : While.instance;
      return _get(_getPrototypeOf(While.prototype), "clone", this).call(this, factory);
    }
    /**
     * The process function
     */

  }, {
    key: "process",
    value: function () {
      var _process = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var prevCurrentNode, index;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.evaluateInputs();

              case 2:
                // Save the current program's node
                prevCurrentNode = this.program.currentNode; // A bouns index variable ;-)

                index = parseFloat(this.input("Index").value); // Set the "Index" output value to Index

                this.output("Index").value = index; // Re evaluate inputs in case of Condition depends on Index output

                _context.next = 7;
                return this.evaluateInputs();

              case 7:
                if (!this.input("Condition").value) {
                  _context.next = 16;
                  break;
                }

                if (!(this.next("Do").peer !== null && this.next("Do").peer.node !== null)) {
                  _context.next = 14;
                  break;
                }

                // Set the "Index" output value to Index
                this.output("Index").value = index++; // Execute a sub program beginning on that node

                _context.next = 12;
                return this.program.processFrom(this.next("Do").peer.node);

              case 12:
                _context.next = 14;
                return this.evaluateInputs();

              case 14:
                _context.next = 7;
                break;

              case 16:
                // Restore the currentprogram's node
                this.program.currentNode = prevCurrentNode;
                return _context.abrupt("return", this.getFlowResult(this.next("Out")));

              case 18:
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

  return While;
}(_node.Node);

exports.While = While;

_defineProperty(While, "instance", function () {
  return new While();
});
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator.js");

require("core-js/modules/es6.symbol.js");

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
exports.FAMap = void 0;

require("core-js/modules/es6.object.define-property.js");

require("core-js/modules/es6.function.name.js");

var _socket = require("../../core/socket.js");

var _amap = require("./amap.js");

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
 * This is the functional version of the FAMap node
 */
var FAMap = /*#__PURE__*/function (_AMap) {
  _inherits(FAMap, _AMap);

  var _super = _createSuper(FAMap);

  // Provide a node instance

  /**
   * Construct a new FAMap node
   */
  function FAMap() {
    var _this;

    _classCallCheck(this, FAMap);

    _this = _super.call(this);
    _this.name = "FAMap";
    _this.title = "FAMap";
    _this.functional = true;
    _this.nexts = [new _socket.NextSocket("Do", _assertThisInitialized(_this))];
    _this.prev = null;
    return _this;
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  _createClass(FAMap, [{
    key: "clone",
    value: function clone() {
      var factory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : FAMap.instance;
      return _get(_getPrototypeOf(FAMap.prototype), "clone", this).call(this, factory);
    }
  }]);

  return FAMap;
}(_amap.AMap);

exports.FAMap = FAMap;

_defineProperty(FAMap, "instance", function () {
  return new FAMap();
});
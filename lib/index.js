"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OSet = exports.FOBreak = exports.FOMake = exports.FAReduce = exports.AReduce = exports.FAMap = exports.AMap = exports.FALength = exports.FAGet = exports.FAMake = exports.FAConst = exports.APush = exports.FTofixed = exports.FMod = exports.FSqrt = exports.FMul = exports.FDiv = exports.FAdd = exports.FNConst = exports.FConcat = exports.FSConst = exports.FCompare = exports.Wait = exports.FIsUndefined = exports.FIsNull = exports.FIf = exports.While = exports.Setvar = exports.If = exports.Getvar = exports.For = exports.FGetvar = exports.Log = exports.Console = exports.Call = exports.Types = exports.NextSocket = exports.PrevSocket = exports.OutputSocket = exports.InputSocket = exports.Socket = exports.Program = exports.Node = exports.Env = undefined;

var _env = require("./core/env.js");

var _node = require("./core/node.js");

var _program = require("./core/program.js");

var _socket = require("./core/socket.js");

var _type = require("./core/type.js");

var _call = require("./nodes/call.js");

var _console = require("./nodes/console.js");

var _log = require("./nodes/log.js");

var _fgetvar = require("./nodes/fgetvar.js");

var _for = require("./nodes/for.js");

var _getvar = require("./nodes/getvar.js");

var _if = require("./nodes/if.js");

var _setvar = require("./nodes/setvar.js");

var _while = require("./nodes/while.js");

var _fif = require("./nodes/fif.js");

var _isnull = require("./nodes/isnull.js");

var _isundefined = require("./nodes/isundefined.js");

var _wait = require("./nodes/wait.js");

var _fcompare = require("./nodes/bool/fcompare.js");

var _fsconst = require("./nodes/string/fsconst.js");

var _fconcat = require("./nodes/string/fconcat.js");

var _fnconst = require("./nodes/math/fnconst.js");

var _fadd = require("./nodes/math/fadd.js");

var _fdiv = require("./nodes/math/fdiv.js");

var _fmul = require("./nodes/math/fmul.js");

var _fsqrt = require("./nodes/math/fsqrt.js");

var _fmod = require("./nodes/math/fmod.js");

var _ftofixed = require("./nodes/math/ftofixed.js");

var _apush = require("./nodes/array/apush.js");

var _faconst = require("./nodes/array/faconst.js");

var _famake = require("./nodes/array/famake.js");

var _faget = require("./nodes/array/faget.js");

var _falength = require("./nodes/array/falength.js");

var _amap = require("./nodes/array/amap.js");

var _famap = require("./nodes/array/famap.js");

var _areduce = require("./nodes/array/areduce.js");

var _fareduce = require("./nodes/array/fareduce.js");

var _fomake = require("./nodes/object/fomake.js");

var _fobreak = require("./nodes/object/fobreak.js");

var _oset = require("./nodes/object/oset.js");

/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020-2021
 */
// Import core nodes
// Import boolean nodes
// Import string nodes
// Import math nodes
// Import arrays nodes
// Import objects nodes
exports.Env = _env.Env;
exports.Node = _node.Node;
exports.Program = _program.Program;
exports.Socket = _socket.Socket;
exports.InputSocket = _socket.InputSocket;
exports.OutputSocket = _socket.OutputSocket;
exports.PrevSocket = _socket.PrevSocket;
exports.NextSocket = _socket.NextSocket;
exports.Types = _type.Types;
exports.Call = _call.Call;
exports.Console = _console.Console;
exports.Log = _log.Log;
exports.FGetvar = _fgetvar.FGetvar;
exports.For = _for.For;
exports.Getvar = _getvar.Getvar;
exports.If = _if.If;
exports.Setvar = _setvar.Setvar;
exports.While = _while.While;
exports.FIf = _fif.FIf;
exports.FIsNull = _isnull.FIsNull;
exports.FIsUndefined = _isundefined.FIsUndefined;
exports.Wait = _wait.Wait;
exports.FCompare = _fcompare.FCompare;
exports.FSConst = _fsconst.FSConst;
exports.FConcat = _fconcat.FConcat;
exports.FNConst = _fnconst.FNConst;
exports.FAdd = _fadd.FAdd;
exports.FDiv = _fdiv.FDiv;
exports.FMul = _fmul.FMul;
exports.FSqrt = _fsqrt.FSqrt;
exports.FMod = _fmod.FMod;
exports.FTofixed = _ftofixed.FTofixed;
exports.APush = _apush.APush;
exports.FAConst = _faconst.FAConst;
exports.FAMake = _famake.FAMake;
exports.FAGet = _faget.FAGet;
exports.FALength = _falength.FALength;
exports.AMap = _amap.AMap;
exports.FAMap = _famap.FAMap;
exports.AReduce = _areduce.AReduce;
exports.FAReduce = _fareduce.FAReduce;
exports.FOMake = _fomake.FOMake;
exports.FOBreak = _fobreak.FOBreak;
exports.OSet = _oset.OSet; // Register internal nodes

_env.Env.init();
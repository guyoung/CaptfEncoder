var CryptoApi =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return rotateLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return rotateRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return rotateRight64lo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return rotateRight64hi; });

/**
 * Rotate x to n bits left
 *
 * @param {number} x
 * @param {number} n
 * @returns {number}
 */

function rotateLeft(x, n) {
  return x << n | x >>> 32 - n | 0;
}
/**
 * Rotate x to n bits right
 * @param {number} x
 * @param {number} n
 * @returns {number}
 */


function rotateRight(x, n) {
  return x >>> n | x << 32 - n | 0;
}
/**
 * Rotate 64bit to n bits right and return hi
 *
 * @param {number} hi
 * @param {number} lo
 * @param {number} n
 * @returns {number}
 */


function rotateRight64hi(hi, lo, n) {
  if (n === 32) {
    return lo;
  }

  if (n > 32) {
    return rotateRight64hi(lo, hi, n - 32);
  }

  return (hi >>> n | lo << 32 - n) & 0xFFFFFFFF;
}
/**
 * Rotate 64bit to n bits right and return lo
 *
 * @param {number} hi
 * @param {number} lo
 * @param {number} n
 * @returns {number}
 */


function rotateRight64lo(hi, lo, n) {
  if (n === 32) {
    return hi;
  }

  if (n > 32) {
    return rotateRight64lo(lo, hi, n - 32);
  }

  return (lo >>> n | hi << 32 - n) & 0xFFFFFFFF;
}



/***/ }),
/* 1 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fromUtf; });

/**
 * Convert UTF8/UTF16 string to binary input for hasher
 *
 * @param {string} message
 * @returns {string}
 */

function fromUtf(message) {
  var raw = '';

  for (var i = 0, msgLen = message.length; i < msgLen; i++) {
    var charCode = message.charCodeAt(i);

    if (charCode < 0x80) {
      raw += String.fromCharCode(charCode);
    } else if (charCode < 0x800) {
      raw += String.fromCharCode(0xc0 | charCode >> 6);
      raw += String.fromCharCode(0x80 | charCode & 0x3f);
    } else if (charCode < 0xd800 || charCode >= 0xe000) {
      raw += String.fromCharCode(0xe0 | charCode >> 12);
      raw += String.fromCharCode(0x80 | charCode >> 6 & 0x3f);
      raw += String.fromCharCode(0x80 | charCode & 0x3f);
    } // surrogate pair
    else {
        i++; // UTF-16 encodes 0x10000-0x10FFFF by
        // subtracting 0x10000 and splitting the
        // 20 bits of 0x0-0xFFFFF into two halves

        charCode = 0x10000 + ((charCode & 0x3ff) << 10 | message.charCodeAt(i) & 0x3ff);
        raw += String.fromCharCode(0xf0 | charCode >> 18);
        raw += String.fromCharCode(0x80 | charCode >> 12 & 0x3f);
        raw += String.fromCharCode(0x80 | charCode >> 6 & 0x3f);
        raw += String.fromCharCode(0x80 | charCode & 0x3f);
      }
  }

  return raw;
}

/***/ }),
/* 2 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return toHex; });

/**
 * Convert binary result of hash to hex
 *
 * @param {string} raw
 * @returns {string}
 */

function toHex(raw) {
  var str = '';

  for (var i = 0, l = raw.length; i < l; i++) {
    str += (raw.charCodeAt(i) < 16 ? '0' : '') + raw.charCodeAt(i).toString(16);
  }

  return str;
}

/***/ }),
/* 3 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _hasher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


/**
 * Hasher for 32 bit big endian blocks
 * @interface
 */

var Hasher32be =
/*#__PURE__*/
function (_Hasher) {
  _inherits(Hasher32be, _Hasher);

  /**
   * @param {Object} [options]
   */
  function Hasher32be(options) {
    var _this;

    _classCallCheck(this, Hasher32be);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Hasher32be).call(this, options));
    /**
     * Reverse order of bytes
     * @type {number}
     */

    _this.unitOrder = 1;
    /**
     * Current block (only for speed optimization)
     * @private
     * @type {number[]}
     */

    _this.blockUnits = [];
    return _this;
  }
  /**
   * Process ready blocks
   *
   * @protected
   */


  _createClass(Hasher32be, [{
    key: "process",
    value: function process() {
      while (this.state.message.length >= this.blockSizeInBytes) {
        this.blockUnits = [];

        for (var b = 0; b < this.blockSizeInBytes; b += 4) {
          this.blockUnits.push(this.state.message.charCodeAt(b) << 24 | this.state.message.charCodeAt(b + 1) << 16 | this.state.message.charCodeAt(b + 2) << 8 | this.state.message.charCodeAt(b + 3));
        }

        this.state.message = this.state.message.substr(this.blockSizeInBytes);
        this.processBlock(this.blockUnits);
      }
    }
    /**
     * Process ready blocks
     *
     * @protected
     * @param {number[]} M
     */

  }, {
    key: "processBlock",
    value: function processBlock(M) {}
    /**
     * Get hash from state
     *
     * @protected
     * @param {number} [size=this.state.hash.length] - Limit hash size (in chunks)
     * @returns {string}
     */

  }, {
    key: "getStateHash",
    value: function getStateHash(size) {
      size = size || this.state.hash.length;
      var hash = '';

      for (var i = 0; i < size; i++) {
        hash += String.fromCharCode(this.state.hash[i] >> 24 & 0xff) + String.fromCharCode(this.state.hash[i] >> 16 & 0xff) + String.fromCharCode(this.state.hash[i] >> 8 & 0xff) + String.fromCharCode(this.state.hash[i] & 0xff);
      }

      return hash;
    }
    /**
     * Add to message cumulative size of message in bits
     *
     * @protected
     */

  }, {
    key: "addLengthBits",
    value: function addLengthBits() {
      // @todo fix length to 64 bit
      this.state.message += "\x00\x00\x00" + String.fromCharCode(this.state.length >> 29 & 0xff) + String.fromCharCode(this.state.length >> 21 & 0xff) + String.fromCharCode(this.state.length >> 13 & 0xff) + String.fromCharCode(this.state.length >> 5 & 0xff) + String.fromCharCode(this.state.length << 3 & 0xff);
    }
  }]);

  return Hasher32be;
}(_hasher__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/* harmony default export */ __webpack_exports__["a"] = (Hasher32be);

/***/ }),
/* 4 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";

/**
 * Base hasher class
 * @interface
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Hasher =
/*#__PURE__*/
function () {
  /**
   * @param {Object} options
   * @constructor
   */
  function Hasher(options) {
    _classCallCheck(this, Hasher);

    /**
     * Size of unit in bytes (4 = 32 bits)
     * @type {number}
     */
    this.unitSize = 4;
    /**
     * Bytes order in unit
     *   0 - normal
     *   1 - reverse
     * @type {number}
     */

    this.unitOrder = 0;
    /**
     * Size of block in units
     * @type {number}
     */

    this.blockSize = 16;
    /**
     * Size of block in bytes
     * @type {number}
     */

    this.blockSizeInBytes = this.blockSize * this.unitSize;
    this.options = options || {};
    this.reset();
  }
  /**
   * Reset hasher to initial state
   */


  _createClass(Hasher, [{
    key: "reset",
    value: function reset() {
      /**
       * All algorithm variables that changed during process
       * @protected
       * @type {Object}
       * @property {string} state.message - Unprocessed Message
       * @property {number} state.length - Length of message
       */
      this.state = {};
      this.state.message = '';
      this.state.length = 0;
      /**
       * Options from initialization
       * @protected
       * @type {Object}
       */
    }
    /**
     * Return current state
     *
     * @returns {Object}
     */

  }, {
    key: "getState",
    value: function getState() {
      return JSON.parse(JSON.stringify(this.state));
    }
    /**
     * Set current state
     *
     * @param {Object} state
     */

  }, {
    key: "setState",
    value: function setState(state) {
      this.state = state;
    }
    /**
     * Update message from binary string
     *
     * @param {string} message
     */

  }, {
    key: "update",
    value: function update(message) {
      this.state.message += message;
      this.state.length += message.length;
      this.process();
    }
    /**
     * Process ready blocks
     *
     * @protected
     */

  }, {
    key: "process",
    value: function process() {}
    /**
     * Finalize hash and return result
     *
     * @returns {string}
     */

  }, {
    key: "finalize",
    value: function finalize() {
      return '';
    }
    /**
     * Get hash from state
     *
     * @protected
     * @param {number} [size=this.state.hash.length] - Limit hash size (in chunks)
     * @returns {string}
     */

  }, {
    key: "getStateHash",
    value: function getStateHash(size) {
      return '';
    }
    /**
     * Add PKCS7 padding to message
     * Pad with bytes all of the same value as the number of padding bytes
     *
     * @protected
     * @param {number} length
     */

  }, {
    key: "addPaddingPKCS7",
    value: function addPaddingPKCS7(length) {
      this.state.message += new Array(length + 1).join(String.fromCharCode(length));
    }
    /**
     * Add ISO7816-4 padding to message
     * Pad with 0x80 followed by zero bytes
     *
     * @protected
     * @param {number} length
     */

  }, {
    key: "addPaddingISO7816",
    value: function addPaddingISO7816(length) {
      this.state.message += "\x80" + new Array(length).join("\x00");
    }
    /**
     * Add zero padding to message
     * Pad with 0x00 characters
     *
     * @protected
     * @param {number} length
     */

  }, {
    key: "addPaddingZero",
    value: function addPaddingZero(length) {
      this.state.message += new Array(length + 1).join("\x00");
    }
  }]);

  return Hasher;
}();

/* harmony default export */ __webpack_exports__["a"] = (Hasher);

/***/ }),
/* 5 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _hasher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


/**
 * Hasher for 32 bit little endian blocks
 * @interface
 */

var Hasher32le =
/*#__PURE__*/
function (_Hasher) {
  _inherits(Hasher32le, _Hasher);

  /**
   * @param {Object} [options]
   */
  function Hasher32le(options) {
    var _this;

    _classCallCheck(this, Hasher32le);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Hasher32le).call(this, options));
    /**
     * Current block (only for speed optimization)
     * @private
     * @type {number[]}
     */

    _this.blockUnits = [];
    return _this;
  }
  /**
   * Process ready blocks
   *
   * @protected
   */


  _createClass(Hasher32le, [{
    key: "process",
    value: function process() {
      while (this.state.message.length >= this.blockSizeInBytes) {
        this.blockUnits = [];

        for (var b = 0; b < this.blockSizeInBytes; b += 4) {
          this.blockUnits.push(this.state.message.charCodeAt(b) | this.state.message.charCodeAt(b + 1) << 8 | this.state.message.charCodeAt(b + 2) << 16 | this.state.message.charCodeAt(b + 3) << 24);
        }

        this.state.message = this.state.message.substr(this.blockSizeInBytes);
        this.processBlock(this.blockUnits);
      }
    }
    /**
     * Process ready blocks
     *
     * @protected
     * @param {number[]} M
     */

  }, {
    key: "processBlock",
    value: function processBlock(M) {}
    /**
     * Get hash from state
     *
     * @protected
     * @param {number} [size=this.state.hash.length] - Limit hash size (in chunks)
     * @returns {string}
     */

  }, {
    key: "getStateHash",
    value: function getStateHash(size) {
      size = size || this.state.hash.length;
      var hash = '';

      for (var i = 0; i < size; i++) {
        hash += String.fromCharCode(this.state.hash[i] & 0xff) + String.fromCharCode(this.state.hash[i] >> 8 & 0xff) + String.fromCharCode(this.state.hash[i] >> 16 & 0xff) + String.fromCharCode(this.state.hash[i] >> 24 & 0xff);
      }

      return hash;
    }
    /**
     * Add to message cumulative size of message in bits
     *
     * @protected
     */

  }, {
    key: "addLengthBits",
    value: function addLengthBits() {
      // @todo fix length to 64 bit
      this.state.message += String.fromCharCode(this.state.length << 3 & 0xff) + String.fromCharCode(this.state.length >> 5 & 0xff) + String.fromCharCode(this.state.length >> 13 & 0xff) + String.fromCharCode(this.state.length >> 21 & 0xff) + String.fromCharCode(this.state.length >> 29 & 0xff) + "\x00\x00\x00";
    }
  }]);

  return Hasher32le;
}(_hasher__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/* harmony default export */ __webpack_exports__["a"] = (Hasher32le);

/***/ }),
/* 6 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _hasher32be__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _tools_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 // Transform constants

/** @type {number[]} */

var K = [0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd, 0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc, 0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019, 0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118, 0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe, 0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2, 0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1, 0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694, 0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3, 0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65, 0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483, 0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5, 0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210, 0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4, 0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725, 0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70, 0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926, 0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df, 0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8, 0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b, 0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001, 0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30, 0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910, 0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8, 0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53, 0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8, 0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb, 0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3, 0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60, 0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec, 0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9, 0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b, 0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207, 0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178, 0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6, 0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b, 0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493, 0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c, 0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a, 0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817];
/**
 * Calculates [SHA512 (SHA384)](https://tools.ietf.org/html/rfc4634) hash
 * [SHA512/t (SHA512/256 SHA512/224)](http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf)
 *
 * @example <caption>Calculates SHA512 hash from string "message" - ES6 style</caption>
 * import Sha512 from "crypto-api/src/hasher/sha512";
 * import {toHex} from "crypto-api/src/encoder/hex";
 *
 * let hasher = new Sha512();
 * hasher.update('message');
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates SHA512 hash from UTF string "message" - ES6 style</caption>
 * import Sha512 from "crypto-api/src/hasher/sha512";
 * import {toHex} from "crypto-api/src/encoder/hex";
 * import {fromUtf} from "crypto-api/src/encoder/utf";
 *
 * let hasher = new Sha512();
 * hasher.update(fromUtf('message'));
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates SHA512 hash from string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   var hasher = CryptoApi.getHasher('sha512');
 *   hasher.update('message');
 *   console.log(CryptoApi.encoder.toHex(hasher.finalize()));
 * </script>
 *
 * @example <caption>Calculates SHA512 hash from UTF string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   console.log(CryptoApi.hash('sha512', 'message'));
 * </script>
 */

var Sha512 =
/*#__PURE__*/
function (_Hasher32be) {
  _inherits(Sha512, _Hasher32be);

  /**
   * @param {Object} [options]
   * @param {number} [options.rounds=160] - Number of rounds (Must be greater than 32)
   * @param {number} [options.length=512] - Length of hash result (Can be from 32 to 480 with step 32)
   *
   * | Hash type  | Length |
   * |------------|--------|
   * | sha384     | 384    |
   * | sha512     | 512    |
   * | sha512/224 | 224    |
   * | sha512/256 | 256    |
   */
  function Sha512(options) {
    var _this;

    _classCallCheck(this, Sha512);

    options = options || {};
    options.length = options.length || 512;
    options.rounds = options.rounds || 160;
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Sha512).call(this, options));
    /**
     * Size of block in units
     * @ignore
     * @type {number}
     */

    _this.blockSize = 32;
    /**
     * Size of block in bytes
     * @ignore
     * @type {number}
     */

    _this.blockSizeInBytes = _this.blockSize * _this.unitSize;
    /**
     * Working variable (only for speed optimization)
     * @private
     * @ignore
     * @type {number[]}
     */

    _this.W = new Array(160);
    return _this;
  }
  /**
   * Reset hasher to initial state
   */


  _createClass(Sha512, [{
    key: "reset",
    value: function reset() {
      _get(_getPrototypeOf(Sha512.prototype), "reset", this).call(this);

      switch (this.options.length) {
        case 384:
          this.state.hash = [0xcbbb9d5d | 0, 0xc1059ed8 | 0, 0x629a292a | 0, 0x367cd507 | 0, 0x9159015a | 0, 0x3070dd17 | 0, 0x152fecd8 | 0, 0xf70e5939 | 0, 0x67332667 | 0, 0xffc00b31 | 0, 0x8eb44a87 | 0, 0x68581511 | 0, 0xdb0c2e0d | 0, 0x64f98fa7 | 0, 0x47b5481d | 0, 0xbefa4fa4 | 0];
          break;

        case 512:
          this.state.hash = [0x6a09e667 | 0, 0xf3bcc908 | 0, 0xbb67ae85 | 0, 0x84caa73b | 0, 0x3c6ef372 | 0, 0xfe94f82b | 0, 0xa54ff53a | 0, 0x5f1d36f1 | 0, 0x510e527f | 0, 0xade682d1 | 0, 0x9b05688c | 0, 0x2b3e6c1f | 0, 0x1f83d9ab | 0, 0xfb41bd6b | 0, 0x5be0cd19 | 0, 0x137e2179 | 0];
          break;

        default:
          var hasher = new Sha512();

          for (var i = 0; i < 16; i++) {
            hasher.state.hash[i] = hasher.state.hash[i] ^ 0xa5a5a5a5;
          }

          hasher.update('SHA-512/' + this.options.length);
          var hash = hasher.finalize();
          this.state.hash = [];

          for (var b = 0; b < 64; b += 4) {
            this.state.hash.push(hash.charCodeAt(b) << 24 | hash.charCodeAt(b + 1) << 16 | hash.charCodeAt(b + 2) << 8 | hash.charCodeAt(b + 3));
          }

      }
    }
    /**
     * Process ready blocks
     *
     * @protected
     * @ignore
     * @param {number[]} block - Block
     */

  }, {
    key: "processBlock",
    value: function processBlock(block) {
      // Working variables
      var ah = this.state.hash[0];
      var al = this.state.hash[1];
      var bh = this.state.hash[2];
      var bl = this.state.hash[3];
      var ch = this.state.hash[4];
      var cl = this.state.hash[5];
      var dh = this.state.hash[6];
      var dl = this.state.hash[7];
      var eh = this.state.hash[8];
      var el = this.state.hash[9];
      var fh = this.state.hash[10];
      var fl = this.state.hash[11];
      var gh = this.state.hash[12];
      var gl = this.state.hash[13];
      var hh = this.state.hash[14];
      var hl = this.state.hash[15];
      var s0h, s0l, s1h, s1l; // Calculate hash

      for (var i = 0; i < this.options.rounds; i += 2) {
        if (i < 32) {
          this.W[i] = block[i];
          this.W[i + 1] = block[i + 1];
        } else {
          s0h = Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateRight64hi */ "c"])(this.W[i - 30], this.W[i - 29], 1) ^ Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateRight64hi */ "c"])(this.W[i - 30], this.W[i - 29], 8) ^ this.W[i - 30] >>> 7;
          s0l = Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateRight64lo */ "d"])(this.W[i - 30], this.W[i - 29], 1) ^ Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateRight64lo */ "d"])(this.W[i - 30], this.W[i - 29], 8) ^ (this.W[i - 29] >>> 7 | this.W[i - 30] << 25);
          s1h = Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateRight64hi */ "c"])(this.W[i - 4], this.W[i - 3], 19) ^ Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateRight64hi */ "c"])(this.W[i - 4], this.W[i - 3], 61) ^ this.W[i - 4] >>> 6;
          s1l = Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateRight64lo */ "d"])(this.W[i - 4], this.W[i - 3], 19) ^ Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateRight64lo */ "d"])(this.W[i - 4], this.W[i - 3], 61) ^ (this.W[i - 3] >>> 6 | this.W[i - 4] << 26);
          var c1 = (this.W[i - 13] & 0xFFFF) + (this.W[i - 31] & 0xFFFF) + (s0l & 0xFFFF) + (s1l & 0xFFFF) | 0;
          var c2 = (this.W[i - 13] >>> 16) + (this.W[i - 31] >>> 16) + (s0l >>> 16) + (s1l >>> 16) + (c1 >>> 16) | 0;
          var c3 = (this.W[i - 14] & 0xFFFF) + (this.W[i - 32] & 0xFFFF) + (s0h & 0xFFFF) + (s1h & 0xFFFF) + (c2 >>> 16) | 0;
          var c4 = (this.W[i - 14] >>> 16) + (this.W[i - 32] >>> 16) + (s0h >>> 16) + (s1h >>> 16) + (c3 >>> 16) | 0;
          this.W[i] = (c4 << 16 | c3 & 0xFFFF) & 0xFFFFFFFF;
          this.W[i + 1] = (c2 << 16 | c1 & 0xFFFF) & 0xFFFFFFFF;
        }

        s0h = Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateRight64hi */ "c"])(ah, al, 28) ^ Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateRight64hi */ "c"])(ah, al, 34) ^ Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateRight64hi */ "c"])(ah, al, 39);
        s0l = Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateRight64lo */ "d"])(ah, al, 28) ^ Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateRight64lo */ "d"])(ah, al, 34) ^ Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateRight64lo */ "d"])(ah, al, 39);
        s1h = Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateRight64hi */ "c"])(eh, el, 14) ^ Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateRight64hi */ "c"])(eh, el, 18) ^ Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateRight64hi */ "c"])(eh, el, 41);
        s1l = Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateRight64lo */ "d"])(eh, el, 14) ^ Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateRight64lo */ "d"])(eh, el, 18) ^ Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateRight64lo */ "d"])(eh, el, 41);
        var chh = eh & fh ^ ~eh & gh;
        var chl = el & fl ^ ~el & gl;
        var majh = ah & bh ^ ah & ch ^ bh & ch;
        var majl = al & bl ^ al & cl ^ bl & cl;
        var t1l = hl + s1l | 0;
        var t1h = hh + s1h + (t1l >>> 0 < hl >>> 0 ? 1 : 0) | 0;
        t1l = t1l + chl | 0;
        t1h = t1h + chh + (t1l >>> 0 < chl >>> 0 ? 1 : 0) | 0;
        t1l = t1l + K[i + 1] | 0;
        t1h = t1h + K[i] + (t1l >>> 0 < K[i + 1] >>> 0 ? 1 : 0) | 0;
        t1l = t1l + this.W[i + 1] | 0;
        t1h = t1h + this.W[i] + (t1l >>> 0 < this.W[i + 1] >>> 0 ? 1 : 0) | 0;
        var t2l = s0l + majl | 0;
        var t2h = s0h + majh + (t2l >>> 0 < s0l >>> 0 ? 1 : 0) | 0;
        hh = gh;
        hl = gl;
        gh = fh;
        gl = fl;
        fh = eh;
        fl = el;
        el = dl + t1l | 0;
        eh = dh + t1h + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
        dh = ch;
        dl = cl;
        ch = bh;
        cl = bl;
        bh = ah;
        bl = al;
        al = t1l + t2l | 0;
        ah = t1h + t2h + (al >>> 0 < t1l >>> 0 ? 1 : 0) | 0;
      }

      this.state.hash[1] = this.state.hash[1] + al | 0;
      this.state.hash[0] = this.state.hash[0] + ah + (this.state.hash[1] >>> 0 < al >>> 0 ? 1 : 0) | 0;
      this.state.hash[3] = this.state.hash[3] + bl | 0;
      this.state.hash[2] = this.state.hash[2] + bh + (this.state.hash[3] >>> 0 < bl >>> 0 ? 1 : 0) | 0;
      this.state.hash[5] = this.state.hash[5] + cl | 0;
      this.state.hash[4] = this.state.hash[4] + ch + (this.state.hash[5] >>> 0 < cl >>> 0 ? 1 : 0) | 0;
      this.state.hash[7] = this.state.hash[7] + dl | 0;
      this.state.hash[6] = this.state.hash[6] + dh + (this.state.hash[7] >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      this.state.hash[9] = this.state.hash[9] + el | 0;
      this.state.hash[8] = this.state.hash[8] + eh + (this.state.hash[9] >>> 0 < el >>> 0 ? 1 : 0) | 0;
      this.state.hash[11] = this.state.hash[11] + fl | 0;
      this.state.hash[10] = this.state.hash[10] + fh + (this.state.hash[11] >>> 0 < fl >>> 0 ? 1 : 0) | 0;
      this.state.hash[13] = this.state.hash[13] + gl | 0;
      this.state.hash[12] = this.state.hash[12] + gh + (this.state.hash[13] >>> 0 < gl >>> 0 ? 1 : 0) | 0;
      this.state.hash[15] = this.state.hash[15] + hl | 0;
      this.state.hash[14] = this.state.hash[14] + hh + (this.state.hash[15] >>> 0 < hl >>> 0 ? 1 : 0) | 0;
    }
    /**
     * Finalize hash and return result
     *
     * @returns {string}
     */

  }, {
    key: "finalize",
    value: function finalize() {
      this.addPaddingISO7816(this.state.message.length < 112 ? 112 - this.state.message.length | 0 : 240 - this.state.message.length | 0); // Real length for SHA512 is 128 bit instead of 64 bit

      this.state.message += "\x00\x00\x00\x00\x00\x00\x00\x00";
      this.addLengthBits();
      this.process();
      return this.getStateHash(this.options.length / 32 | 0);
    }
  }]);

  return Sha512;
}(_hasher32be__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/* harmony default export */ __webpack_exports__["a"] = (Sha512);

/***/ }),
/* 7 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _hasher32be__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _tools_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 // Transform constants

/** @type {number[]} */

var K = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];
/**
 * Calculates [SHA256 (SHA224)](https://tools.ietf.org/html/rfc4634) hash
 *
 * @example <caption>Calculates SHA256 hash from string "message" - ES6 style</caption>
 * import Sha256 from "crypto-api/src/hasher/sha256";
 * import {toHex} from "crypto-api/src/encoder/hex";
 *
 * let hasher = new Sha256();
 * hasher.update('message');
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates SHA256 hash from UTF string "message" - ES6 style</caption>
 * import Sha256 from "crypto-api/src/hasher/sha256";
 * import {toHex} from "crypto-api/src/encoder/hex";
 * import {fromUtf} from "crypto-api/src/encoder/utf";
 *
 * let hasher = new Sha256();
 * hasher.update(fromUtf('message'));
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates SHA256 hash from string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   var hasher = CryptoApi.getHasher('sha256');
 *   hasher.update('message');
 *   console.log(CryptoApi.encoder.toHex(hasher.finalize()));
 * </script>
 *
 * @example <caption>Calculates SHA256 hash from UTF string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   console.log(CryptoApi.hash('sha256', 'message'));
 * </script>
 */

var Sha256 =
/*#__PURE__*/
function (_Hasher32be) {
  _inherits(Sha256, _Hasher32be);

  /**
   * @param {Object} [options]
   * @param {number} [options.rounds=64] - Number of rounds (Must be greater than 16)
   * @param {number} [options.length=256] - Length of hash result
   *
   * | Hash type | Length |
   * |-----------|--------|
   * | sha224    | 224    |
   * | sha256    | 256    |
   */
  function Sha256(options) {
    var _this;

    _classCallCheck(this, Sha256);

    options = options || {};
    options.length = options.length || 256;
    options.rounds = options.rounds || 64;
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Sha256).call(this, options));
    /**
     * Working variable (only for speed optimization)
     * @private
     * @ignore
     * @type {number[]}
     */

    _this.W = new Array(64);
    return _this;
  }
  /**
   * Reset hasher to initial state
   */


  _createClass(Sha256, [{
    key: "reset",
    value: function reset() {
      _get(_getPrototypeOf(Sha256.prototype), "reset", this).call(this);

      switch (this.options.length) {
        case 224:
          this.state.hash = [0xc1059ed8 | 0, 0x367cd507 | 0, 0x3070dd17 | 0, 0xf70e5939 | 0, 0xffc00b31 | 0, 0x68581511 | 0, 0x64f98fa7 | 0, 0xbefa4fa4 | 0];
          break;

        default:
          this.state.hash = [0x6a09e667 | 0, 0xbb67ae85 | 0, 0x3c6ef372 | 0, 0xa54ff53a | 0, 0x510e527f | 0, 0x9b05688c | 0, 0x1f83d9ab | 0, 0x5be0cd19 | 0];
      }
    }
    /**
     * Process ready blocks
     *
     * @protected
     * @ignore
     * @param {number[]} block - Block
     */

  }, {
    key: "processBlock",
    value: function processBlock(block) {
      // Working variables
      var a = this.state.hash[0] | 0;
      var b = this.state.hash[1] | 0;
      var c = this.state.hash[2] | 0;
      var d = this.state.hash[3] | 0;
      var e = this.state.hash[4] | 0;
      var f = this.state.hash[5] | 0;
      var g = this.state.hash[6] | 0;
      var h = this.state.hash[7] | 0; // Calculate hash

      for (var i = 0; i < this.options.rounds; i++) {
        if (i < 16) {
          this.W[i] = block[i] | 0;
        } else {
          this.W[i] = this.W[i - 16] + (Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateRight */ "b"])(this.W[i - 15], 7) ^ Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateRight */ "b"])(this.W[i - 15], 18) ^ this.W[i - 15] >>> 3) + this.W[i - 7] + (Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateRight */ "b"])(this.W[i - 2], 17) ^ Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateRight */ "b"])(this.W[i - 2], 19) ^ this.W[i - 2] >>> 10) | 0;
        }

        var t1 = h + (Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateRight */ "b"])(e, 6) ^ Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateRight */ "b"])(e, 11) ^ Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateRight */ "b"])(e, 25)) + (e & f ^ ~e & g) + K[i] + this.W[i] | 0;
        var t2 = (Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateRight */ "b"])(a, 2) ^ Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateRight */ "b"])(a, 13) ^ Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateRight */ "b"])(a, 22)) + (a & b ^ a & c ^ b & c) | 0;
        h = g;
        g = f;
        f = e;
        e = d + t1 | 0;
        d = c;
        c = b;
        b = a;
        a = t1 + t2 | 0;
      }

      this.state.hash[0] = this.state.hash[0] + a | 0;
      this.state.hash[1] = this.state.hash[1] + b | 0;
      this.state.hash[2] = this.state.hash[2] + c | 0;
      this.state.hash[3] = this.state.hash[3] + d | 0;
      this.state.hash[4] = this.state.hash[4] + e | 0;
      this.state.hash[5] = this.state.hash[5] + f | 0;
      this.state.hash[6] = this.state.hash[6] + g | 0;
      this.state.hash[7] = this.state.hash[7] + h | 0;
    }
    /**
     * Finalize hash and return result
     *
     * @returns {string}
     */

  }, {
    key: "finalize",
    value: function finalize() {
      this.addPaddingISO7816(this.state.message.length < 56 ? 56 - this.state.message.length | 0 : 120 - this.state.message.length | 0);
      this.addLengthBits();
      this.process();
      return this.getStateHash(this.options.length / 32 | 0);
    }
  }]);

  return Sha256;
}(_hasher32be__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/* harmony default export */ __webpack_exports__["a"] = (Sha256);

/***/ }),
/* 8 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _hasher32le__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _tools_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



/** @type {number[]} */

var ZL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13];
/** @type {number[]} */

var ZR = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11];
/** @type {number[]} */

var SL = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6];
/** @type {number[]} */

var SR = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11];
/**
 * Calculates [RIPEMD-160 (RIPEMD-128, RIPEMD-256, RIPEMD-320)](http://homes.esat.kuleuven.be/~bosselae/ripemd160.html) hash
 *
 * @example <caption>Calculates RIPEMD-160 hash from string "message" - ES6 style</caption>
 * import Ripemd from "crypto-api/src/hasher/ripemd";
 * import {toHex} from "crypto-api/src/encoder/hex";
 *
 * let hasher = new Ripemd();
 * hasher.update('message');
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates RIPEMD-160 hash from UTF string "message" - ES6 style</caption>
 * import Ripemd from "crypto-api/src/hasher/ripemd";
 * import {toHex} from "crypto-api/src/encoder/hex";
 * import {fromUtf} from "crypto-api/src/encoder/utf";
 *
 * let hasher = new Ripemd();
 * hasher.update(fromUtf('message'));
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates RIPEMD-160 hash from string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   var hasher = CryptoApi.getHasher('ripemd160');
 *   hasher.update('message');
 *   console.log(CryptoApi.encoder.toHex(hasher.finalize()));
 * </script>
 *
 * @example <caption>Calculates RIPEMD-160 hash from UTF string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   console.log(CryptoApi.hash('ripemd160', 'message'));
 * </script>
 */

var Ripemd =
/*#__PURE__*/
function (_Hasher32le) {
  _inherits(Ripemd, _Hasher32le);

  /**
   * @param {Object} [options]
   * @param {number} [options.length=160] - Length of hash result
   *
   * | Hash type | Length |
   * |-----------|--------|
   * | ripemd128 | 128    |
   * | ripemd160 | 160    |
   * | ripemd256 | 256    |
   * | ripemd320 | 320    |
   */
  function Ripemd(options) {
    _classCallCheck(this, Ripemd);

    options = options || {};
    options.length = options.length || 160;
    return _possibleConstructorReturn(this, _getPrototypeOf(Ripemd).call(this, options));
  }
  /**
   * Reset hasher to initial state
   */


  _createClass(Ripemd, [{
    key: "reset",
    value: function reset() {
      _get(_getPrototypeOf(Ripemd.prototype), "reset", this).call(this);

      switch (this.options.length) {
        case 128:
          this.state.hash = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476];
          /**
           * Process ready blocks
           *
           * @protected
           * @ignore
           * @method processBlock
           * @param {number[]} block - Block
           */

          this.processBlock = this.processBlock128;
          break;

        case 256:
          this.state.hash = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0x76543210, 0xfedcba98, 0x89abcdef, 0x01234567];
          this.processBlock = this.processBlock256;
          break;

        case 320:
          this.state.hash = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0, 0x76543210, 0xfedcba98, 0x89abcdef, 0x01234567, 0x3c2d1e0f];
          this.processBlock = this.processBlock320;
          break;

        default:
          // 160
          this.state.hash = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];
          this.processBlock = this.processBlock160;
      }
    }
    /**
     * @private
     * @ignore
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {number}
     */

  }, {
    key: "processBlock128",

    /**
     * Process ready blocks
     *
     * @protected
     * @ignore
     * @param {number[]} block - Block
     */
    value: function processBlock128(block) {
      // Working variables
      var al = this.state.hash[0] | 0;
      var bl = this.state.hash[1] | 0;
      var cl = this.state.hash[2] | 0;
      var dl = this.state.hash[3] | 0;
      var ar = al;
      var br = bl;
      var cr = cl;
      var dr = dl;

      for (var i = 0; i < 64; i++) {
        var _t = al + block[ZL[i]] | 0;

        _t = _t + Ripemd.T(i, bl, cl, dl) | 0;
        _t = Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateLeft */ "a"])(_t, SL[i]);
        al = dl;
        dl = cl;
        cl = bl;
        bl = _t;
        _t = ar + block[ZR[i]] | 0;
        _t = _t + Ripemd.T64(i, br, cr, dr) | 0;
        _t = Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateLeft */ "a"])(_t, SR[i]);
        ar = dr;
        dr = cr;
        cr = br;
        br = _t;
      }

      var t = this.state.hash[1] + cl + dr | 0;
      this.state.hash[1] = this.state.hash[2] + dl + ar | 0;
      this.state.hash[2] = this.state.hash[3] + al + br | 0;
      this.state.hash[3] = this.state.hash[0] + bl + cr | 0;
      this.state.hash[0] = t;
    }
    /**
     * Process ready blocks
     *
     * @protected
     * @ignore
     * @param {number[]} block - Block
     */

  }, {
    key: "processBlock160",
    value: function processBlock160(block) {
      // Working variables
      var al = this.state.hash[0] | 0;
      var bl = this.state.hash[1] | 0;
      var cl = this.state.hash[2] | 0;
      var dl = this.state.hash[3] | 0;
      var el = this.state.hash[4] | 0;
      var ar = al;
      var br = bl;
      var cr = cl;
      var dr = dl;
      var er = el;

      for (var i = 0; i < 80; i++) {
        var _t2 = al + block[ZL[i]] | 0;

        _t2 = _t2 + Ripemd.T(i, bl, cl, dl) | 0;
        _t2 = Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateLeft */ "a"])(_t2, SL[i]);
        _t2 = _t2 + el | 0;
        al = el;
        el = dl;
        dl = Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateLeft */ "a"])(cl, 10);
        cl = bl;
        bl = _t2;
        _t2 = ar + block[ZR[i]] | 0;
        _t2 = _t2 + Ripemd.T80(i, br, cr, dr) | 0;
        _t2 = Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateLeft */ "a"])(_t2, SR[i]);
        _t2 = _t2 + er | 0;
        ar = er;
        er = dr;
        dr = Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateLeft */ "a"])(cr, 10);
        cr = br;
        br = _t2;
      }

      var t = this.state.hash[1] + cl + dr | 0;
      this.state.hash[1] = this.state.hash[2] + dl + er | 0;
      this.state.hash[2] = this.state.hash[3] + el + ar | 0;
      this.state.hash[3] = this.state.hash[4] + al + br | 0;
      this.state.hash[4] = this.state.hash[0] + bl + cr | 0;
      this.state.hash[0] = t;
    }
    /**
     * Process ready blocks
     *
     * @protected
     * @ignore
     * @param {number[]} block - Block
     */

  }, {
    key: "processBlock256",
    value: function processBlock256(block) {
      // Working variables
      var al = this.state.hash[0] | 0;
      var bl = this.state.hash[1] | 0;
      var cl = this.state.hash[2] | 0;
      var dl = this.state.hash[3] | 0;
      var ar = this.state.hash[4] | 0;
      var br = this.state.hash[5] | 0;
      var cr = this.state.hash[6] | 0;
      var dr = this.state.hash[7] | 0;

      for (var i = 0; i < 64; i += 1) {
        var t = al + block[ZL[i]] | 0;
        t = t + Ripemd.T(i, bl, cl, dl) | 0;
        t = Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateLeft */ "a"])(t, SL[i]);
        al = dl;
        dl = cl;
        cl = bl;
        bl = t;
        t = ar + block[ZR[i]] | 0;
        t = t + Ripemd.T64(i, br, cr, dr) | 0;
        t = Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateLeft */ "a"])(t, SR[i]);
        ar = dr;
        dr = cr;
        cr = br;
        br = t;

        switch (i) {
          case 15:
            t = al;
            al = ar;
            ar = t;
            break;

          case 31:
            t = bl;
            bl = br;
            br = t;
            break;

          case 47:
            t = cl;
            cl = cr;
            cr = t;
            break;

          case 63:
            t = dl;
            dl = dr;
            dr = t;
            break;
        }
      }

      this.state.hash[0] = this.state.hash[0] + al | 0;
      this.state.hash[1] = this.state.hash[1] + bl | 0;
      this.state.hash[2] = this.state.hash[2] + cl | 0;
      this.state.hash[3] = this.state.hash[3] + dl | 0;
      this.state.hash[4] = this.state.hash[4] + ar | 0;
      this.state.hash[5] = this.state.hash[5] + br | 0;
      this.state.hash[6] = this.state.hash[6] + cr | 0;
      this.state.hash[7] = this.state.hash[7] + dr | 0;
    }
    /**
     * Process ready blocks
     *
     * @protected
     * @ignore
     * @param {number[]} block - Block
     */

  }, {
    key: "processBlock320",
    value: function processBlock320(block) {
      // Working variables
      var al = this.state.hash[0] | 0;
      var bl = this.state.hash[1] | 0;
      var cl = this.state.hash[2] | 0;
      var dl = this.state.hash[3] | 0;
      var el = this.state.hash[4] | 0;
      var ar = this.state.hash[5] | 0;
      var br = this.state.hash[6] | 0;
      var cr = this.state.hash[7] | 0;
      var dr = this.state.hash[8] | 0;
      var er = this.state.hash[9] | 0;

      for (var i = 0; i < 80; i += 1) {
        var t = al + block[ZL[i]] | 0;
        t = t + Ripemd.T(i, bl, cl, dl) | 0;
        t = Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateLeft */ "a"])(t, SL[i]);
        t = t + el | 0;
        al = el;
        el = dl;
        dl = Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateLeft */ "a"])(cl, 10);
        cl = bl;
        bl = t;
        t = ar + block[ZR[i]] | 0;
        t = t + Ripemd.T80(i, br, cr, dr) | 0;
        t = Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateLeft */ "a"])(t, SR[i]);
        t = t + er | 0;
        ar = er;
        er = dr;
        dr = Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateLeft */ "a"])(cr, 10);
        cr = br;
        br = t;

        switch (i) {
          case 15:
            t = bl;
            bl = br;
            br = t;
            break;

          case 31:
            t = dl;
            dl = dr;
            dr = t;
            break;

          case 47:
            t = al;
            al = ar;
            ar = t;
            break;

          case 63:
            t = cl;
            cl = cr;
            cr = t;
            break;

          case 79:
            t = el;
            el = er;
            er = t;
            break;
        }
      }

      this.state.hash[0] = this.state.hash[0] + al | 0;
      this.state.hash[1] = this.state.hash[1] + bl | 0;
      this.state.hash[2] = this.state.hash[2] + cl | 0;
      this.state.hash[3] = this.state.hash[3] + dl | 0;
      this.state.hash[4] = this.state.hash[4] + el | 0;
      this.state.hash[5] = this.state.hash[5] + ar | 0;
      this.state.hash[6] = this.state.hash[6] + br | 0;
      this.state.hash[7] = this.state.hash[7] + cr | 0;
      this.state.hash[8] = this.state.hash[8] + dr | 0;
      this.state.hash[9] = this.state.hash[9] + er | 0;
    }
    /**
     * Finalize hash and return result
     *
     * @returns {string}
     */

  }, {
    key: "finalize",
    value: function finalize() {
      this.addPaddingISO7816(this.state.message.length < 56 ? 56 - this.state.message.length | 0 : 120 - this.state.message.length | 0);
      this.addLengthBits();
      this.process();
      return this.getStateHash();
    }
  }], [{
    key: "F",
    value: function F(x, y, z) {
      return x ^ y ^ z;
    }
    /**
     * @private
     * @ignore
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {number}
     */

  }, {
    key: "G",
    value: function G(x, y, z) {
      return x & y | ~x & z;
    }
    /**
     * @private
     * @ignore
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {number}
     */

  }, {
    key: "H",
    value: function H(x, y, z) {
      return (x | ~y) ^ z;
    }
    /**
     * @private
     * @ignore
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {number}
     */

  }, {
    key: "I",
    value: function I(x, y, z) {
      return x & z | y & ~z;
    }
    /**
     * @private
     * @ignore
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {number}
     */

  }, {
    key: "J",
    value: function J(x, y, z) {
      return x ^ (y | ~z);
    }
    /**
     * @private
     * @ignore
     * @param {number} i
     * @param {number} bl
     * @param {number} cl
     * @param {number} dl
     * @returns {number}
     */

  }, {
    key: "T",
    value: function T(i, bl, cl, dl) {
      if (i < 16) {
        return this.F(bl, cl, dl);
      }

      if (i < 32) {
        return this.G(bl, cl, dl) + 0x5a827999 | 0;
      }

      if (i < 48) {
        return this.H(bl, cl, dl) + 0x6ed9eba1 | 0;
      }

      if (i < 64) {
        return this.I(bl, cl, dl) + 0x8f1bbcdc | 0;
      }

      return this.J(bl, cl, dl) + 0xa953fd4e | 0;
    }
    /**
     * @private
     * @ignore
     * @param {number} i
     * @param {number} br
     * @param {number} cr
     * @param {number} dr
     * @returns {number}
     */

  }, {
    key: "T64",
    value: function T64(i, br, cr, dr) {
      if (i < 16) {
        return this.I(br, cr, dr) + 0x50a28be6 | 0;
      }

      if (i < 32) {
        return this.H(br, cr, dr) + 0x5c4dd124 | 0;
      }

      if (i < 48) {
        return this.G(br, cr, dr) + 0x6d703ef3 | 0;
      }

      return this.F(br, cr, dr);
    }
    /**
     * @private
     * @ignore
     * @param {number} i
     * @param {number} br
     * @param {number} cr
     * @param {number} dr
     * @returns {number}
     */

  }, {
    key: "T80",
    value: function T80(i, br, cr, dr) {
      if (i < 16) {
        return this.J(br, cr, dr) + 0x50a28be6 | 0;
      }

      if (i < 32) {
        return this.I(br, cr, dr) + 0x5c4dd124 | 0;
      }

      if (i < 48) {
        return this.H(br, cr, dr) + 0x6d703ef3 | 0;
      }

      if (i < 64) {
        return this.G(br, cr, dr) + 0x7a6d76e9 | 0;
      }

      return this.F(br, cr, dr);
    }
  }]);

  return Ripemd;
}(_hasher32le__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/* harmony default export */ __webpack_exports__["a"] = (Ripemd);

/***/ }),
/* 9 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _hasher32be__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _tools_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



/**
 * The random table is the first part of the random digits from the book:
 * "A Million Random Digits with 100,000 Normal Deviates",
 * by the RAND Corporation, published by the Free Press, 1955
 *
 * @type {number[]}
 */

var randTable = [10097, 32533, 76520, 13586, 34673, 54876, 80959, 9117, 39292, 74945, 37542, 4805, 64894, 74296, 24805, 24037, 20636, 10402, 822, 91665, 8422, 68953, 19645, 9303, 23209, 2560, 15953, 34764, 35080, 33606, 99019, 2529, 9376, 70715, 38311, 31165, 88676, 74397, 4436, 27659, 12807, 99970, 80157, 36147, 64032, 36653, 98951, 16877, 12171, 76833, 66065, 74717, 34072, 76850, 36697, 36170, 65813, 39885, 11199, 29170, 31060, 10805, 45571, 82406, 35303, 42614, 86799, 7439, 23403, 9732, 85269, 77602, 2051, 65692, 68665, 74818, 73053, 85247, 18623, 88579, 63573, 32135, 5325, 47048, 90553, 57548, 28468, 28709, 83491, 25624, 73796, 45753, 3529, 64778, 35808, 34282, 60935, 20344, 35273, 88435, 98520, 17767, 14905, 68607, 22109, 40558, 60970, 93433, 50500, 73998, 11805, 5431, 39808, 27732, 50725, 68248, 29405, 24201, 52775, 67851, 83452, 99634, 6288, 98083, 13746, 70078, 18475, 40610, 68711, 77817, 88685, 40200, 86507, 58401, 36766, 67951, 90364, 76493, 29609, 11062, 99594, 67348, 87517, 64969, 91826, 8928, 93785, 61368, 23478, 34113, 65481, 17674, 17468, 50950, 58047, 76974, 73039, 57186, 40218, 16544, 80124, 35635, 17727, 8015, 45318, 22374, 21115, 78253, 14385, 53763, 74350, 99817, 77402, 77214, 43236, 210, 45521, 64237, 96286, 2655, 69916, 26803, 66252, 29148, 36936, 87203, 76621, 13990, 94400, 56418, 9893, 20505, 14225, 68514, 46427, 56788, 96297, 78822, 54382, 14598, 91499, 14523, 68479, 27686, 46162, 83554, 94750, 89923, 37089, 20048, 80336, 94598, 26940, 36858, 70297, 34135, 53140, 33340, 42050, 82341, 44104, 81949, 85157, 47954, 32979, 26575, 57600, 40881, 22222, 6413, 12550, 73742, 11100, 2040, 12860, 74697, 96644, 89439, 28707, 25815, 63606, 49329, 16505, 34484, 40219, 52563, 43651, 77082, 7207, 31790, 61196, 90446, 26457, 47774, 51924, 33729, 65394, 59593, 42582, 60527, 15474, 45266, 95270, 79953, 59367, 83848, 82396, 10118, 33211, 59466, 94557, 28573, 67897, 54387, 54622, 44431, 91190, 42592, 92927, 45973, 42481, 16213, 97344, 8721, 16868, 48767, 3071, 12059, 25701, 46670, 23523, 78317, 73208, 89837, 68935, 91416, 26252, 29663, 5522, 82562, 4493, 52494, 75246, 33824, 45862, 51025, 61962, 79335, 65337, 12472, 549, 97654, 64051, 88159, 96119, 63896, 54692, 82391, 23287, 29529, 35963, 15307, 26898, 9354, 33351, 35462, 77974, 50024, 90103, 39333, 59808, 8391, 45427, 26842, 83609, 49700, 13021, 24892, 78565, 20106, 46058, 85236, 1390, 92286, 77281, 44077, 93910, 83647, 70617, 42941, 32179, 597, 87379, 25241, 5567, 7007, 86743, 17157, 85394, 11838, 69234, 61406, 20117, 45204, 15956, 60000, 18743, 92423, 97118, 96338, 19565, 41430, 1758, 75379, 40419, 21585, 66674, 36806, 84962, 85207, 45155, 14938, 19476, 7246, 43667, 94543, 59047, 90033, 20826, 69541, 94864, 31994, 36168, 10851, 34888, 81553, 1540, 35456, 5014, 51176, 98086, 24826, 45240, 28404, 44999, 8896, 39094, 73407, 35441, 31880, 33185, 16232, 41941, 50949, 89435, 48581, 88695, 41994, 37548, 73043, 80951, 406, 96382, 70774, 20151, 23387, 25016, 25298, 94624, 61171, 79752, 49140, 71961, 28296, 69861, 2591, 74852, 20539, 387, 59579, 18633, 32537, 98145, 6571, 31010, 24674, 5455, 61427, 77938, 91936, 74029, 43902, 77557, 32270, 97790, 17119, 52527, 58021, 80814, 51748, 54178, 45611, 80993, 37143, 5335, 12969, 56127, 19255, 36040, 90324, 11664, 49883, 52079, 84827, 59381, 71539, 9973, 33440, 88461, 23356, 48324, 77928, 31249, 64710, 2295, 36870, 32307, 57546, 15020, 9994, 69074, 94138, 87637, 91976, 35584, 4401, 10518, 21615, 1848, 76938, 9188, 20097, 32825, 39527, 4220, 86304, 83389, 87374, 64278, 58044, 90045, 85497, 51981, 50654, 94938, 81997, 91870, 76150, 68476, 64659, 73189, 50207, 47677, 26269, 62290, 64464, 27124, 67018, 41361, 82760, 75768, 76490, 20971, 87749, 90429, 12272, 95375, 5871, 93823, 43178, 54016, 44056, 66281, 31003, 682, 27398, 20714, 53295, 7706, 17813, 8358, 69910, 78542, 42785, 13661, 58873, 4618, 97553, 31223, 8420, 28306, 3264, 81333, 10591, 40510, 7893, 32604, 60475, 94119, 1840, 53840, 86233, 81594, 13628, 51215, 90290, 28466, 68795, 77762, 20791, 91757, 53741, 61613, 62269, 50263, 90212, 55781, 76514, 83483, 47055, 89415, 92694, 397, 58391, 12607, 17646, 48949, 72306, 94541, 37408, 77513, 3820, 86864, 29901, 68414, 82774, 51908, 13980, 72893, 55507, 19502, 37174, 69979, 20288, 55210, 29773, 74287, 75251, 65344, 67415, 21818, 59313, 93278, 81757, 5686, 73156, 7082, 85046, 31853, 38452, 51474, 66499, 68107, 23621, 94049, 91345, 42836, 9191, 8007, 45449, 99559, 68331, 62535, 24170, 69777, 12830, 74819, 78142, 43860, 72834, 33713, 48007, 93584, 72869, 51926, 64721, 58303, 29822, 93174, 93972, 85274, 86893, 11303, 22970, 28834, 34137, 73515, 90400, 71148, 43643, 84133, 89640, 44035, 52166, 73852, 70091, 61222, 60561, 62327, 18423, 56732, 16234, 17395, 96131, 10123, 91622, 85496, 57560, 81604, 18880, 65138, 56806, 87648, 85261, 34313, 65861, 45875, 21069, 85644, 47277, 38001, 2176, 81719, 11711, 71602, 92937, 74219, 64049, 65584, 49698, 37402, 96397, 1304, 77586, 56271, 10086, 47324, 62605, 40030, 37438, 97125, 40348, 87083, 31417, 21815, 39250, 75237, 62047, 15501, 29578, 21826, 41134, 47143, 34072, 64638, 85902, 49139, 6441, 3856, 54552, 73135, 42742, 95719, 9035, 85794, 74296, 8789, 88156, 64691, 19202, 7638, 77929, 3061, 18072, 96207, 44156, 23821, 99538, 4713, 66994, 60528, 83441, 7954, 19814, 59175, 20695, 5533, 52139, 61212, 6455, 83596, 35655, 6958, 92983, 5128, 9719, 77433, 53783, 92301, 50498, 10850, 62746, 99599, 10507, 13499, 6319, 53075, 71839, 6410, 19362, 39820, 98952, 43622, 63147, 64421, 80814, 43800, 9351, 31024, 73167, 59580, 6478, 75569, 78800, 88835, 54486, 23768, 6156, 4111, 8408, 38508, 7341, 23793, 48763, 90822, 97022, 17719, 4207, 95954, 49953, 30692, 70668, 94688, 16127, 56196, 80091, 82067, 63400, 5462, 69200, 65443, 95659, 18288, 27437, 49632, 24041, 8337, 65676, 96299, 90836, 27267, 50264, 13192, 72294, 7477, 44606, 17985, 48911, 97341, 30358, 91307, 6991, 19072, 24210, 36699, 53728, 28825, 35793, 28976, 66252, 68434, 94688, 84473, 13622, 62126, 98408, 12843, 82590, 9815, 93146, 48908, 15877, 54745, 24591, 35700, 4754, 83824, 52692, 54130, 55160, 6913, 45197, 42672, 78601, 11883, 9528, 63011, 98901, 14974, 40344, 10455, 16019, 14210, 33712, 91342, 37821, 88325, 80851, 43667, 70883, 12883, 97343, 65027, 61184, 4285, 1392, 17974, 15077, 90712, 26769, 21778, 30976, 38807, 36961, 31649, 42096, 63281, 2023, 8816, 47449, 19523, 59515, 65122, 59659, 86283, 68258, 69572, 13798, 16435, 91529, 67245, 52670, 35583, 16563, 79246, 86686, 76463, 34222, 26655, 90802, 60584, 47377, 7500, 37992, 45134, 26529, 26760, 83637, 41326, 44344, 53853, 41377, 36066, 94850, 58838, 73859, 49364, 73331, 96240, 43642, 24637, 38736, 74384, 89342, 52623, 7992, 12369, 18601, 3742, 83873, 83080, 12451, 38992, 22815, 7759, 51777, 97377, 27585, 51972, 37867, 16444, 24334, 36151, 99073, 27493, 70939, 85130, 32552, 54846, 54759, 60790, 18157, 57178, 65762, 11161, 78576, 45819, 52979, 65130, 4860, 3991, 10461, 93716, 16894, 66083, 24653, 84609, 58232, 88618, 19161, 38555, 95554, 32886, 59780, 8355, 60860, 29735, 47762, 71299, 23853, 17546, 73704, 92052, 46215, 55121, 29281, 59076, 7936, 27954, 58909, 32643, 52861, 95819, 6831, 911, 98936, 76355, 93779, 80863, 514, 69572, 68777, 39510, 35905, 14060, 40619, 29549, 69616, 33564, 60780, 24122, 66591, 27699, 6494, 14845, 46672, 61958, 77100, 90899, 75754, 61196, 30231, 92962, 61773, 41839, 55382, 17267, 70943, 78038, 70267, 30532, 21704, 10274, 12202, 39685, 23309, 10061, 68829, 55986, 66485, 3788, 97599, 75867, 20717, 74416, 53166, 35208, 33374, 87539, 8823, 48228, 63379, 85783, 47619, 53152, 67433, 35663, 52972, 16818, 60311, 60365, 94653, 35075, 33949, 42614, 29297, 1918, 28316, 98953, 73231, 83799, 42402, 56623, 34442, 34994, 41374, 70071, 14736, 9958, 18065, 32960, 7405, 36409, 83232, 99385, 41600, 11133, 7586, 15917, 6253, 19322, 53845, 57620, 52606, 66497, 68646, 78138, 66559, 19640, 99413, 11220, 94747, 7399, 37408, 48509, 23929, 27482, 45476, 85244, 35159, 31751, 57260, 68980, 5339, 15470, 48355, 88651, 22596, 3152, 19121, 88492, 99382, 14454, 4504, 20094, 98977, 74843, 93413, 22109, 78508, 30934, 47744, 7481, 83828, 73788, 6533, 28597, 20405, 94205, 20380, 22888, 48893, 27499, 98748, 60530, 45128, 74022, 84617, 82037, 10268, 78212, 16993, 35902, 91386, 44372, 15486, 65741, 14014, 87481, 37220, 41849, 84547, 46850, 52326, 34677, 58300, 74910, 64345, 19325, 81549, 46352, 33049, 69248, 93460, 45305, 7521, 61318, 31855, 14413, 70951, 11087, 96294, 14013, 31792, 59747, 67277, 76503, 34513, 39663, 77544, 52701, 8337, 56303, 87315, 16520, 69676, 11654, 99893, 2181, 68161, 57275, 36898, 81304, 48585, 68652, 27376, 92852, 55866, 88448, 3584, 20857, 73156, 70284, 24326, 79375, 95220, 1159, 63267, 10622, 48391, 15633, 84924, 90415, 93614, 33521, 26665, 55823, 47641, 86225, 31704, 92694, 48297, 39904, 2115, 59589, 49067, 66821, 41575, 49767, 4037, 77613, 19019, 88152, 80, 20554, 91409, 96277, 48257, 50816, 97616, 38688, 32486, 45134, 63545, 59404, 72059, 43947, 51680, 43852, 59693, 25163, 1889, 70014, 15021, 41290, 67312, 71857, 15957, 68971, 11403, 65251, 7629, 37239, 33295, 5870, 1119, 92784, 26340, 18477, 65622, 36815, 43625, 18637, 37509, 82444, 99005, 4921, 73701, 14707, 93997, 64397, 11692, 5327, 82162, 20247, 81759, 45197, 25332, 83745, 22567, 4515, 25624, 95096, 67946, 48460, 85558, 15191, 18782, 16930, 33361, 83761, 60873, 43253, 84145, 60833, 25983, 1291, 41349, 20368, 7126, 14387, 6345, 80854, 9279, 43529, 6318, 38384, 74761, 41196, 37480, 51321, 92246, 80088, 77074, 88722, 56736, 66164, 49431, 66919, 31678, 72472, 8, 80890, 18002, 94813, 31900, 54155, 83436, 35352, 54131, 5466, 55306, 93128, 18464, 74457, 90561, 72848, 11834, 79982, 68416, 39528, 72484, 82474, 25593, 48545, 35247, 18619, 13674, 18611, 19241, 81616, 18711, 53342, 44276, 75122, 11724, 74627, 73707, 58319, 15997, 7586, 16120, 82641, 22820, 92904, 13141, 32392, 19763, 61199, 67940, 90767, 4235, 13574, 17200, 69902, 63742, 78464, 22501, 18627, 90872, 40188, 28193, 29593, 88627, 94972, 11598, 62095, 36787, 441, 58997, 34414, 82157, 86887, 55087, 19152, 23, 12302, 80783, 32624, 68691, 63439, 75363, 44989, 16822, 36024, 867, 76378, 41605, 65961, 73488, 67049, 9070, 93399, 45547, 94458, 74284, 5041, 49807, 20288, 34060, 79495, 4146, 52162, 90286, 54158, 34243, 46978, 35482, 59362, 95938, 91704, 30552, 4737, 21031, 75051, 93029, 47665, 64382, 99782, 93478, 94015, 46874, 32444, 48277, 59820, 96163, 64654, 25843, 41145, 42820, 74108, 88222, 88570, 74015, 25704, 91035, 1755, 14750, 48968, 38603, 62880, 87873, 95160, 59221, 22304, 90314, 72877, 17334, 39283, 4149, 11748, 12102, 80580, 41867, 17710, 59621, 6554, 7850, 73950, 79552, 17944, 5600, 60478, 3343, 25852, 58905, 57216, 39618, 49856, 99326, 66067, 42792, 95043, 52680, 46780, 56487, 9971, 59481, 37006, 22186, 54244, 91030, 45547, 70818, 59849, 96169, 61459, 21647, 87417, 17198, 30945, 57589, 31732, 57260, 47670, 7654, 46376, 25366, 94746, 49580, 69170, 37403, 86995, 90307, 94304, 71803, 26825, 5511, 12459, 91314, 8345, 88975, 35841, 85771, 8105, 59987, 87112, 21476, 14713, 71181, 27767, 43584, 85301, 88977, 29490, 69714, 73035, 41207, 74699, 9310, 13025, 14338, 54066, 15243, 47724, 66733, 47431, 43905, 31048, 56699, 80217, 36292, 98525, 24335, 24432, 24896, 43277, 58874, 11466, 16082, 10875, 62004, 90391, 61105, 57411, 6368, 53856, 30743, 8670, 84741, 54127, 57326, 26629, 19087, 24472, 88779, 30540, 27886, 61732, 75454, 60311, 42824, 37301, 42678, 45990, 43242, 17374, 52003, 70707, 70214, 49739, 71484, 92003, 98086, 76668, 73209, 59202, 11973, 2902, 33250, 78626, 51594, 16453, 94614, 39014, 97066, 83012, 9832, 25571, 77628, 66692, 13986, 99837, 582, 81232, 44987, 9504, 96412, 90193, 79568, 44071, 28091, 7362, 97703, 76447, 42537, 98524, 97831, 65704, 9514, 41468, 85149, 49554, 17994, 14924, 39650, 95294, 556, 70481, 6905, 94559, 37559, 49678, 53119, 70312, 5682, 66986, 34099, 74474, 20740, 41615, 70360, 64114, 58660, 90850, 64618, 80620, 51790, 11436, 38072, 50273, 93113, 41794, 86861, 24781, 89683, 55411, 85667, 77535, 99892, 41396, 80504, 90670, 8289, 40902, 5069, 95083, 6783, 28102, 57816, 25807, 24260, 71529, 78920, 72682, 7385, 90726, 57166, 98884, 8583, 6170, 97965, 88302, 98041, 21443, 41808, 68984, 83620, 89747, 98882, 60808, 54444, 74412, 81105, 1176, 28838, 36421, 16489, 18059, 51061, 80940, 44893, 10408, 36222, 80582, 71944, 92638, 40333, 67054, 16067, 19516, 90120, 46759, 71643, 13177, 55292, 21036, 82808, 77501, 97427, 49386, 54480, 23604, 23554, 21785, 41101, 91178, 10174, 29420, 90438, 6312, 88940, 15995, 69321, 47458, 64809, 98189, 81851, 29651, 84215, 60942, 307, 11897, 92674, 40405, 68032, 96717, 54244, 10701, 41393, 92329, 98932, 78284, 46347, 71209, 92061, 39448, 93136, 25722, 8564, 77936, 63574, 31384, 51924, 85561, 29671, 58137, 17820, 22751, 36518, 38101, 77756, 11657, 13897, 95889, 57067, 47648, 13885, 70669, 93406, 39641, 69457, 91339, 22502, 92613, 89719, 11947, 56203, 19324, 20504, 84054, 40455, 99396, 63680, 67667, 60631, 69181, 96845, 38525, 11600, 47468, 3577, 57649, 63266, 24700, 71594, 14004, 23153, 69249, 5747, 43321, 31370, 28977, 23896, 76479, 68562, 62342, 7589, 8899, 5985, 64281, 61826, 18555, 64937, 13173, 33365, 78851, 16499, 87064, 13075, 66847, 70495, 32350, 2985, 86716, 38746, 26313, 77463, 55387, 72681, 72461, 33230, 21529, 53424, 92581, 2262, 78438, 66276, 18396, 73538, 21032, 91050, 13058, 16218, 12470, 56500, 15292, 76139, 59526, 52113, 95362, 67011, 6651, 16136, 1016, 857, 55018, 56374, 35824, 71708, 49712, 97380, 10404, 55452, 34030, 60726, 75211, 10271, 36633, 68424, 58275, 61764, 97586, 54716, 50259, 46345, 87195, 46092, 26787, 60939, 89514, 11788, 68224, 23417, 73959, 76145, 30342, 40277, 11049, 72049, 15472, 50669, 48139, 36732, 46874, 37088, 73465, 9819, 58869, 35220, 12120, 86124, 51247, 44302, 60883, 52109, 21437, 36786, 49226, 77837, 19612, 78430, 11661, 94770, 77603, 65669, 86868, 12665, 30012, 75989, 39141, 77400, 28000, 64238, 73258, 71794, 31340, 26256, 66453, 37016, 64756, 80457, 8747, 12836, 3469, 50678, 3274, 43423, 66677, 82556, 92901, 51878, 56441, 22998, 29718, 38447, 6453, 25311, 7565, 53771, 3551, 90070, 9483, 94050, 45938, 18135, 36908, 43321, 11073, 51803, 98884, 66209, 6830, 53656, 14663, 56346, 71430, 4909, 19818, 5707, 27369, 86882, 53473, 7541, 53633, 70863, 3748, 12822, 19360, 49088, 59066, 75974, 63335, 20483, 43514, 37481, 58278, 26967, 49325, 43951, 91647, 93783, 64169, 49022, 98588, 9495, 49829, 59068, 38831, 4838, 83605, 92419, 39542, 7772, 71568, 75673, 35185, 89759, 44901, 74291, 24895, 88530, 70774, 35439, 46758, 70472, 70207, 92675, 91623, 61275, 35720, 26556, 95596, 20094, 73750, 85788, 34264, 1703, 46833, 65248, 14141, 53410, 38649, 6343, 57256, 61342, 72709, 75318, 90379, 37562, 27416, 75670, 92176, 72535, 93119, 56077, 6886, 18244, 92344, 31374, 82071, 7429, 81007, 47749, 40744, 56974, 23336, 88821, 53841, 10536, 21445, 82793, 24831, 93241, 14199, 76268, 70883, 68002, 3829, 17443, 72513, 76400, 52225, 92348, 62308, 98481, 29744, 33165, 33141, 61020, 71479, 45027, 76160, 57411, 13780, 13632, 52308, 77762, 88874, 33697, 83210, 51466, 9088, 50395, 26743, 5306, 21706, 70001, 99439, 80767, 68749, 95148, 94897, 78636, 96750, 9024, 94538, 91143, 96693, 61886, 5184, 75763, 47075, 88158, 5313, 53439, 14908, 8830, 60096, 21551, 13651, 62546, 96892, 25240, 47511, 58483, 87342, 78818, 7855, 39269, 566, 21220, 292, 24069, 25072, 29519, 52548, 54091, 21282, 21296, 50958, 17695, 58072, 68990, 60329, 95955, 71586, 63417, 35947, 67807, 57621, 64547, 46850, 37981, 38527, 9037, 64756, 3324, 4986, 83666, 9282, 25844, 79139, 78435, 35428, 43561, 69799, 63314, 12991, 93516, 23394, 94206, 93432, 37836, 94919, 26846, 2555, 74410, 94915, 48199, 5280, 37470, 93622, 4345, 15092, 19510, 18094, 16613, 78234, 50001, 95491, 97976, 38306, 32192, 82639, 54624, 72434, 92606, 23191, 74693, 78521, 104, 18248, 75583, 90326, 50785, 54034, 66251, 35774, 14692, 96345, 44579, 85932, 44053, 75704, 20840, 86583, 83944, 52456, 73766, 77963, 31151, 32364, 91691, 47357, 40338, 23435, 24065, 8458, 95366, 7520, 11294, 23238, 1748, 41690, 67328, 54814, 37777, 10057, 42332, 38423, 2309, 70703, 85736, 46148, 14258, 29236, 12152, 5088, 65825, 2463, 65533, 21199, 60555, 33928, 1817, 7396, 89215, 30722, 22102, 15880, 92261, 17292, 88190, 61781, 48898, 92525, 21283, 88581, 60098, 71926, 819, 59144, 224, 30570, 90194, 18329, 6999, 26857, 19238, 64425, 28108, 16554, 16016, 42, 83229, 10333, 36168, 65617, 94834, 79782, 23924, 49440, 30432, 81077, 31543, 95216, 64865, 13658, 51081, 35337, 74538, 44553, 64672, 90960, 41849, 93865, 44608, 93176, 34851, 5249, 29329, 19715, 94082, 14738, 86667, 43708, 66354, 93692, 25527, 56463, 99380, 38793, 85774, 19056, 13939, 46062, 27647, 66146, 63210, 96296, 33121, 54196, 34108, 75814, 85986, 71171, 15102, 28992, 63165, 98380, 36269, 60014, 7201, 62448, 46385, 42175, 88350, 46182, 49126, 52567, 64350, 16315, 53969, 80395, 81114, 54358, 64578, 47269, 15747, 78498, 90830, 25955, 99236, 43286, 91064, 99969, 95144, 64424, 77377, 49553, 24241, 8150, 89535, 8703, 91041, 77323, 81079, 45127, 93686, 32151, 7075, 83155, 10252, 73100, 88618, 23891, 87418, 45417, 20268, 11314, 50363, 26860, 27799, 49416, 83534, 19187, 8059, 76677, 2110, 12364, 71210, 87052, 50241, 90785, 97889, 81399, 58130, 64439, 5614, 59467, 58309, 87834, 57213, 37510, 33689, 1259, 62486, 56320, 46265, 73452, 17619, 56421, 40725, 23439, 41701, 93223, 41682, 45026, 47505, 27635, 56293, 91700, 4391, 67317, 89604, 73020, 69853, 61517, 51207, 86040, 2596, 1655, 9918, 45161, 222, 54577, 74821, 47335, 8582, 52403, 94255, 26351, 46527, 68224, 90183, 85057, 72310, 34963, 83462, 49465, 46581, 61499, 4844, 94626, 2963, 41482, 83879, 44942, 63915, 94365, 92560, 12363, 30246, 2086, 75036, 88620, 91088, 67691, 67762, 34261, 8769, 91830, 23313, 18256, 28850, 37639, 92748, 57791, 71328, 37110, 66538, 39318, 15626, 44324, 82827, 8782, 65960, 58167, 1305, 83950, 45424, 72453, 19444, 68219, 64733, 94088, 62006, 89985, 36936, 61630, 97966, 76537, 46467, 30942, 7479, 67971, 14558, 22458, 35148, 1929, 17165, 12037, 74558, 16250, 71750, 55546, 29693, 94984, 37782, 41659, 39098, 23982, 29899, 71594, 77979, 54477, 13764, 17315, 72893, 32031, 39608, 75992, 73445, 1317, 50525, 87313, 45191, 30214, 19769, 90043, 93478, 58044, 6949, 31176, 88370, 50274, 83987, 45316, 38551, 79418, 14322, 91065, 7841, 36130, 86602, 10659, 40859, 964, 71577, 85447, 61079, 96910, 72906, 7361, 84338, 34114, 52096, 66715, 51091, 86219, 81115, 49625, 48799, 89485, 24855, 13684, 68433, 70595, 70102, 71712, 88559, 92476, 32903, 68009, 58417, 87962, 11787, 16644, 72964, 29776, 63075, 13270, 84758, 49560, 10317, 28778, 23006, 31036, 84906, 81488, 17340, 74154, 42801, 27917, 89792, 62604, 62234, 13124, 76471, 51667, 37589, 87147, 24743, 48023, 6325, 79794, 35889, 13255, 4925, 99004, 70322, 60832, 76636, 56907, 56534, 72615, 46288, 36788, 93196, 68656, 66492, 35933, 52293, 47953, 95495, 95304, 50009, 83464, 28608, 38074, 74083, 9337, 7965, 65047, 36871, 59015, 21769, 30398, 44855, 1020, 80680, 59328, 8712, 48190, 45332, 27284, 31287, 66011, 9376, 86379, 74508, 33579, 77114, 92955, 23085, 92824, 3054, 25242, 16322, 48498, 9938, 44420, 13484, 52319, 58875, 2012, 88591, 52500, 95795, 41800, 95363, 54142, 17482, 32705, 60564, 12505, 40954, 46174, 64130, 63026, 96712, 79883, 39225, 52653, 69549, 36693, 59822, 22684, 31661, 88298, 15489, 16030, 42480, 15372, 38781, 71995, 77438, 91161, 10192, 7839, 62735, 99218, 25624, 2547, 27445, 69187, 55749, 32322, 15504, 73298, 51108, 48717, 92926, 75705, 89787, 96114, 99902, 37749, 96305, 12829, 70474, 838, 50385, 91711, 80370, 56504, 56857, 80906, 9018, 76569, 61072, 48568, 36491, 22587, 44363, 39592, 61546, 90181, 37348, 41665, 41339, 62106, 44203, 6732, 76111, 79840, 67999, 32231, 76869, 58652, 49983, 1669, 27464, 79553, 52855, 25988, 18087, 38052, 17529, 13607, 657, 76173, 43357, 77334, 24140, 53860, 2906, 89863, 44651, 55715, 26203, 65933, 51087, 98234, 40625, 45545, 63563, 89148, 82581, 4110, 66683, 99001, 9796, 47349, 65003, 66524, 81970, 71262, 14479, 31300, 8681, 58068, 44115, 40064, 77879, 23965, 69019, 73985, 19453, 26225, 97543, 37044, 7494, 85778, 35345, 61115, 92498, 49737, 64599, 7158, 82763, 25072, 38478, 57782, 75291, 62155, 52056, 4786, 11585, 71251, 25572, 79771, 93328, 66927, 54069, 58752, 26624, 50463, 77361, 29991, 96526, 2820, 91659, 12818, 96356, 49499, 1507, 40223, 9171, 83642, 21057, 2677, 9367, 38097, 16100, 19355, 6120, 15378, 56559, 69167, 30235, 6767, 66323, 78294, 14916, 19124, 88044, 16673, 66102, 86018, 29406, 75415, 22038, 27056, 26906, 25867, 14751, 92380, 30434, 44114, 6026, 79553, 55091, 95385, 41212, 37882, 46864, 54717, 97038, 53805, 64150, 70915, 63127, 63695, 41288, 38192, 72437, 75075, 18570, 52065, 8853, 30104, 79937, 66913, 53200, 84570, 78079, 28970, 53859, 37632, 80274, 35240, 32960, 74859, 7359, 55176, 3930, 38984, 35151, 82576, 82805, 94031, 12779, 90879, 24109, 25367, 77861, 9541, 85739, 69023, 64971, 99321, 7521, 95909, 43897, 71724, 92581, 5471, 64337, 98949, 3606, 78236, 78985, 29212, 57369, 34857, 67757, 58019, 58872, 96526, 28749, 56592, 37871, 72905, 70198, 57319, 54116, 47014, 18285, 33692, 72111, 60958, 96848, 17893, 40993, 50445, 14186, 76877, 87867, 50335, 9513, 44346, 26439, 55293, 6449, 44301, 63740, 40158, 72703, 88321, 85062, 57345, 66231, 15409, 3451, 95261, 43561, 15673, 28956, 90303, 62469, 82517, 43035, 36850, 15592, 64098, 59022, 31752, 4370, 50486, 11885, 23085, 41712, 80692, 48492, 16495, 99721, 36912, 28267, 27882, 16269, 64483, 11273, 2680, 1616, 46138, 54606, 14761, 5134, 45144, 63213, 49666, 27441, 86989, 29884, 54334, 6740, 8368, 80051, 81020, 17882, 74973, 74531, 94994, 24927, 64894, 22667, 20466, 82948, 66831, 47427, 76033, 31197, 59817, 20064, 61135, 28556, 29695, 80179, 74058, 18293, 9963, 35278, 13062, 83094, 23373, 90287, 33477, 48865, 30348, 70174, 11468, 25994, 25343, 22317, 1587, 30682, 1, 67814, 59557, 23362, 13746, 82244, 42093, 24671, 79458, 93730, 45488, 60234, 67098, 9899, 25775, 332, 36636, 57594, 19958, 85564, 58977, 12247, 60774, 66371, 69442, 20385, 14486, 91330, 50332, 46023, 75768, 59877, 60081, 92936, 72302, 75064, 85727, 52987, 5750, 19384, 33684, 78859, 80458, 69902, 34870, 88684, 49762, 40801, 86291, 18194, 90366, 82639, 53844, 96326, 65728, 48563, 26027, 52692, 62406, 76294, 41848, 63010, 69841, 29451, 36170, 21529, 16525, 64326, 22086, 24469, 57407, 96033, 37771, 31002, 18311, 93285, 31948, 14331, 58335, 15977, 80336, 81667, 27286, 24361, 61638, 57580, 95270, 46180, 76990, 53031, 94366, 2727, 49944, 19278, 5756, 51875, 53445, 33342, 1965, 7937, 10054, 97712, 87693, 58124, 46064, 39133, 77385, 9605, 65359, 70113, 90563, 86637, 94282, 12025, 31926, 24541, 23854, 58407, 32131, 92845, 20714, 27898, 26917, 50326, 35145, 50859, 72119, 95094, 29441, 42301, 62460, 75252, 94267, 38422, 73047, 24200, 85349, 72049, 91723, 97802, 98496, 12734, 73432, 10371, 57213, 53300, 80847, 46229, 7099, 72961, 13767, 65654, 31102, 82119, 96946, 65919, 81083, 3819, 57888, 57908, 16849, 77111, 41429, 92261, 45263, 1172, 55926, 78835, 27697, 48420, 58865, 41207, 21406, 8582, 10785, 36233, 12237, 7866, 13706, 92551, 11021, 63813, 71512, 65206, 37768, 94325, 14721, 20990, 54235, 71986, 5345, 56239, 52028, 1419, 7215, 55067, 11669, 21738, 66605, 69621, 69827, 8537, 18638, 60982, 28151, 98885, 76431, 25566, 3085, 23639, 30849, 63986, 73287, 26201, 36174, 14106, 54102, 57041, 16141, 64174, 3591, 90024, 73332, 31254, 17288, 59809, 25061, 51612, 47951, 16570, 43330, 79213, 11354, 55585, 19646, 99246, 37564, 32660, 20632, 21124, 60597, 69315, 31312, 57741, 85108, 21615, 24365, 27684, 16124, 33888, 14966, 35303, 69921, 15795, 4020, 67672, 86816, 63027, 84470, 45605, 44887, 26222, 79888, 58982, 22466, 98844, 48353, 60666, 58256, 31140, 93507, 69561, 6256, 88526, 18655, 865, 75247, 264, 65957, 98261, 72706, 36396, 46065, 85700, 32121, 99975, 73627, 78812, 89638, 86602, 96758, 65099, 52777, 46792, 13790, 55240, 52002, 10313, 91933, 71231, 10053, 78416, 54563, 96004, 42215, 30094, 45958, 48437, 49591, 50483, 13422, 69108, 59952, 27896, 40450, 79327, 31962, 46456, 39260, 51479, 61882, 48181, 50691, 64709, 32902, 10676, 12083, 35771, 79656, 56667, 76783, 3937, 99859, 10362, 57411, 40986, 35045, 2838, 29255, 64230, 84418, 34988, 77644, 39892, 77327, 74129, 53444, 35487, 95803, 38640, 20383, 55402, 25793, 14213, 87082, 42837, 95030, 97198, 61608, 97723, 79390, 35290, 34683, 81419, 87133, 70447, 53127, 97146, 28299, 56763, 12868, 1145, 12147, 58158, 92124, 60934, 18414, 97510, 7056, 54488, 20719, 53743, 91037, 44797, 52110, 8512, 18991, 20129, 31441, 51449, 14661, 71126, 23180, 68124, 18807, 70997, 21913, 19594, 70355, 73637, 68266, 60775, 43164, 52643, 96363, 77989, 79332, 39890, 65379, 20405, 52935, 43816, 92740, 95319, 4538, 60660, 28982, 15328, 80475, 34690, 2293, 19646, 46524, 96627, 33159, 42081, 8816, 74931, 20674, 8697, 66169, 46460, 46326, 39923, 60625, 28386, 22919, 19415, 75766, 43668, 31626, 70301, 67053, 3949, 70082, 2303, 48642, 38429, 94053, 38770, 68137, 68441, 52928, 70244, 91954, 17401, 92693, 98342, 21451, 84988, 80487, 33807, 73797, 49494, 41878, 76635, 83227, 76618, 11946, 13451, 87591, 78381, 21407, 90038, 72638, 69692, 51599, 86413, 32019, 64856, 74730, 41531, 11064, 1790, 58817, 86400, 66213, 92599, 70905, 78324, 54326, 43659, 34206, 63132, 38837, 40210, 96346, 16967, 81619, 96503, 14881, 89405, 32205, 49508, 98425, 2451, 35423, 56072, 36810, 30332, 85998, 49358, 92748, 84147, 79835, 94867, 41224, 61794, 35066, 82220, 66684, 20096, 2754, 41731, 37068, 32753, 91059, 13407, 5607, 69384, 53329, 95909, 44968, 11397, 92973, 50014, 92997, 80968, 93761, 57598, 74703, 7768, 37978, 73873, 33475, 9720, 97852, 98449, 48722, 84977, 11271, 11728, 68318, 22312, 78792, 87508, 88466, 72976, 47099, 84126, 38595, 85124, 64405, 90020, 7492, 52413, 95111, 34455, 86311, 68892, 1074, 60274, 28136, 19328, 38161, 57475, 13771, 63562, 84207, 94121, 18901, 52768, 33801, 82087, 86091, 59969, 90398, 56870, 55756, 78841, 98450, 54165, 55106, 50343, 70519, 14567, 36780, 55450, 19606, 83749, 67562, 64765, 38543, 16585, 86841, 73742, 8766, 39252, 75678, 75379, 78760, 37279, 15280, 13558, 95916, 89759, 76686, 76467, 67147, 63110, 94008, 8037, 35263, 53710, 16667, 79008, 11231, 29397, 67136, 18601, 64502, 90228, 89109, 72849, 22711, 65547, 34542, 26686, 81678, 87765, 77654, 23664, 96352, 14106, 32938, 28083, 18633, 80286, 65507, 46197, 52722, 75476, 77816, 47204, 34876, 45963, 79262, 90181, 84041, 3745, 90041, 30780, 27226, 92847, 85572, 15308, 80688, 5761, 82638, 13464, 23683, 81015, 54214, 64175, 43701, 86845, 15569, 50687, 52679, 87696, 8285, 97444, 47599, 94472, 64150, 87753, 68652, 60726, 26213, 17320, 64553, 81285, 98126, 12158, 52095, 64833, 492, 35817, 55571, 91300, 97812, 37507, 4209, 53515, 64342, 21223, 16662, 43265, 68219, 3529, 43636, 68417, 53640, 95326, 93381, 37113, 80751, 76469, 96677, 43054, 22937, 31954, 13266, 34140, 27253, 2734, 99070, 60077, 57988, 93211, 92795, 83795, 57477, 3941, 39007, 14619, 38320, 93449, 31336, 25279, 97030, 26245, 47394, 39475, 90621, 23820, 29344, 94859, 91604, 14033, 41868, 14816, 4075, 66644, 87803, 97815, 99552, 78666, 3942, 8175, 22345, 19983, 76783, 99044, 20851, 84981, 59052, 77178, 72109, 76475, 21619, 73017, 6812, 56633, 50612, 55289, 4671, 84419, 94072, 94446, 80603, 32188, 93415, 23464, 43947, 43728, 74284, 67177, 57105, 31059, 10642, 13803, 69602, 46961, 66567, 19359, 84676, 63918, 40650, 12923, 15974, 79732, 20225, 92525, 71179, 4859, 91208, 60430, 5239, 61458, 24089, 68852, 60171, 29603, 42535, 86365, 93905, 28237, 45317, 60718, 82001, 41679, 20679, 56304, 70043, 87568, 21386, 59049, 78353, 48696, 77379, 55309, 23780, 28391, 5940, 55583, 81256, 59418, 97521, 32846, 70761, 90115, 45325, 5490, 65974, 11186, 15357, 3568, 450, 96644, 58976, 36211, 88240, 92457, 89200, 94696, 11370, 91157, 48487, 59501, 56983, 89795, 42789, 69758, 79701, 29511, 55968, 41472, 89474, 84344, 80517, 7485, 97523, 17264, 82840, 59556, 37119, 30985, 48866, 60605, 95719, 70417, 59083, 95137, 76538, 44155, 67286, 57897, 28262, 4052, 919, 86207, 79932, 44236, 10089, 44373, 65670, 44285, 6903, 20834, 49701, 95735, 21149, 3425, 17594, 31427, 14262, 32252, 68540, 39427, 44026, 47257, 45055, 95091, 8367, 28381, 57375, 41562, 83883, 27715, 10122, 67745, 46497, 28626, 87297, 36568, 39483, 11385, 63292, 92305, 78683, 6146, 81905, 15038, 38338, 51206, 65749, 34119, 71516, 74068, 51094, 6665, 91884, 66762, 11428, 70908, 21506, 480, 94183, 78484, 66507, 75901, 25728, 52539, 86806, 69944, 65036, 27882, 2530, 4918, 74351, 65737, 89178, 8791, 39342, 94963, 22581, 56917, 17541, 83578, 75376, 65202, 30935, 79270, 91986, 99286, 45236, 44720, 81915, 70881, 45886, 43213, 49789, 97081, 16075, 20517, 69980, 25310, 91953, 1759, 67635, 88933, 54558, 18395, 73375, 62251, 58871, 9870, 70538, 48936, 7757, 90374, 56631, 88862, 30487, 38794, 36079, 32712, 11130, 55451, 25137, 38785, 83558, 31960, 69473, 45950, 18225, 9871, 88502, 75179, 11551, 75664, 74321, 67351, 27703, 83717, 18913, 42470, 8816, 37627, 14288, 62831, 44047, 67612, 72738, 26995, 50933, 63758, 50003, 43693, 52661, 55852, 52372, 59042, 37595, 4931, 73622, 68387, 86478, 40997, 5245, 75300, 24902, 59609, 35653, 15970, 37681, 69365, 22236, 86374, 65550, 343, 98377, 35354, 65770, 15365, 41422, 71356, 16630, 40044, 19290, 66449, 53629, 79452, 71674, 30260, 97303, 6487, 62789, 13005, 70152, 22501, 49867, 89294, 59232, 31776, 54919, 99851, 5438, 1096, 72269, 50486, 16719, 6144, 82041, 38332, 64452, 31840, 99287, 59928, 25503, 8407, 46970, 45907, 99238, 74547, 19704, 72035, 26542, 54600, 79172, 58779, 35747, 78956, 11478, 41195, 58135, 63856, 33037, 45753, 60159, 25193, 71838, 7526, 7985, 60714, 88627, 75790, 38454, 96110, 39237, 19792, 34534, 70169, 24805, 63215, 38175, 38784, 38855, 24826, 50917, 25147, 17082, 26997, 32295, 10894, 21805, 65245, 85407, 37926, 69214, 38579, 84721, 23544, 88548, 65626, 75517, 69737, 55626, 52175, 21697, 19453, 16908, 82841, 24060, 40285, 19195, 80281, 89322, 15232, 70043, 60691, 86370, 91949, 19017, 83846, 77869, 14321, 95102, 87073, 71467, 31305, 64677, 80358, 52629, 79419, 22359, 87867, 48296, 50141, 46807, 82184, 95812, 84665, 74511, 59914, 4146, 90417, 58508, 62875, 17630, 21868, 9199, 30322, 33352, 43374, 25473, 4119, 63086, 14147, 14863, 38020, 44757, 98628, 57916, 22199, 11865, 42911, 62651, 78290, 9392, 77294, 63168, 21043, 17409, 13786, 27475, 75979, 89668, 43596, 74316, 84489, 54941, 95992, 45445, 41059, 55142, 15214, 42903, 16799, 88254, 95984, 48575, 77822, 21067, 57238, 35352, 96779, 89564, 23797, 99937, 46379, 27119, 16060, 30302, 95327, 12849, 38111, 97090, 7598, 78473, 63079, 18570, 72803, 70040, 91385, 96436, 96263, 17368, 56188, 85999, 50026, 36050, 73736, 13351, 48321, 28357, 51718, 65636, 72903, 21584, 21060, 39829, 15564, 4716, 14594, 22363, 97639, 65937, 17802, 31535, 42767, 98761, 30987, 57657, 33398, 63053, 25926, 20944, 19306, 81727, 2695, 97479, 79172, 72764, 66446, 78864, 12698, 15812, 97209, 38827, 91016, 91281, 57875, 45228, 49211, 69755, 99224, 43999, 62879, 8879, 80015, 74396, 57146, 64665, 31159, 6980, 79069, 37409, 75037, 69977, 85919, 42826, 6974, 61063, 97640, 13433, 92528, 91311, 8440, 38840, 22362, 93929, 1836, 36590, 75052, 89475, 15437, 65648, 99012, 70236, 12307, 83585, 414, 62851, 48787, 28447, 21702, 57033, 29633, 44760, 34165, 27548, 37516, 24343, 63046, 2081, 20378, 19510, 42226, 97134, 68739, 32982, 56455, 53129, 77693, 25022, 55534, 99375, 30086, 98001, 7432, 67126, 76656, 29347, 28492, 43108, 64736, 32278, 84816, 80440, 30461, 818, 9136, 1952, 48442, 91058, 92590, 10443, 5195, 34009, 32141, 62209, 43740, 54102, 76895, 98172, 31583, 4155, 66492, 58981, 16591, 11331, 6838, 3818, 77063, 12523, 45570, 68970, 70055, 77751, 73743, 71732, 4704, 61384, 57343, 66682, 44500, 89745, 10436, 67202, 36455, 42467, 88801, 91280, 1056, 27534, 81619, 79004, 25824, 66362, 33280, 20706, 31929, 57422, 18730, 96197, 22101, 47592, 2180, 18287, 82310, 60430, 59627, 26471, 7794, 60475, 76713, 45427, 89654, 14370, 81674, 41246, 98416, 8669, 48883, 77154, 9806, 94015, 60347, 20027, 8405, 33150, 27368, 53375, 70171, 59431, 14534, 34018, 85665, 77797, 17944, 49602, 74391, 48830, 55029, 10371, 94261, 16658, 68400, 44148, 28150, 40364, 90913, 73151, 64463, 50058, 78191, 84439, 82478, 62398, 3113, 17578, 12830, 6571, 95934, 9132, 25287, 78731, 80683, 67207, 76597, 42096, 34934, 76609, 52553, 47508, 71561, 8038, 83011, 72577, 95790, 40076, 20292, 32138, 61197, 95476, 23123, 26648, 13611, 48452, 39963, 85857, 4855, 27029, 1542, 72443, 53688, 82635, 56264, 7977, 23090, 93553, 65434, 12124, 91087, 87800, 95675, 99419, 44659, 30382, 55263, 82514, 86800, 16781, 65977, 65946, 13033, 93895, 4056, 75895, 47878, 91309, 51233, 81409, 46773, 69135, 56906, 84493, 34530, 84534, 38312, 54574, 92933, 77341, 20839, 36126, 1143, 35356, 35459, 7959, 98335, 53266, 36146, 78047, 50607, 22486, 63308, 8996, 96056, 39085, 26567, 6779, 62663, 30523, 47881, 41279, 49864, 82248, 78333, 29466, 48151, 41957, 93235, 53308, 22682, 90722, 54478, 7235, 34306, 15827, 20121, 96837, 6283, 80172, 66109, 92592, 48238, 76428, 94546, 45430, 16288, 74839, 740, 25553, 83767, 35900, 5998, 7493, 46755, 11449, 88824, 44906, 33143, 7454, 56652, 34755, 63992, 59674, 65131, 46358, 12799, 96988, 51158, 73176, 1184, 49925, 63519, 11785, 29073, 72850, 47997, 75172, 55187, 15313, 40725, 33225, 56643, 10465, 38583, 86440, 97967, 26401, 17078, 38765, 33454, 19136, 57712, 48446, 98790, 27315, 71074, 10157, 57946, 35582, 49383, 61324, 26572, 84503, 3496, 60449, 17962, 26017, 65651, 40400, 83246, 80056, 75306, 75147, 41863, 25581, 87530, 33193, 43294, 5065, 99644, 62771, 75986, 79005, 44924, 18703, 40889, 4403, 5862, 2571, 82500, 74200, 36170, 46836, 74642, 65471, 26815, 30937, 64946, 10160, 15544, 31962, 54015, 28853, 66533, 14573, 79398, 47391, 73165, 47805, 77589, 16881, 13423, 89452, 76992, 62509, 9796, 57540, 13486, 48855, 25546, 47589, 21012, 47388, 78428, 70196, 84413, 81026, 87597, 22445, 83769, 85937, 38321, 85485, 87359, 9839, 67228, 71179, 94372, 4446, 62801, 50775, 96179, 40646, 44272, 12417, 47199, 39701, 30665, 32775, 66525, 53558, 78882, 31939, 67209, 38906, 34533, 99914, 27719, 216, 99225, 96537, 3843, 90564, 91110, 51838, 30300, 9559, 37795, 94880, 11325, 44979, 89696, 28129, 29931, 89971, 46292, 92710, 11036, 74760, 75307, 12291, 49618, 16293, 92408, 67928, 80823, 32872, 25460, 66819, 35374, 4035, 99087, 61129, 11341, 39118, 10891, 37217, 63638, 75477, 30068, 42334, 57570, 6890, 59353, 89939, 37692, 15232, 20033, 32202, 22348, 2766, 96791, 58448, 92248, 5769, 96684, 67885, 99295, 47271, 38655, 59513, 96960, 31718, 8974, 16122, 20535, 52380, 29769, 70660, 57425, 50891, 75044, 84257, 73315, 38181, 28673, 93140, 26307, 82265, 78382, 19681, 56585, 8975, 76764, 39956, 83450, 84663, 89963, 71584, 57696, 30829, 60527, 64947, 34899, 28805, 28397, 91830, 51842, 99838, 39839, 66971, 67177, 74219, 35637, 35634, 93581, 81746, 29991, 81096, 94279, 2968, 62561, 2479, 82126, 25702, 67953, 88088, 50293, 83423, 86206, 39935, 23253, 43041, 48941, 85787, 8388, 6671, 43574, 84908, 67295, 33623, 55060, 28174, 48415, 2529, 22009, 24524, 5283, 30460, 32399, 80423, 56929, 40852, 69969, 88541, 5979, 91496, 64730, 57198, 83145, 39750, 3568, 54669, 98679, 4297, 51047, 31492, 47734, 31343, 31180, 232, 19707, 24823, 75079, 73943, 17997, 8446, 91252, 39879, 58682, 82972, 18417, 39203, 36681, 42895, 8459, 15618, 17941, 52594, 43277, 16530, 40052, 91100, 87422, 47230, 95699, 49794, 50492, 87439, 86354, 4546, 65333, 11057, 77727, 19748, 38722, 91821, 18107, 42125, 89239, 28847, 54623, 38783, 47803, 31414, 38450, 3697, 89186, 30579, 44188, 26532, 8420, 80723, 48100, 60748, 76330, 45832, 8311, 16051, 4475, 13400, 48527, 46073, 17439, 56498, 94632, 9021, 16871, 83366, 14896, 4219, 38375, 87890, 90217, 42370, 61028, 85101, 76771, 83715, 94737, 69973, 74187, 1958, 59691, 86712, 86570, 60984, 76342, 13648, 85250, 28323, 48379, 45141, 36277, 51845, 29039, 3553, 5128, 59866, 51281, 68124, 17007, 24729, 29710, 41439, 40574, 11774, 86746, 89698, 56020, 37810, 88972, 11361, 95583, 70786, 589, 74473, 87513, 17690, 61427, 72914, 32517, 1804, 97910, 6327, 30246, 33049, 2622, 41026, 80875, 41293, 16752, 84225, 84414, 37137, 68956, 8095, 64981, 28180, 38629, 76962, 23840, 17477, 75268, 48297, 70340, 57888, 13938, 38554, 86836, 2195, 30270, 55484, 53364, 54705, 41380, 56316, 37723, 234, 21424, 26664, 63804, 75139, 36534, 18579, 9833, 98849, 72762, 59767, 52497, 24227, 83152, 71794, 21398, 99456, 89215, 51632, 54799, 27973, 68568, 68465, 98500, 28681, 18369, 24279, 96335, 12874, 82160, 67202, 85199, 27908, 67022, 49810, 77929, 96212, 81153, 77884, 7032, 1671, 53362, 28119, 56786, 30883, 28540, 76029, 3774, 64611, 19736, 25589, 46569, 45206, 48215, 69523, 17423, 91807, 90039, 30393, 58319, 85098, 66519, 57571, 24541, 3562, 14400, 62731, 82534, 61477, 89731, 18421, 29861, 52829, 838, 78040, 43350, 74323, 82892, 84746, 28302, 13264, 7595, 134, 12933, 46831, 24864, 47275, 20527, 9110, 28485, 30326, 99826, 64005, 99308, 65779, 42760, 90066, 3974, 38688, 39968, 32604, 11694, 46262, 73262, 45405, 43923, 67397, 88228, 56405, 17839, 92073, 57622, 93328, 15442, 50186, 7570, 58001, 31000, 8915, 11467, 14793, 82691, 51238, 12485, 51745, 18192, 5985, 36826, 89434, 38669, 91592, 88799, 65621, 67237, 59541, 19657, 93402, 58705, 73553, 78280, 69125, 95591, 81168, 91927, 25976, 89077, 71690, 19404, 64603, 59752, 74698, 44233, 67602, 38615, 31303, 28650, 53700, 89819, 7783, 4351, 77451, 47350, 21234, 16016, 41532, 76508, 23063, 44993, 43983, 33356, 61715, 96485, 22121, 78004, 6316, 87896, 99289, 93981, 37850, 66128, 92735, 45064, 50924, 24204, 58816, 65290, 34392, 55567, 66416, 72353, 45775, 68590, 85685, 72683, 60090, 37149, 85347, 57414, 72336, 12979, 5720, 92754, 76911, 96883, 74420, 5220, 85815, 23557, 80567, 44365, 70254, 50864, 36619, 51479, 23281, 76428, 18580, 34240, 59289, 49076, 18439, 29522, 42541, 4024, 84446, 92434, 90407, 77241, 19690, 78143, 65919, 13699, 91844, 91241, 38361, 67171, 90551, 5709, 3474, 76025, 97043, 33834, 44638, 54040, 82797, 545, 38159, 16089, 35870, 89158, 55864, 98078, 50563, 36492, 10994, 85909, 9018, 19252, 73887, 67928, 60045, 70782, 11937, 4074, 53814, 46621, 52577, 94853, 45968, 73667, 65062, 73306, 76045, 78649, 91654, 53958, 96537, 95542, 67622, 54579, 17279, 67440, 56441, 20681, 64011, 52226, 96618, 32831, 60664, 67547, 39523, 2043, 59748, 1887, 69229, 94653, 99271, 98164, 62155, 9234, 47367, 13047, 6364, 35064, 10073, 6793, 80248, 29009, 44969, 11129, 17139, 79630, 89772, 26921, 56949, 23465, 30036, 17173, 82459, 96218, 60768, 76417, 24405, 18710, 68887, 82394, 69729, 82503, 40873, 41590, 67255, 30757, 9657, 91881, 34578, 9511, 5417, 58953, 18532, 10721, 22029, 48524, 47778, 881, 83489, 3464, 57462, 97459, 86689, 39755, 39547, 740, 36666, 7993, 31671, 86304, 12970, 73402, 52849, 31652, 79655, 11250, 18463, 57518, 20306, 25301, 1374, 51208, 33298, 87662, 61849, 60923, 68685, 69411, 39266, 80320, 34844, 89416, 81569, 83651, 35795, 40168, 33501, 1042, 58931, 3892, 85188, 74740, 85476, 23790, 33842, 89565, 53359, 25579, 59049, 62394, 72435, 12457, 21904, 18370, 97035, 57905, 9581, 91227, 92754, 37760, 1411, 7440, 87175, 88318, 63242, 85960, 56690, 12618, 30493, 11569, 73723, 7448, 58830, 157, 65814, 21118, 22140, 73793, 57855, 81830, 6795, 13183, 12625, 30635, 56429, 73216, 12342, 36722, 83886, 96828, 82870, 90954, 97614, 2370, 42160, 73370, 11944, 49067, 59452, 80495, 43911, 46712, 17033, 68037, 41963, 3874, 44856, 82985, 57453, 84358, 16120, 4454, 76624, 405, 62369, 55080, 61880, 51270, 87807, 10653, 36894, 70850, 35660, 234, 14705, 93418, 94084, 82856, 25384, 71555, 56754, 78315, 18291, 91656, 98079, 52384, 43306, 65205, 75903, 58701, 99496, 50048, 33557, 87793, 90857, 10143, 46726, 84284, 43635, 41213, 83845, 70986, 91408, 80220, 5728, 68890, 46577, 21152, 43759, 43301, 93661, 97252, 50106, 10099, 13722, 18572, 44024, 351, 18173, 23717, 85114, 85998, 57782, 63951, 53723, 86853, 63851, 79430, 49181, 46386, 69666, 55743, 76162, 71724, 40028, 94786, 34457, 16906, 90040, 30789, 40281, 94697, 96584, 81907, 4055, 53990, 66397, 80579, 42517, 78181, 39251, 9467, 67097, 95523, 66568, 63632, 71048, 15581, 39904, 75774, 77495, 75994, 29911, 65690, 41178, 47712, 70355, 16998, 56025, 5230, 10093, 71495, 34784, 70950, 54680, 57811, 53782, 39145, 36829, 85342, 40406, 35883, 45668, 3459, 29870, 78252, 70088, 70621, 67153, 5737, 40933, 91075, 93335, 86853, 15860, 81167, 91259, 16118, 52401, 83593, 84474, 2423, 75608, 39646, 90871, 70284, 82100, 96032, 5115, 63678, 2225, 88087, 58581, 44364, 57468, 21539, 13042, 64150, 63754, 5210, 87644, 54114, 64013, 63562, 41388, 32397, 74152, 23982, 71982, 71700, 33026, 66477, 47838, 46712, 39848, 35083, 65927, 97868, 11067, 76771, 71799, 43836, 41014, 97025, 93225, 8511, 63096, 26628, 73012, 12543, 76269, 99708, 2629, 49845, 73677, 19193, 14924, 57236, 95564, 15010, 59667, 73773, 78515, 2624, 99744, 13585, 33746, 58771, 94785, 62628, 99585, 11363, 80832, 59979, 9444, 78700, 2596, 85984, 69438, 16913, 96475, 93283, 18625, 77086, 45911, 39746, 64722, 39938, 43930, 54619, 302, 50384, 2738, 75714, 75249, 95439, 80714, 52555, 47266, 96190, 78750, 94973, 83669, 16479, 53163, 48071, 28000, 45011, 26733, 67132, 83362, 84162, 43028, 8415, 27236, 52651, 89059, 64844, 80910, 1676, 91752, 57815, 26264, 3415, 57532, 29981, 61200, 96036, 62600, 20068, 56530, 38487, 8432, 89514, 26883, 69165, 97237, 22361, 55276, 39902, 95927, 82190, 49269, 27212, 46095, 37106, 64254, 27460, 49572, 51700, 27679, 12574, 33891, 3867, 9925, 6476, 82018, 45094, 59014, 67113, 44192, 75, 23318, 79895, 70550, 81717, 28833, 30271, 15821, 14999, 88174, 62617, 57517, 55256, 50281, 51583, 96879, 5225, 42272, 5339, 20483, 57596, 41011, 75937, 22767, 50120, 95938, 49753, 63882, 99616, 69083, 38721, 73889, 80236, 99531, 23053, 71237, 48861, 59046, 76283, 60538, 19732, 93877, 30345, 64882, 66660, 17026, 70364, 45676, 8039, 96228, 89936, 59141, 95585, 89552, 97247, 59325, 27848, 80058, 15950, 61481, 90906, 40998, 44137, 16144, 66300, 44091, 50018, 81364, 18211, 60294, 76559, 20279, 27414, 10589, 39860, 23000, 31767, 95618, 56738, 50332, 16936, 70342, 92481, 30702, 76264, 62619, 68678, 62284, 83112, 93032, 55203, 52614, 36950, 41796, 45403, 79262, 2887, 53596, 61308, 20738, 34811, 27099, 90956, 65448, 3080, 75795, 29753, 97699, 80872, 23830, 85882, 74427, 99523, 74904, 28017, 45898, 57232, 48525, 7086, 26805, 74533, 92470, 18840, 76011, 93109, 14344, 55614, 50284, 15865, 19458, 35856, 13464, 53679, 64603, 51571, 56124, 79107, 29596, 89572, 78198, 57121, 73649, 8804, 87977, 87959, 70859, 40909, 77295, 87877, 75158, 62810, 92074, 23244, 59516, 50552, 31602, 41899, 6347, 27821, 68370, 48596, 88577, 30231, 25267, 84622, 31449, 12086, 56461, 22962, 78213, 62483, 93966, 60437, 52239, 58113, 32526, 38708, 81607, 57016, 1695, 90110, 4649, 59990, 23979, 3855, 10297, 46516, 96092, 82305, 30760, 78756, 4967, 82876, 4773, 86651, 16648, 53133, 82439, 78851, 49766, 24553, 15273, 36417, 1901, 33386, 76979, 25920, 33372, 2695, 11982, 40911, 6230, 91696, 43907, 17827, 30332, 89203, 32215, 91806, 23080, 49102, 9174, 11548, 54590, 75803, 66108, 73882, 62324, 26017, 72716, 33887, 1285, 31604, 71039, 24337, 53514, 58964, 89901, 22040, 92751, 12617, 37007, 5523, 61672, 62557, 98540, 26094, 60284, 19621, 96230, 38044, 6545, 9458, 42988, 2913, 86345, 67936, 90174, 40840, 44991, 24256, 34989, 74086, 13652, 68706, 1363, 4294, 88008, 78693, 83068, 94746, 221, 89299, 53186, 5930, 61889, 51341, 45412, 58860, 72568, 11381, 59785, 36887, 10690, 31347, 93326, 96267, 86987, 57565, 86836, 49071, 90331, 41248, 34629, 30240, 27270, 3864, 84308, 3035, 61369, 36902, 51017, 44409, 17120, 23823, 36460, 63359, 8333, 63173, 19134, 6493, 303, 18550, 26191, 19051, 81502, 66343, 6737, 90430, 65478, 58982, 82484, 16483, 47704, 44640, 68322, 44548, 72787, 2335, 28749, 39320, 5436, 98146, 56596, 812, 51445, 35533, 35478, 47573, 38414, 25542, 38032, 13442, 42983, 97207, 77854, 57806, 81616, 52828, 79429, 47389, 96795, 57764, 19605, 24767, 63253, 18809, 65093, 44449, 22952, 76872, 30983, 38948, 9310, 48336, 87651, 27110, 84427, 76209, 56412, 12760, 16747, 14551, 82626, 31224, 98636, 75100, 84882, 79479, 83420, 5347, 6803, 90063, 4617, 40257, 79183, 41766, 71873, 25242, 12275, 336, 40798, 42055, 74066, 69128, 32547, 76508, 32530, 42359, 89207, 49758, 58984, 92732, 15779, 7234, 28884, 28226, 50011, 35883, 99606, 45423, 76224, 75427, 85747, 33879, 97978, 57441, 927, 19164, 74716, 40702, 19715, 70917, 60344, 40236, 9019, 50577, 15598, 53136, 57285, 20536, 7539, 74832, 89184, 41501, 39447, 97422, 97041, 21913, 40581, 76081, 13089, 28776, 54164, 55736, 36263, 71841, 34488, 74988, 55467, 43322, 9214, 36746, 67981, 71877, 81683, 32461, 84091, 19422, 88366, 62054, 85664, 13409, 8003, 88276, 6989, 16607, 33633, 85349, 5784, 25950, 97998, 74110, 16699, 60184, 92818, 79705, 10381, 1474, 18656, 50434, 18232, 92132, 66537, 70141, 42854, 25120, 39581, 28249, 14215, 34810, 19767, 3409, 11807, 6566, 66138, 42997, 41999, 67504, 87117, 28961, 5000, 29673, 77726, 73225, 54753, 69712, 71576, 92337, 17713, 63185, 87923, 91889, 68351, 17712, 75532, 93849, 48280, 62219, 317, 25290, 29209, 90927, 92929, 92762, 60413, 2018, 31793, 76290, 73373, 80777, 60819, 77375, 57886, 47291, 99670, 32605, 29064, 99476, 80999, 31217, 35, 91300, 14892, 73653, 26593, 25305, 56797, 12837, 39560, 27582, 37253, 38531, 76489, 49946, 69108, 58687, 43092, 73807, 96282, 6648, 67431, 87124, 57694, 21660, 64002, 6, 33600, 30245, 60636, 80164, 9285, 61426, 4658, 54130, 14710, 76553, 1904, 93668, 63110, 98618, 5601, 32199, 74923, 98049, 49717, 55539, 35940, 58545, 43295, 35810, 45451, 38735, 42065, 66769, 69825, 45461, 83881, 67372, 67351, 90612, 79502, 69460, 23108, 74421, 82990, 46821, 40683, 71603, 55267, 48192, 50242, 79738, 96417, 6664, 19929, 23644, 41116, 51056, 219, 45086, 32747, 49492, 15399, 24874, 80825, 95928, 61457, 45813, 59037, 16136, 3953, 83583, 5910, 12654, 53630, 92997, 22168, 93491, 71897, 74579, 24022, 6278, 24049, 71670, 43044, 8474, 38572, 77402, 35800, 7455, 96177, 41653, 74493, 20802, 65843, 73050, 73349, 2638, 65813, 96209, 49196, 45007, 32207, 14097, 66059, 46681, 7534, 71263, 20582, 10171, 51514, 52142, 60961, 57951, 25637, 37860, 21683, 86190, 90434, 94481, 85697, 95344, 2606, 74095, 61133, 7472, 64777, 94050, 41482, 975, 23471, 76052, 82021, 87676, 91345, 20196, 2612, 86299, 44996, 40312, 65712, 46079, 88514, 8610, 3685, 63197, 9073, 53105, 86824, 28112, 99306, 40706, 66840, 83003, 51590, 52755, 32285, 68454, 85058, 13645, 23073, 24724, 52989, 71880, 21952, 44144, 74975, 76715, 7844, 46447, 86643, 75579, 29276, 10864, 83179, 36721, 19300, 35066, 29383, 47478, 56644, 33354, 31414, 17643, 92374, 85085, 88458, 87191, 85248, 34963, 76278, 53230, 13953, 76985, 70959, 36663, 5293, 32658, 56767, 56997, 76736, 6558, 64248, 11907, 29123, 78458, 17678, 63805, 89973, 5076, 39263, 54404, 4355, 64957, 74407, 99838, 18836, 78098, 6490, 74888, 73719, 80675, 86178, 56283, 33591, 96957, 38382, 18772, 74773, 71229, 2603, 52673, 44609, 14843, 58418, 18060, 95459, 626, 30914, 13550, 42195, 44863, 8871, 89182, 64446, 78422, 41140, 15312, 98274, 48168, 95651, 35562, 85386, 56252, 72136, 85088, 68761, 78434, 98143, 61330, 2446, 64409, 49406, 99127, 98626, 55095, 44808, 13594, 87370, 89472, 12833, 98932, 68064, 58193, 20225, 5192, 28425, 23978, 24542, 80845, 55858, 4015, 21454, 37346, 51007, 17202, 10242, 12682, 55933, 96922, 22280, 75597, 50227, 70712, 44236, 20470, 36320, 49339, 60536, 80083, 38880, 93327, 49522, 93585, 9918, 55268, 4671, 57526, 11457, 48424, 54610, 7211, 78610, 9473, 72923, 27347, 30057, 76968, 26177, 59367, 46172, 88951, 40229, 34921, 60405, 88959, 16779, 29547, 92231, 61997, 36002, 21080, 39795, 77221, 10012, 49748, 76900, 15964, 3803, 40260, 92351, 92844, 10288, 57483, 10881, 70408, 75688, 16610, 1638, 93082, 44282, 66849, 75702, 69428, 34047, 84968, 71281, 72328, 73143, 88672, 49802, 50639, 18129, 93659, 58389, 49095, 45971, 34196, 84609, 59222, 19332, 17777, 41004, 47057, 30688, 16039, 20906, 41477, 42915, 60877, 33864, 75195, 62294, 3371, 11672, 1370, 2486, 35553, 17907, 90621, 45136, 9722, 67635, 12114, 63055, 16004, 21625, 24321, 20491, 26881, 66259, 94287, 54751, 36242, 36557, 5842, 30687, 65418, 94608, 24741, 45887, 78800, 86912, 42076, 50287, 9284, 68891, 76368, 83094, 96302, 35997, 30761, 97081, 9501, 68887, 32876, 1705, 34260, 95065, 45528, 88241, 30402, 12318, 52430, 40139, 96986, 84900, 72408, 42027, 31676, 54382, 73370, 26184, 14024, 57444, 57660, 52173, 30274, 93448, 63273, 77681, 74946, 2099, 69091, 19372, 66961, 14595, 58642, 75760, 52253, 53148, 26074, 52293, 65359, 63971, 4833, 86492, 1227, 54505, 19515, 89889, 46933, 13364, 33883, 83389, 36952, 52505, 67513, 40071, 31001, 3105, 87912, 29610, 75108, 37363, 28479, 43546, 89992, 19550, 54863, 82633, 19209, 21548, 35022, 21960, 57961, 11815, 95867, 559, 26428, 69386, 57453, 70147, 73538, 49562, 46806, 64550, 36653, 25718, 68792, 31113, 7607, 48037, 71020, 22666, 65957, 11141, 39227, 7990, 19849, 65972, 74528, 40888, 55386, 95918, 92088, 91125, 53648, 66122, 138, 79933, 71058, 34826, 97725, 69513, 22915, 18246, 52244, 91161, 40861, 40374, 13239, 56162, 4703, 95851, 22824, 41271, 28202, 62852, 84238, 46625, 20031, 8524, 20077, 65817, 21174, 29279, 57712, 22401, 67500, 30980, 74485, 26480, 21343, 30031, 61921, 35744, 57308, 71196, 1865, 49234, 62616, 54021, 29008, 83672, 85839, 96836, 45077, 80900, 66906, 63526, 93824, 71820, 11033, 20183, 85704, 4683, 63512, 39144, 56880, 64424, 95979, 17709, 94849, 31771, 5737, 84286, 16757, 46256, 24478, 73180, 59978, 8254, 78963, 95437, 86351, 33824, 32540, 18357, 2668, 99260, 21284, 81351, 70961, 10255, 6911, 47394, 72408, 23827, 59865, 96395, 30665, 43699, 3593, 29165, 23388, 26628, 92402, 16731, 86740, 29493, 9069, 78653, 90094, 42735, 33682, 95041, 89887, 92369, 57949, 81585, 50593, 14698, 4737, 72551, 57271, 59433, 156, 33966, 58773, 59108, 49578, 18100, 59836, 73221, 21110, 1650, 11058, 47770, 66141, 84576, 58388, 40915, 94507, 32209, 17272, 65674, 95552, 25685, 5345, 36995, 36302, 7971, 67001, 62062, 75939, 36005, 26739, 56484, 46885, 66348, 87666, 78055, 44485, 82955, 85936, 9219, 1847, 92687, 72579, 45457, 78252, 98239, 40000, 75563, 92408, 17175, 78845, 32638, 26959, 35406, 59553, 57852, 7506, 9, 93172, 77713, 93880, 40981, 27924, 9678, 24538, 52426, 84852, 83781, 23712, 82490, 77890, 22482, 66668, 55850, 25644, 44972, 62275, 78089, 28894, 98685, 32998, 98766, 89119, 34355, 75127, 69797, 71419, 62067, 57990, 96514, 50603, 79807, 26135, 29207, 43632, 32905, 38513, 18924, 88872, 20758, 70232, 60425, 1116, 24077, 21369, 93541, 75329, 78656, 44251, 42014, 98154, 42552, 14575, 30765, 348, 1134, 71581, 68420, 78141, 21105, 63305, 9718, 54851, 65867, 8595, 47390, 39182, 51174, 41478, 64433, 59628, 31945, 87322, 78667, 95282, 5622, 26224, 19972, 97269, 98376, 14779, 51138, 49658, 45345, 4972, 52794, 15737, 496, 48939, 63485, 42780, 16061, 59631, 37171, 13483, 56058, 51093, 62290, 88227, 17400, 88433, 67363, 89507, 26482, 85964, 71336, 67799, 28342, 37747, 61722, 27180, 78755, 18603, 42953, 6606, 23875, 56766, 1932, 36113, 62807, 84012, 21103, 9685, 69662, 76755, 13701, 95168, 13169, 44726, 15284, 16702, 89617, 54397, 52052, 12835, 37741, 86434, 22400, 37947, 95763, 86337, 35189, 22756, 47473, 16618, 42479, 47405, 14055, 64262, 66670, 89692, 54032, 94591, 44149, 29854, 76691, 33263, 62048, 25116, 88598, 16119, 62116, 54517, 31883, 86707, 18895, 81790, 71294, 2684, 15292, 48107, 14341, 91416, 75609, 92564, 39987, 2283, 89970, 95855, 80970, 5432, 89860, 90293, 99851, 94648, 5598, 32171, 28793, 92305, 64244, 8277, 93391, 96717, 34464, 29838, 10664, 28050, 60122, 77934, 10758, 84922, 92220, 45071, 97697, 36368, 17792, 84792, 76594, 67319, 51886, 5665, 45201, 11348, 9254, 7510, 51039, 91683, 84500, 85338, 5555, 19633, 3870, 39576, 41486, 58524, 54508, 20707, 58504, 39642, 22454, 80069, 83455, 31043, 90794, 51934, 3295, 26582, 16300, 74990, 22197, 83310, 69642, 81113, 58558, 84833, 17105, 46659, 25003, 85749, 44829, 4103, 67516, 76458, 52392, 53546, 70291, 98846, 67315, 30686, 18555, 29755, 5923, 22732, 19501, 56181, 85351, 5023, 4808, 56911, 16793, 75336, 49712, 27723, 96974, 34321, 5454, 12862, 71924, 45928, 95697, 68664, 58183, 78104, 42483, 71204, 99628, 40642, 56410, 17350, 13396, 76724, 87509, 9158, 83708, 27298, 92651, 95086, 38851, 63558, 89810, 1580, 32518, 35795, 26514, 56322, 78635, 63731, 91428, 7247, 66460, 38671, 26799, 22549, 47991, 46064, 80467, 40083, 17141, 39152, 99872, 27561, 75389, 74778, 94893, 82935, 99076, 93419, 10474, 84436, 47536, 16719, 60136, 80566, 28404, 74525, 74212, 3704, 65516, 98197, 34210, 64140, 22238, 49939, 99542, 27481, 21992, 78181, 90060, 71365, 66935, 29578, 14961, 8569, 9454, 43308, 66753, 45972, 93572, 16382, 87320, 37183, 25478, 38164, 31997, 69856, 60898, 63968, 62264, 4799, 17591, 89937, 73905, 55890, 88285, 2448, 40398, 54180, 65869, 45155, 43407, 39105, 339, 51619, 20203, 21189, 68245, 76912, 1222, 76411, 82679, 7, 66047, 32043, 42627, 16638, 27019, 15248, 66444, 8249, 18790, 82150, 54084, 84469, 3426, 50226, 99868, 88894, 43769, 66384, 8593, 41414, 2976, 60053, 51866, 87904, 74135, 53842, 59520, 67482, 16995, 32328, 29555, 49067, 2799, 68851, 41049, 97190, 53984, 99755, 46412, 45885, 64000, 21962, 36438, 71742, 57223, 66599, 86071, 31436, 32667, 98099, 38399, 47377, 5171, 2742, 48803, 17823, 22093, 9866, 691, 5514, 25546, 2114, 5919, 56181, 96052, 67211, 61712, 25995, 3188, 23833, 38549, 44775, 55355, 61548, 55988, 47309, 23749, 30667, 70732, 33299, 16127, 30842, 78961, 41072, 9876, 18903, 30292, 25275, 61881, 15939, 72573, 84502, 92654, 97226, 53434, 77025, 63892, 12421, 33644, 39445, 30933, 84218, 13757, 37719, 84450, 2697, 60309, 22402, 80310, 92771, 45205, 72792, 95776, 85945, 74651, 216, 50842, 47854, 21916, 61588, 75405, 10495, 83083, 60427, 78495, 99809, 47890, 22993, 21508, 9459, 26845, 98130, 1184, 46438, 27698, 40652, 65654, 98517, 1096, 6998, 49133, 57041, 77983, 58708, 42176, 67356, 324, 70063, 10597, 65205, 25622, 34336, 16640, 27896, 26907, 86760, 48244, 89650, 44997, 51609, 28934, 9171, 97859, 97213, 19859, 41037, 64081, 94781, 27683, 41521, 52871, 86935, 26486, 38744, 25943, 60617, 6414, 42292, 46204, 53262, 30201, 38776, 88831, 97253, 67282, 72860, 18452, 60927, 81504, 57713, 30296, 10896, 39900, 67135, 42772, 4631, 55283, 39253, 25264, 1809, 12874, 88035, 88421, 90491, 83290, 6884, 15444, 90113, 20406, 20796, 40239, 34431, 15018, 45600, 17241, 26611, 9551, 89126, 65673, 31708, 91252, 39647, 63011, 24193, 58932, 89326, 33491, 53217, 27976, 70151, 37531, 53576, 23931, 11789, 73073, 52171, 89301, 51718, 15385, 79487, 66436, 35771, 34163, 86540, 42665, 80748, 77622, 14679, 40185, 25030, 42622, 13162, 17048, 24243, 59985, 59807, 60562, 3595, 10135, 29199, 69784, 59796, 38194, 58432, 50943, 40422, 63035, 3208, 81440, 90749, 88046, 32218, 88092, 22224, 2627, 91576, 16781, 43948, 57795, 71073, 27817, 87077, 82717, 24473, 42096, 76920, 88864, 90537, 14715, 42551, 45066, 24316, 37361, 38582, 21871, 14672, 93362, 21727, 57021, 94313, 39562, 64985, 94028, 46094, 43845, 91838, 79574, 7597, 3153, 56783, 18817, 74711, 6883, 91061, 31674, 73729, 99315, 66183, 57647, 74484, 68077, 33224, 397, 56753, 53158, 71872, 68153, 9298, 20961, 49656, 33407, 95683, 14328, 44708, 72952, 27048, 67887, 28741, 46752, 88177, 95894, 40086, 88534, 87112, 68614, 83073, 88794, 96799, 67588, 75049, 84603, 83140, 97347, 87316, 73087, 77135, 71883, 98643, 3808, 8848, 14133, 60447, 1366, 72976, 1868, 51667, 63279, 60040, 88264, 79152, 3474, 61366, 20523, 21584, 93712, 83654, 89761, 90154, 96345, 37539, 32556, 74254, 70603, 97122, 44978, 78028, 8943, 13778, 11080, 34271, 68276, 85372, 48410, 94516, 15427, 75323, 71685, 70774, 50342, 33771, 3678, 42321, 69788, 41758, 55004, 30992, 17402, 63523, 42328, 87171, 24751, 15084, 33884, 83655, 88345, 69602, 52606, 57886, 18034, 3381, 75796, 35901, 77480, 28683, 68324, 66035, 7223, 14926, 16128, 13645, 90370, 31949, 11057, 98849, 29499, 21565, 30786, 83292, 92392, 37104, 36899, 49906, 79368, 43710, 80365, 88735, 75275, 21664, 57965, 19002, 301, 12658, 94385, 1717, 96191, 50404, 80166, 93965, 24688, 27839, 10812, 31715, 92127, 42588, 93307, 80834, 11317, 26583, 25769, 98227, 14884, 58462, 29148, 68662, 26872, 72927, 79021, 51622, 29521, 33355, 45701, 45996, 33782, 93424, 16530, 96086, 17329, 74020, 11501, 46660, 5583, 22277, 77653, 55430, 84644, 448, 86828, 58855, 67451, 95264, 67386, 82424, 52611, 60012, 88620, 72894, 94716, 22262, 99813, 69592, 63464, 33163, 91857, 47904, 22209, 78590, 68615, 52952, 31441, 41313, 18550, 72685, 68825, 4795, 53971, 14592, 39634, 23682, 76630, 2731, 81481, 86542, 23727, 54291, 56045, 61635, 32186, 9355, 73416, 63532, 24340, 18886, 84832, 30654, 48543, 18339, 65024, 91197, 64624, 74648, 9660, 27897, 49771, 11123, 8732, 49393, 12911, 72416, 17834, 18878, 62754, 85072, 23727, 56577, 51257, 83291, 12329, 16203, 91681, 68137, 79959, 43609, 58987, 2026, 42969, 59144, 84349, 75214, 76972, 22633, 64104, 53799, 16851, 99197, 70476, 77113, 46320, 88693, 37711, 96536, 68156, 7119, 2104, 49435, 77706, 18924, 24957, 92406, 87148, 70482, 36491, 42605, 54440, 7893, 31618, 35707, 65130, 30007, 75706, 77266, 37100, 9601, 87681, 42543, 69847, 81848, 32034, 49429, 99434, 62209, 17125, 55227, 61634, 52574, 83649, 28725, 70119, 62467, 80676, 21192, 99584, 21310, 25292, 72781, 17186, 10393, 98390, 19789, 92931, 36234, 62627, 23437, 3885, 58822, 82941, 43806, 8172, 23790, 72295, 36196, 98200, 2889, 87619, 13846, 56197, 27151, 21238, 48794, 81100, 62643, 40001, 39243, 33213, 78416, 194, 91369, 79342, 36404, 52308, 13741, 24442, 88610, 12659, 11574, 70052, 93039, 79367, 41792, 61816, 35435, 47192, 97596, 28330, 41145, 16918, 62865, 9576, 45857, 68737, 90124, 16703, 7071, 48433, 57222, 34435, 800, 72496, 16449, 68187, 28739, 97672, 86818, 50768, 40807, 88681, 64340, 2224, 19703, 59245, 90905, 31239, 84216, 93942, 97371, 16842, 92168, 52692, 16064, 84686, 89444, 27938, 98406, 41365, 4515, 20494, 18813, 16242, 10634, 61566, 18592, 78057, 8720, 33739, 78345, 87693, 30242, 70545, 55521, 23687, 9160, 8655, 38811, 61768, 7228, 5567, 5561, 82071, 85, 50145, 23113, 97761, 88441, 14891, 72188, 85166, 37189, 75671, 81377, 92470, 73645, 93258, 6610, 12185, 43065, 26704, 47922, 56650, 7527, 18006, 56948, 51675, 16658, 66402, 1047, 81624, 77395, 62310, 73262, 66050, 57275, 32936, 87641, 51528, 58183, 21952, 84098, 28913, 28622, 18140, 89796, 41317, 93954, 67690, 64667, 57092, 21315, 4731, 76115, 77291, 11204, 8634, 93034, 27411, 27149, 13843, 9817, 9407, 84492, 28444, 59901, 14592, 89654, 66207, 66232, 80293, 74502, 36925, 55515, 10121, 16768, 4720, 71502, 40500, 21406, 571, 87320, 81683, 42788, 86367, 44686, 22159, 67015, 35892, 49668, 83991, 72088, 30210, 74009, 86370, 97956, 2132, 93512, 54819, 26094, 51409, 21485, 94764, 85806, 13393, 48543, 7042, 76538, 64224, 47909, 9994, 23750, 17351, 52141, 30486, 60380, 86546, 66606, 36913, 58173, 45709, 83679, 82617, 23381, 9603, 61107, 566, 6572, 64745, 10614, 86371, 43244, 97154, 10397, 50975, 68006, 20045, 16942, 25536, 74031, 31807, 70133, 78790, 40341, 68730, 39635, 39013, 66841, 44043, 96215, 21270, 59427, 25034, 40645, 84741, 52083, 54503, 36861, 27659, 95463, 53847, 40921, 70116, 61536, 56756, 8967, 31079, 20097, 76014, 99818, 16606, 19713, 66904, 27106, 24874, 96701, 73287, 76772, 6073, 57343, 51428, 91171, 28299, 17520, 64903, 4177, 36071, 94952, 59008, 28543, 11576, 74547, 13260, 20688, 41261, 2780, 6633, 37536, 8844, 95774, 49323, 30448, 14154, 83379, 71259, 23302, 68402, 43750, 88505, 15575, 44927, 6584, 29867, 21541, 65763, 12154, 86616, 79877, 73259, 68626, 98962, 68548, 86576, 48046, 51755, 64995, 3661, 64585, 81550, 46798, 49319, 50206, 22024, 5175, 12923, 23427, 55915, 91723, 55831, 83784, 81034, 86779, 34622, 84570, 18960, 48798, 42970, 95789, 39465, 82353, 68905, 44234, 18244, 54345, 5592, 89361, 14644, 67924, 66415, 89349, 88530, 72096, 44459, 5258, 48317, 48866, 56886, 90458, 75889, 4514, 37227, 11302, 4667, 2129, 80414, 86289, 15887, 87380, 50749, 83220, 50529, 20619, 11606, 36531, 23409, 78122, 19566, 76564, 33045, 66703, 30017, 35347, 35038, 12952, 13971, 3922, 98702, 11786, 38388, 69556, 76728, 60535, 59961, 23634, 42211, 98387, 34880, 27755, 93182, 99040, 96390, 65989, 38375, 3652, 59657, 57431, 24666, 11061, 64713, 85185, 72849, 58611, 31220, 26657, 77056, 24553, 24993, 5210, 89024, 32054, 46997, 92652, 28363, 98992, 22593, 97710, 47766, 37646, 93573, 95502, 33790, 92973, 27766, 62671, 89698, 10877, 73893, 41004, 96035, 18795, 48080, 59666, 30241, 35233, 87353, 43647, 13404, 41982, 19264, 29229, 61369, 8309, 39383, 42305, 25944, 13577, 51545, 68990, 69801, 37145, 79189, 55897, 57793, 66816, 21930, 56771, 79296, 73793, 21632, 42301, 23696, 72641, 56310, 85576, 3004, 25669, 69221, 32996, 23040, 65782, 23712, 13414, 10758, 15590, 97298, 74246, 51511, 46900, 36795, 38292, 3852, 6384, 84421, 3446, 91670, 45312, 27609, 87034, 6683, 83891, 88991, 16533, 9197, 34427, 60384, 48525, 90978, 46107, 21693, 12956, 21804, 46558, 37682, 81207, 85840, 53238, 35026, 4835, 53264, 41376, 17783, 64756, 39278, 25403, 33042, 20954, 31193, 24247, 45911, 92453, 25370, 86602, 48574, 57865, 26436, 16122, 76614, 17028, 21262, 59718, 77821, 14036, 31033, 90563, 45410, 15158, 90209, 84089, 38053, 60780, 54166, 14255, 33120, 27171, 71798, 91214, 80040, 56699, 12475, 40193, 59415, 4769, 75920, 1036, 2692, 75862, 16612, 73670, 61182, 3305, 90334, 187, 91659, 28063, 75684, 50017, 82643, 9282, 77376, 85469, 8164, 5584, 36623, 82597, 83859, 3435, 98460, 70095, 80257, 4381, 6501, 8924, 35514, 14297, 54373, 71369, 5172, 15955, 82441, 4636, 48215, 6821, 3385, 17663, 40107, 55679, 30366, 42390, 95895, 16083, 58499, 17176, 55993, 51034, 49296, 4010, 78974, 35930, 2019, 96226, 27167, 68245, 53109, 59037, 37843, 79243, 10262, 58797, 61490, 82590, 52411, 54783, 29447, 94551, 30026, 97959, 93939, 73217, 82573, 62154, 78291, 33728, 39102, 11484, 86210, 43794, 73553, 87435, 1110, 77108, 56521, 78610, 8254, 1842, 43068, 70415, 79195, 26136, 49786, 47279, 38471, 20379, 54704, 86614, 91138, 51595, 50818, 80186, 73087, 17262, 94735, 4952, 27935, 4928, 74862, 51392, 62388, 9570, 38485, 30594, 56278, 47395, 72762, 94597, 72279, 16010, 34697, 54475, 67874, 78014, 88381, 4045, 41494, 55178, 46054, 24373, 1824, 55333, 7525, 97908, 61178, 84635, 2199, 35361, 4803, 21907, 79414, 66083, 54782, 58692, 28332, 41851, 28198, 55819, 37313, 67046, 16147, 90478, 71230, 34141, 85002, 44332, 35906, 429, 39744, 773, 22909, 19536, 98986, 90945, 45209, 85439, 92265, 25291, 22775, 60611, 49159, 95701, 36113, 53923, 60824, 84935, 29656, 50007, 86624, 61691, 76150, 32187, 42765, 60660, 13859, 10792, 88210, 29374, 29563, 45188, 28811, 19739, 67649, 73775, 99247, 48414, 91067, 68253, 9452, 90116, 91737, 73979, 62370, 69112, 58791, 20349, 71480, 56852, 36919, 87977, 77609, 68738, 85159, 4918, 70076, 46473, 4122, 57713, 1426, 50987, 77910, 66211, 62546, 77749, 96462, 34304, 77441, 12104, 91805, 10287, 60943, 49632, 83116, 25716, 23113, 22707, 77770, 31176, 6759, 46130, 4739, 55554, 3843, 31653, 70834, 72877, 41561, 36903, 23010, 6663, 2266, 16360, 70118, 91936, 17098, 77278, 4880, 23484, 94970, 41826, 46733, 93484, 68350, 38861, 18134, 32936, 241, 24803, 13876, 93278, 5039, 35873, 44418, 5305, 28510, 36115, 46717, 15238, 78607, 23464, 68635, 55712, 55007, 92411, 65739, 4858, 67537, 37041, 67453, 89801, 45963, 14800, 14225, 65655, 80463, 9716, 77255, 65136, 11230, 76323, 81433, 36445, 86523, 61058, 59560, 19380, 40791, 48073, 29626, 36661, 87907, 57369, 41623, 13705, 3880, 45088, 55444, 41003, 27754, 1450, 75312, 71801, 99600, 60719, 54182, 29245, 63315, 73758, 42973, 32702, 10855, 56363, 14638, 84424, 27178, 78195, 3133, 70865, 48019, 26117, 7151, 52107, 85562, 41347, 50486, 69457, 86961, 95482, 11857, 93587, 45680, 42145, 13029, 10043, 5142, 49213, 54525, 85761, 42707, 70754, 33768, 87671, 85038, 58900, 88438, 20004, 63390, 14815, 38875, 73417, 82875, 89481, 55517, 944, 15773, 61814, 32915, 27868, 5510, 21916, 28426, 89881, 16680, 88850, 11056, 51991, 4230, 39107, 49216, 40065, 4523, 75848, 95349, 56034, 10724, 9885, 88232, 42478, 65702, 95696, 39746, 66032, 88082, 86905, 30007, 75068, 66629, 7358, 26706, 90511, 72843, 67857, 20061, 98581, 69682, 38000, 14186, 70, 2290, 17269, 30909, 69449, 19997, 13275, 2444, 84985, 51290, 97641, 15092, 69650, 21920, 19617, 7418, 49725, 91090, 20805, 28627, 80665, 67192, 34697, 57667, 99323, 50101, 40587, 35081, 14037, 34414, 19898, 60779, 83267, 87499, 29596, 41852, 15813, 32419, 72232, 8322, 39184, 46525, 13833, 65743, 94595, 37363, 4711, 35386, 96413, 10627, 62625, 56555, 12919, 93218, 25191, 98380, 51923, 66181, 5788, 73491, 1452, 487, 12277, 45415, 11884, 61300, 94528, 9181, 26616, 11455, 31514, 63290, 45035, 42759, 33804, 85721, 80979, 46010, 50975, 72482, 31231, 3086, 58941, 46102, 25773, 89742, 29788, 96741, 88523, 14922, 88262, 76305, 57676, 93259, 2396, 69145, 26074, 30056, 3853, 75317, 56639, 66203, 38923, 48939, 22813, 91864, 10934, 6714, 84099, 25631, 73223, 95630, 97552, 45950, 22197, 42886, 33764, 1263, 41856, 82057, 62349, 94091, 78028, 62651, 18911, 5693, 92561, 97821, 41994, 92343, 76785, 22216, 4203, 5038, 86151, 23596, 24338, 77181, 51761, 97693, 10955, 98159, 37568, 58932, 72128, 27303, 99608, 31688, 57557, 91022, 43036, 93927, 32869, 53653, 55205, 33139, 47271, 31224, 51650, 36422, 86857, 73799, 22068, 43376, 84760, 44898, 65776, 42451, 71480, 38509, 41673, 44141, 75918, 95652, 68981, 83001, 48815, 98086, 67950, 27986, 33175, 43624, 55274, 71051, 61124, 51550, 64967, 31570, 15748, 19159, 38174, 51078, 79811, 39183, 57527, 96550, 85168, 28824, 47466, 56993, 13151, 96664, 29735, 70251, 1079, 4314, 77714, 11507, 1440, 48415, 31984, 99915, 20282, 26524, 18057, 4992, 40521, 98108, 84045, 91961, 79256, 72244, 25788, 5487, 23595, 73302, 14205, 8925, 27625, 64343, 28821, 37992, 67156, 83320, 31106, 10884, 30735, 15067, 51091, 15668, 48777, 50770, 19169, 76504, 41165, 29749, 92812, 8065, 66782, 26841, 1411, 95461, 61134, 18699, 52261, 60469, 81373, 44825, 11448, 73320, 30151, 56991, 31372, 6655, 36472, 86292, 30247, 30931, 21029, 53410, 9859, 37267, 47514, 3492, 49008, 94727, 25234, 40546, 53417, 36492, 25723, 76227, 58456, 15979, 34876, 9574, 34392, 3751, 36933, 83921, 65108, 63135, 67572, 40184, 21098];
/** @type {Array[]} */

var SBOX = new Array(16);
/** @type {number[]} */

var shiftTable = [16, 8, 16, 24];
/** @type {number} */

var sboxSize = 16;
/** @type {number} */

var count5 = 4;
/** @type {number} */

var randomIndex = 0; // 9591

/**
 * Generate a random digit in the range from 0 to 9, inclusive, by simply by
 * getting the next random digit from the RAND table of random digits.
 *
 * @returns {number}
 */

function getRandomDigit() {
  if (count5 < 0) {
    count5 = 4;
    randomIndex++;
  }

  return randTable[randomIndex] % Math.pow(10, count5 + 1) / Math.pow(10, count5--) | 0;
}
/**
 * Get a random integer in the range from low to high, inclusive.
 * @param {number} low
 * @param {number} high
 * @returns {number}
 */


function getRandomNumber(low, high) {
  var range = high - low + 1;
  var rand = 0;
  var max = 1;

  do {
    for (rand = 0, max = 1; max < range; max *= 10) {
      rand = rand * 10 + getRandomDigit();
    }
  } while (rand >= (max / range | 0) * range);

  return low + rand % range | 0;
}
/**
 * Generate SBOX by size
 *
 * @param {number} size
 */


function generateSbox(size) {
  for (var i = 0; i < size; i++) {
    SBOX[i] = new Array(256);
    /* Fill initial S box with a trivial permutation (0-255) */

    for (var row = 0; row < 256; row++) {
      SBOX[i][row] = row | row << 8 | row << 16 | row << 24 | 0;
    }

    for (var col = 3; col >= 0; col--) {
      for (var _row = 0; _row < 255; _row++) {
        /* Exchange random rows in the column.  This ensures that
         * column remains a permutation of (0-255). */
        var mask = 0xff << (col << 3);
        var temp = SBOX[i][_row] | 0;
        var row2 = getRandomNumber(_row, 255);
        SBOX[i][_row] = SBOX[i][_row] & ~mask | SBOX[i][row2] & mask | 0;
        SBOX[i][row2] = SBOX[i][row2] & ~mask | temp & mask | 0;
      }
    }
  }
}

generateSbox(sboxSize);
/**
 * Calculates Snefru v2.0 (2 rounds 128, 4 rounds 256), Snefru v2.5 (8 rounds) hash
 *
 * @example <caption>Calculates Snefru128/8 hash from string "message" - ES6 style</caption>
 * import Snefru from "crypto-api/src/hasher/snefru";
 * import {toHex} from "crypto-api/src/encoder/hex";
 *
 * let hasher = new Snefru();
 * hasher.update('message');
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates Snefru128/8 hash from UTF string "message" - ES6 style</caption>
 * import Snefru from "crypto-api/src/hasher/snefru";
 * import {toHex} from "crypto-api/src/encoder/hex";
 * import {fromUtf} from "crypto-api/src/encoder/utf";
 *
 * let hasher = new Snefru();
 * hasher.update(fromUtf('message'));
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates Snefru128/8 hash from string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   var hasher = CryptoApi.getHasher('snefru');
 *   hasher.update('message');
 *   console.log(CryptoApi.encoder.toHex(hasher.finalize()));
 * </script>
 *
 * @example <caption>Calculates Snefru128/8 hash from UTF string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   console.log(CryptoApi.hash('snefru', 'message'));
 * </script>
 */

var Snefru =
/*#__PURE__*/
function (_Hasher32be) {
  _inherits(Snefru, _Hasher32be);

  /**
   * @param {Object} [options]
    * | Hash type   | Length | Rounds |
   * |-------------|--------|--------|
   * | snefru128/2 | 128    | 2      |
   * | snefru256/4 | 256    | 4      |
   * | snefru128/8 | 128    | 8      |
   * | snefru256/8 | 256    | 8      |
   *
   * @param {number} [options.rounds=8] - Number of rounds (Can be from 2 to 8)
   * @param {number} [options.length=128] - Length of hash result (Can be from 32 to 480 with step 32).
   * Be careful, increasing of length will cause a reduction of the block size
   */
  function Snefru(options) {
    var _this;

    _classCallCheck(this, Snefru);

    options = options || {};
    options.length = options.length || 128;
    options.rounds = options.rounds || 8;
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Snefru).call(this, options));
    /**
     * Size of block in units
     * @ignore
     * @type {number}
     */

    _this.blockSize = 16 - _this.state.hash.length;
    /**
     * Size of block in bytes
     * @ignore
     * @type {number}
     */

    _this.blockSizeInBytes = _this.blockSize * _this.unitSize;
    /**
     * Working variable (only for speed optimization)
     * @private
     * @ignore
     * @type {number[]}
     */

    _this.W = new Array(16);
    return _this;
  }
  /**
   * Reset hasher to initial state
   */


  _createClass(Snefru, [{
    key: "reset",
    value: function reset() {
      _get(_getPrototypeOf(Snefru.prototype), "reset", this).call(this);

      this.state.hash = new Array(this.options.length / 32 | 0);

      for (var i = 0; i < this.state.hash.length; i++) {
        this.state.hash[i] = 0 | 0;
      }
    }
    /**
     * Process ready blocks
     *
     * @protected
     * @ignore
     * @param {number[]} block - Block
     */

  }, {
    key: "processBlock",
    value: function processBlock(block) {
      for (var i = 0; i < this.state.hash.length; i++) {
        this.W[i] = this.state.hash[i] | 0;
      }

      for (var _i = this.state.hash.length; _i < 16; _i++) {
        this.W[_i] = block[_i - this.state.hash.length] | 0;
      } //  Rounds


      for (var _i2 = 0; _i2 < this.options.rounds << 1; _i2 += 2) {
        for (var byteInWord = 0; byteInWord < 4; byteInWord++) {
          for (var n = 0; n < 16; n++) {
            var sbe = SBOX[_i2 + (n / 2 | 0) % 2][this.W[n] & 0xff] | 0;
            this.W[n - 1 >>> 0 & 0xf] ^= sbe;
            this.W[n + 1 & 0xf] ^= sbe;
          }

          for (var _n = 0; _n < 16; _n++) {
            this.W[_n] = Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateRight */ "b"])(this.W[_n], shiftTable[byteInWord]);
          }
        }
      }

      for (var _i3 = 0; _i3 < this.state.hash.length; _i3++) {
        this.state.hash[_i3] = this.state.hash[_i3] ^ this.W[15 - _i3] | 0;
      }
    }
    /**
     * Finalize hash and return result
     *
     * @returns {string}
     */

  }, {
    key: "finalize",
    value: function finalize() {
      if (this.state.message.length > 0) {
        this.addPaddingZero(this.blockSizeInBytes - this.state.message.length | 0);
      }

      this.addPaddingZero(this.blockSizeInBytes - 8 | 0);
      this.addLengthBits();
      this.process();
      return this.getStateHash();
    }
  }]);

  return Snefru;
}(_hasher32be__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/* harmony default export */ __webpack_exports__["a"] = (Snefru);

/***/ }),
/* 10 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _hasher32le__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _tools_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 // Transform constants

/** @type {number[]} */

var S = [[7, 12, 17, 22], [5, 9, 14, 20], [4, 11, 16, 23], [6, 10, 15, 21]];
/** @type {number[]} */

var T = new Array(64);

for (var i = 0; i < 64; i++) {
  T[i] = Math.abs(Math.sin(i + 1)) * 0x100000000 | 0;
}
/**
 * Calculates [MD5](https://tools.ietf.org/html/rfc1321) hash
 *
 * @example <caption>Calculates MD5 hash from string "message" - ES6 style</caption>
 * import Md5 from "crypto-api/src/hasher/md5";
 * import {toHex} from "crypto-api/src/encoder/hex";
 *
 * let hasher = new Md5();
 * hasher.update('message');
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates MD5 hash from UTF string "message" - ES6 style</caption>
 * import Md5 from "crypto-api/src/hasher/md5";
 * import {toHex} from "crypto-api/src/encoder/hex";
 * import {fromUtf} from "crypto-api/src/encoder/utf";
 *
 * let hasher = new Md5();
 * hasher.update(fromUtf('message'));
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates MD5 hash from string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   var hasher = CryptoApi.getHasher('md5');
 *   hasher.update('message');
 *   console.log(CryptoApi.encoder.toHex(hasher.finalize()));
 * </script>
 *
 * @example <caption>Calculates MD5 hash from UTF string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   console.log(CryptoApi.hash('md5', 'message'));
 * </script>
 */


var Md5 =
/*#__PURE__*/
function (_Hasher32le) {
  _inherits(Md5, _Hasher32le);

  function Md5() {
    _classCallCheck(this, Md5);

    return _possibleConstructorReturn(this, _getPrototypeOf(Md5).apply(this, arguments));
  }

  _createClass(Md5, [{
    key: "reset",

    /**
     * Reset hasher to initial state
     */
    value: function reset() {
      _get(_getPrototypeOf(Md5.prototype), "reset", this).call(this);

      this.state.hash = [0x67452301 | 0, 0xefcdab89 | 0, 0x98badcfe | 0, 0x10325476 | 0];
    }
    /**
     * @protected
     * @ignore
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {number}
     */

  }, {
    key: "processBlock",

    /**
     * Process ready blocks
     *
     * @protected
     * @ignore
     * @param {number[]} block - Block
     */
    value: function processBlock(block) {
      // Working variables
      var a = this.state.hash[0] | 0;
      var b = this.state.hash[1] | 0;
      var c = this.state.hash[2] | 0;
      var d = this.state.hash[3] | 0; // Round 1

      a = Md5.CC(Md5.FF, T[0], a, b, c, d, block[0], S[0][0]);
      d = Md5.CC(Md5.FF, T[1], d, a, b, c, block[1], S[0][1]);
      c = Md5.CC(Md5.FF, T[2], c, d, a, b, block[2], S[0][2]);
      b = Md5.CC(Md5.FF, T[3], b, c, d, a, block[3], S[0][3]);
      a = Md5.CC(Md5.FF, T[4], a, b, c, d, block[4], S[0][0]);
      d = Md5.CC(Md5.FF, T[5], d, a, b, c, block[5], S[0][1]);
      c = Md5.CC(Md5.FF, T[6], c, d, a, b, block[6], S[0][2]);
      b = Md5.CC(Md5.FF, T[7], b, c, d, a, block[7], S[0][3]);
      a = Md5.CC(Md5.FF, T[8], a, b, c, d, block[8], S[0][0]);
      d = Md5.CC(Md5.FF, T[9], d, a, b, c, block[9], S[0][1]);
      c = Md5.CC(Md5.FF, T[10], c, d, a, b, block[10], S[0][2]);
      b = Md5.CC(Md5.FF, T[11], b, c, d, a, block[11], S[0][3]);
      a = Md5.CC(Md5.FF, T[12], a, b, c, d, block[12], S[0][0]);
      d = Md5.CC(Md5.FF, T[13], d, a, b, c, block[13], S[0][1]);
      c = Md5.CC(Md5.FF, T[14], c, d, a, b, block[14], S[0][2]);
      b = Md5.CC(Md5.FF, T[15], b, c, d, a, block[15], S[0][3]); // Round 2

      a = Md5.CC(Md5.GG, T[16], a, b, c, d, block[1], S[1][0]);
      d = Md5.CC(Md5.GG, T[17], d, a, b, c, block[6], S[1][1]);
      c = Md5.CC(Md5.GG, T[18], c, d, a, b, block[11], S[1][2]);
      b = Md5.CC(Md5.GG, T[19], b, c, d, a, block[0], S[1][3]);
      a = Md5.CC(Md5.GG, T[20], a, b, c, d, block[5], S[1][0]);
      d = Md5.CC(Md5.GG, T[21], d, a, b, c, block[10], S[1][1]);
      c = Md5.CC(Md5.GG, T[22], c, d, a, b, block[15], S[1][2]);
      b = Md5.CC(Md5.GG, T[23], b, c, d, a, block[4], S[1][3]);
      a = Md5.CC(Md5.GG, T[24], a, b, c, d, block[9], S[1][0]);
      d = Md5.CC(Md5.GG, T[25], d, a, b, c, block[14], S[1][1]);
      c = Md5.CC(Md5.GG, T[26], c, d, a, b, block[3], S[1][2]);
      b = Md5.CC(Md5.GG, T[27], b, c, d, a, block[8], S[1][3]);
      a = Md5.CC(Md5.GG, T[28], a, b, c, d, block[13], S[1][0]);
      d = Md5.CC(Md5.GG, T[29], d, a, b, c, block[2], S[1][1]);
      c = Md5.CC(Md5.GG, T[30], c, d, a, b, block[7], S[1][2]);
      b = Md5.CC(Md5.GG, T[31], b, c, d, a, block[12], S[1][3]); // Round 3

      a = Md5.CC(Md5.HH, T[32], a, b, c, d, block[5], S[2][0]);
      d = Md5.CC(Md5.HH, T[33], d, a, b, c, block[8], S[2][1]);
      c = Md5.CC(Md5.HH, T[34], c, d, a, b, block[11], S[2][2]);
      b = Md5.CC(Md5.HH, T[35], b, c, d, a, block[14], S[2][3]);
      a = Md5.CC(Md5.HH, T[36], a, b, c, d, block[1], S[2][0]);
      d = Md5.CC(Md5.HH, T[37], d, a, b, c, block[4], S[2][1]);
      c = Md5.CC(Md5.HH, T[38], c, d, a, b, block[7], S[2][2]);
      b = Md5.CC(Md5.HH, T[39], b, c, d, a, block[10], S[2][3]);
      a = Md5.CC(Md5.HH, T[40], a, b, c, d, block[13], S[2][0]);
      d = Md5.CC(Md5.HH, T[41], d, a, b, c, block[0], S[2][1]);
      c = Md5.CC(Md5.HH, T[42], c, d, a, b, block[3], S[2][2]);
      b = Md5.CC(Md5.HH, T[43], b, c, d, a, block[6], S[2][3]);
      a = Md5.CC(Md5.HH, T[44], a, b, c, d, block[9], S[2][0]);
      d = Md5.CC(Md5.HH, T[45], d, a, b, c, block[12], S[2][1]);
      c = Md5.CC(Md5.HH, T[46], c, d, a, b, block[15], S[2][2]);
      b = Md5.CC(Md5.HH, T[47], b, c, d, a, block[2], S[2][3]); // Round 4

      a = Md5.CC(Md5.II, T[48], a, b, c, d, block[0], S[3][0]);
      d = Md5.CC(Md5.II, T[49], d, a, b, c, block[7], S[3][1]);
      c = Md5.CC(Md5.II, T[50], c, d, a, b, block[14], S[3][2]);
      b = Md5.CC(Md5.II, T[51], b, c, d, a, block[5], S[3][3]);
      a = Md5.CC(Md5.II, T[52], a, b, c, d, block[12], S[3][0]);
      d = Md5.CC(Md5.II, T[53], d, a, b, c, block[3], S[3][1]);
      c = Md5.CC(Md5.II, T[54], c, d, a, b, block[10], S[3][2]);
      b = Md5.CC(Md5.II, T[55], b, c, d, a, block[1], S[3][3]);
      a = Md5.CC(Md5.II, T[56], a, b, c, d, block[8], S[3][0]);
      d = Md5.CC(Md5.II, T[57], d, a, b, c, block[15], S[3][1]);
      c = Md5.CC(Md5.II, T[58], c, d, a, b, block[6], S[3][2]);
      b = Md5.CC(Md5.II, T[59], b, c, d, a, block[13], S[3][3]);
      a = Md5.CC(Md5.II, T[60], a, b, c, d, block[4], S[3][0]);
      d = Md5.CC(Md5.II, T[61], d, a, b, c, block[11], S[3][1]);
      c = Md5.CC(Md5.II, T[62], c, d, a, b, block[2], S[3][2]);
      b = Md5.CC(Md5.II, T[63], b, c, d, a, block[9], S[3][3]);
      this.state.hash[0] = this.state.hash[0] + a | 0;
      this.state.hash[1] = this.state.hash[1] + b | 0;
      this.state.hash[2] = this.state.hash[2] + c | 0;
      this.state.hash[3] = this.state.hash[3] + d | 0;
    }
    /**
     * Finalize hash and return result
     *
     * @returns {string}
     */

  }, {
    key: "finalize",
    value: function finalize() {
      this.addPaddingISO7816(this.state.message.length < 56 ? 56 - this.state.message.length | 0 : 120 - this.state.message.length | 0);
      this.addLengthBits();
      this.process();
      return this.getStateHash();
    }
  }], [{
    key: "FF",
    value: function FF(x, y, z) {
      return x & y | ~x & z;
    }
    /**
     * @protected
     * @ignore
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {number}
     */

  }, {
    key: "GG",
    value: function GG(x, y, z) {
      return x & z | y & ~z;
    }
    /**
     * @protected
     * @ignore
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {number}
     */

  }, {
    key: "HH",
    value: function HH(x, y, z) {
      return x ^ y ^ z;
    }
    /**
     * @protected
     * @ignore
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {number}
     */

  }, {
    key: "II",
    value: function II(x, y, z) {
      return y ^ (x | ~z);
    }
    /**
     * @protected
     * @ignore
     * @param {function} f
     * @param {number} k
     * @param {number} a
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {number} m
     * @param {number} s
     * @returns {number}
     */

  }, {
    key: "CC",
    value: function CC(f, k, a, x, y, z, m, s) {
      return Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateLeft */ "a"])(a + f(x, y, z) + m + k, s) + x | 0;
    }
  }]);

  return Md5;
}(_hasher32le__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/* harmony default export */ __webpack_exports__["a"] = (Md5);

/***/ }),
/* 11 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _hasher32be__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _tools_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 // Transform constants

/** @type {number[]} */

var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
/**
 * Calculates [SHA1](https://tools.ietf.org/html/rfc3174) hash
 *
 * @example <caption>Calculates SHA1 hash from string "message" - ES6 style</caption>
 * import Sha1 from "crypto-api/src/hasher/sha1";
 * import {toHex} from "crypto-api/src/encoder/hex";
 *
 * let hasher = new Sha1();
 * hasher.update('message');
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates SHA1 hash from UTF string "message" - ES6 style</caption>
 * import Sha1 from "crypto-api/src/hasher/sha1";
 * import {toHex} from "crypto-api/src/encoder/hex";
 * import {fromUtf} from "crypto-api/src/encoder/utf";
 *
 * let hasher = new Sha1();
 * hasher.update(fromUtf('message'));
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates SHA1 hash from string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   var hasher = CryptoApi.getHasher('sha1');
 *   hasher.update('message');
 *   console.log(CryptoApi.encoder.toHex(hasher.finalize()));
 * </script>
 *
 * @example <caption>Calculates SHA1 hash from UTF string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   console.log(CryptoApi.hash('sha1', 'message'));
 * </script>
 */

var Sha1 =
/*#__PURE__*/
function (_Hasher32be) {
  _inherits(Sha1, _Hasher32be);

  /**
   * @param {Object} [options]
   * @param {number} [options.rounds=80] - Number of rounds (Must be greater than 16)
   */
  function Sha1(options) {
    var _this;

    _classCallCheck(this, Sha1);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Sha1).call(this, options));
    _this.options.rounds = _this.options.rounds || 80;
    /**
     * Working variable (only for speed optimization)
     * @private
     * @ignore
     * @type {number[]}
     */

    _this.W = new Array(80);
    return _this;
  }
  /**
   * Reset hasher to initial state
   */


  _createClass(Sha1, [{
    key: "reset",
    value: function reset() {
      _get(_getPrototypeOf(Sha1.prototype), "reset", this).call(this);

      this.state.hash = [0x67452301 | 0, 0xefcdab89 | 0, 0x98badcfe | 0, 0x10325476 | 0, 0xc3d2e1f0 | 0];
    }
    /**
     * Process ready blocks
     *
     * @protected
     * @ignore
     * @param {number[]} block - Block
     */

  }, {
    key: "processBlock",
    value: function processBlock(block) {
      // Working variables
      var a = this.state.hash[0] | 0;
      var b = this.state.hash[1] | 0;
      var c = this.state.hash[2] | 0;
      var d = this.state.hash[3] | 0;
      var e = this.state.hash[4] | 0; // Calculate hash

      for (var i = 0; i < this.options.rounds; i++) {
        if (i < 16) {
          this.W[i] = block[i] | 0;
        } else {
          this.W[i] = Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateLeft */ "a"])(this.W[i - 3] ^ this.W[i - 8] ^ this.W[i - 14] ^ this.W[i - 16], 1) | 0;
        }

        var t = Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateLeft */ "a"])(a, 5) + e + this.W[i] + K[i / 20 >> 0] | 0;

        if (i < 20) {
          t = t + (b & c | ~b & d) | 0;
        } else if (i < 40) {
          t = t + (b ^ c ^ d) | 0;
        } else if (i < 60) {
          t = t + (b & c | b & d | c & d) | 0;
        } else {
          t = t + (b ^ c ^ d) | 0;
        }

        e = d;
        d = c;
        c = Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateLeft */ "a"])(b, 30) | 0;
        b = a;
        a = t;
      }

      this.state.hash[0] = this.state.hash[0] + a | 0;
      this.state.hash[1] = this.state.hash[1] + b | 0;
      this.state.hash[2] = this.state.hash[2] + c | 0;
      this.state.hash[3] = this.state.hash[3] + d | 0;
      this.state.hash[4] = this.state.hash[4] + e | 0;
    }
    /**
     * Finalize hash and return result
     *
     * @returns {string}
     */

  }, {
    key: "finalize",
    value: function finalize() {
      this.addPaddingISO7816(this.state.message.length < 56 ? 56 - this.state.message.length | 0 : 120 - this.state.message.length | 0);
      this.addLengthBits();
      this.process();
      return this.getStateHash();
    }
  }]);

  return Sha1;
}(_hasher32be__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/* harmony default export */ __webpack_exports__["a"] = (Sha1);

/***/ }),
/* 12 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _tools_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _hasher32be__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



/** @type {number[]} */

var SBOX = new Array(256);
/** @type {number[]} */

var SBOX0 = [0x68, 0xd0, 0xeb, 0x2b, 0x48, 0x9d, 0x6a, 0xe4, 0xe3, 0xa3, 0x56, 0x81, 0x7d, 0xf1, 0x85, 0x9e, 0x2c, 0x8e, 0x78, 0xca, 0x17, 0xa9, 0x61, 0xd5, 0x5d, 0x0b, 0x8c, 0x3c, 0x77, 0x51, 0x22, 0x42, 0x3f, 0x54, 0x41, 0x80, 0xcc, 0x86, 0xb3, 0x18, 0x2e, 0x57, 0x06, 0x62, 0xf4, 0x36, 0xd1, 0x6b, 0x1b, 0x65, 0x75, 0x10, 0xda, 0x49, 0x26, 0xf9, 0xcb, 0x66, 0xe7, 0xba, 0xae, 0x50, 0x52, 0xab, 0x05, 0xf0, 0x0d, 0x73, 0x3b, 0x04, 0x20, 0xfe, 0xdd, 0xf5, 0xb4, 0x5f, 0x0a, 0xb5, 0xc0, 0xa0, 0x71, 0xa5, 0x2d, 0x60, 0x72, 0x93, 0x39, 0x08, 0x83, 0x21, 0x5c, 0x87, 0xb1, 0xe0, 0x00, 0xc3, 0x12, 0x91, 0x8a, 0x02, 0x1c, 0xe6, 0x45, 0xc2, 0xc4, 0xfd, 0xbf, 0x44, 0xa1, 0x4c, 0x33, 0xc5, 0x84, 0x23, 0x7c, 0xb0, 0x25, 0x15, 0x35, 0x69, 0xff, 0x94, 0x4d, 0x70, 0xa2, 0xaf, 0xcd, 0xd6, 0x6c, 0xb7, 0xf8, 0x09, 0xf3, 0x67, 0xa4, 0xea, 0xec, 0xb6, 0xd4, 0xd2, 0x14, 0x1e, 0xe1, 0x24, 0x38, 0xc6, 0xdb, 0x4b, 0x7a, 0x3a, 0xde, 0x5e, 0xdf, 0x95, 0xfc, 0xaa, 0xd7, 0xce, 0x07, 0x0f, 0x3d, 0x58, 0x9a, 0x98, 0x9c, 0xf2, 0xa7, 0x11, 0x7e, 0x8b, 0x43, 0x03, 0xe2, 0xdc, 0xe5, 0xb2, 0x4e, 0xc7, 0x6d, 0xe9, 0x27, 0x40, 0xd8, 0x37, 0x92, 0x8f, 0x01, 0x1d, 0x53, 0x3e, 0x59, 0xc1, 0x4f, 0x32, 0x16, 0xfa, 0x74, 0xfb, 0x63, 0x9f, 0x34, 0x1a, 0x2a, 0x5a, 0x8d, 0xc9, 0xcf, 0xf6, 0x90, 0x28, 0x88, 0x9b, 0x31, 0x0e, 0xbd, 0x4a, 0xe8, 0x96, 0xa6, 0x0c, 0xc8, 0x79, 0xbc, 0xbe, 0xef, 0x6e, 0x46, 0x97, 0x5b, 0xed, 0x19, 0xd9, 0xac, 0x99, 0xa8, 0x29, 0x64, 0x1f, 0xad, 0x55, 0x13, 0xbb, 0xf7, 0x6f, 0xb9, 0x47, 0x2f, 0xee, 0xb8, 0x7b, 0x89, 0x30, 0xd3, 0x7f, 0x76, 0x82];
/** @type {number[]} */

var eBOX = [0x1, 0xb, 0x9, 0xc, 0xd, 0x6, 0xf, 0x3, 0xe, 0x8, 0x7, 0x4, 0xa, 0x2, 0x5, 0x0];
/** @type {number[]} */

var rBOX = [0x7, 0xc, 0xb, 0xd, 0xe, 0x4, 0x9, 0xf, 0x6, 0x3, 0x8, 0xa, 0x2, 0x5, 0x1, 0x0];
/** @type {number[]} */

var iBOX = new Array(16);
/** @type {number[]} */

var theta = [1, 1, 4, 1, 8, 5, 2, 9];
/** @type {number[]} */

var theta0 = [1, 1, 3, 1, 5, 8, 9, 5];
/** @type {Array[]} */

var C = new Array(512);
/** @type {number[]} */

var RC = new Array(22);
/** @type {Array[]} */

var C0 = new Array(512);
/** @type {number[]} */

var RC0 = new Array(22);
/** @type {Array[]} */

var CT = new Array(512);
/** @type {number[]} */

var RCT = new Array(22);
/**
 * Calculates SBOX from eBOX & rBOX
 *
 * @private
 * @returns {void}
 */

function calculateSBOX() {
  for (var i = 0; i < 16; i++) {
    iBOX[eBOX[i]] = i | 0;
  }

  for (var _i = 0; _i < 256; _i++) {
    var left = eBOX[_i >> 4];
    var right = iBOX[_i & 0xf];
    var temp = rBOX[left ^ right];
    SBOX[_i] = eBOX[left ^ temp] << 4 | iBOX[right ^ temp];
  }
}
/**
 * Calculates C* & RC* transform tables
 *
 * @private
 * @param {number[]} SBOX
 * @param {number[]} theta
 * @returns {[Array[], number[]]}
 */


function calculateRC(SBOX, theta) {
  /** @type {Array[]} */
  var C = new Array(512);
  /** @type {number[]} */

  var RC = new Array(22);

  for (var t = 0; t < 8; t++) {
    C[t] = [];
  }

  for (var i = 0; i < 256; i++) {
    var V = new Array(10);
    V[1] = SBOX[i];
    V[2] = V[1] << 1;

    if (V[2] >= 0x100) {
      V[2] ^= 0x11d;
    }

    V[3] = V[2] ^ V[1];
    V[4] = V[2] << 1;

    if (V[4] >= 0x100) {
      V[4] ^= 0x11d;
    }

    V[5] = V[4] ^ V[1];
    V[8] = V[4] << 1;

    if (V[8] >= 0x100) {
      V[8] ^= 0x11d;
    }

    V[9] = V[8] ^ V[1]; // build the circulant table C[0][x] = S[x].[1, 1, 4, 1, 8, 5, 2, 9] | S[x].[1, 1, 3, 1, 5, 8, 9, 5]

    C[0][i * 2] = V[theta[0]] << 24 | V[theta[1]] << 16 | V[theta[2]] << 8 | V[theta[3]];
    C[0][i * 2 + 1] = V[theta[4]] << 24 | V[theta[5]] << 16 | V[theta[6]] << 8 | V[theta[7]]; // build the remaining circulant tables C[t][x] = C[0][x] rotr t

    for (var _t = 1; _t < 8; _t++) {
      C[_t][i * 2] = Object(_tools_tools__WEBPACK_IMPORTED_MODULE_0__[/* rotateRight64lo */ "d"])(C[0][i * 2 + 1], C[0][i * 2], _t << 3);
      C[_t][i * 2 + 1] = Object(_tools_tools__WEBPACK_IMPORTED_MODULE_0__[/* rotateRight64hi */ "c"])(C[0][i * 2 + 1], C[0][i * 2], _t << 3);
    }
  } // build the round constants


  RC[0] = 0;
  RC[1] = 0;

  for (var _i2 = 1; _i2 <= 10; _i2++) {
    RC[_i2 * 2] = C[0][16 * _i2 - 16] & 0xff000000 ^ C[1][16 * _i2 - 14] & 0x00ff0000 ^ C[2][16 * _i2 - 12] & 0x0000ff00 ^ C[3][16 * _i2 - 10] & 0x000000ff;
    RC[_i2 * 2 + 1] = C[4][16 * _i2 - 7] & 0xff000000 ^ C[5][16 * _i2 - 5] & 0x00ff0000 ^ C[6][16 * _i2 - 3] & 0x0000ff00 ^ C[7][16 * _i2 - 1] & 0x000000ff;
  }

  return [C, RC];
} // Build transform tables


(function () {
  calculateSBOX(); // whirlpool-0

  var x = calculateRC(SBOX0, theta0);
  C0 = x[0];
  RC0 = x[1]; // whirlpool-t

  x = calculateRC(SBOX, theta0);
  CT = x[0];
  RCT = x[1]; // whirlpool

  x = calculateRC(SBOX, theta);
  C = x[0];
  RC = x[1];
})();
/**
 * Calculates [WHIRLPOOL (WHIRLPOOL-0, WHIRLPOOL-T)](http://www.larc.usp.br/~pbarreto/WhirlpoolPage.html) hash
 *
 * @example <caption>Calculates WHIRLPOOL hash from string "message" - ES6 style</caption>
 * import Whirlpool from "crypto-api/src/hasher/whirlpool";
 * import {toHex} from "crypto-api/src/encoder/hex";
 *
 * let hasher = new Whirlpool();
 * hasher.update('message');
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates WHIRLPOOL hash from UTF string "message" - ES6 style</caption>
 * import Whirlpool from "crypto-api/src/hasher/whirlpool";
 * import {toHex} from "crypto-api/src/encoder/hex";
 * import {fromUtf} from "crypto-api/src/encoder/utf";
 *
 * let hasher = new Whirlpool();
 * hasher.update(fromUtf('message'));
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates WHIRLPOOL hash from string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   var hasher = CryptoApi.getHasher('whirlpool');
 *   hasher.update('message');
 *   console.log(CryptoApi.encoder.toHex(hasher.finalize()));
 * </script>
 *
 * @example <caption>Calculates WHIRLPOOL hash from UTF string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   console.log(CryptoApi.hash('whirlpool', 'message'));
 * </script>
 */


var Whirlpool =
/*#__PURE__*/
function (_Hasher32be) {
  _inherits(Whirlpool, _Hasher32be);

  /**
   * @param {Object} [options]
   * @param {number} [options.rounds=10] - Number of rounds (Can be from 1 to 10)
   * @param {string} [options.type] - Algorithm type
   *
   * | Hash type   | Type      |
   * |-------------|-----------|
   * | whirlpool-0 | '0'       |
   * | whirlpool-t | 't'       |
   * | whirlpool   | undefined |
   */
  function Whirlpool(options) {
    var _this;

    _classCallCheck(this, Whirlpool);

    options = options || {};
    options.type = options.type || '';
    options.rounds = options.rounds || 10;
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Whirlpool).call(this, options));

    switch (_this.options.type) {
      case '0':
      case 0:
        /**
         *  @type {{number[]}[]}
         *  @ignore
         *  */
        _this.C = C0;
        /**
         *  @type {number[]}
         *  @ignore
         *  */

        _this.RC = RC0;
        break;

      case 't':
        _this.C = CT;
        _this.RC = RCT;
        break;

      default:
        _this.C = C;
        _this.RC = RC;
    }

    return _this;
  }
  /**
   * Reset hasher to initial state
   */


  _createClass(Whirlpool, [{
    key: "reset",
    value: function reset() {
      _get(_getPrototypeOf(Whirlpool.prototype), "reset", this).call(this);

      this.state.hash = new Array(16);

      for (var i = 0; i < 16; i++) {
        this.state.hash[i] = 0 | 0;
      }
    }
    /**
     * Process ready blocks
     *
     * @protected
     * @ignore
     * @param {number[]} block - Block
     */

  }, {
    key: "processBlock",
    value: function processBlock(block) {
      // compute and apply K^0 to the cipher state
      var K = new Array(16);
      var state = [];

      for (var i = 0; i < 16; i++) {
        state[i] = block[i] ^ (K[i] = this.state.hash[i]) | 0;
      } // iterate over all rounds


      var L = [];

      for (var r = 1; r <= this.options.rounds; r++) {
        // compute K^r from K^{r-1}
        for (var _i3 = 0; _i3 < 8; _i3++) {
          L[_i3 * 2] = 0;
          L[_i3 * 2 + 1] = 0;

          for (var t = 0, s = 56, j = 0; t < 8; t++, s -= 8, j = s < 32 ? 1 : 0) {
            L[_i3 * 2] ^= this.C[t][(K[(_i3 - t & 7) * 2 + j] >>> s % 32 & 0xff) * 2];
            L[_i3 * 2 + 1] ^= this.C[t][(K[(_i3 - t & 7) * 2 + j] >>> s % 32 & 0xff) * 2 + 1];
          }
        }

        for (var _i4 = 0; _i4 < 16; _i4++) {
          K[_i4] = L[_i4];
        }

        K[0] ^= this.RC[r * 2];
        K[1] ^= this.RC[r * 2 + 1]; // apply the r-th round transformation

        for (var _i5 = 0; _i5 < 8; _i5++) {
          L[_i5 * 2] = K[_i5 * 2];
          L[_i5 * 2 + 1] = K[_i5 * 2 + 1];

          for (var _t2 = 0, _s = 56, _j = 0; _t2 < 8; _t2++, _s -= 8, _j = _s < 32 ? 1 : 0) {
            L[_i5 * 2] ^= this.C[_t2][(state[(_i5 - _t2 & 7) * 2 + _j] >>> _s % 32 & 0xff) * 2];
            L[_i5 * 2 + 1] ^= this.C[_t2][(state[(_i5 - _t2 & 7) * 2 + _j] >>> _s % 32 & 0xff) * 2 + 1];
          }
        }

        for (var _i6 = 0; _i6 < 16; _i6++) {
          state[_i6] = L[_i6];
        }
      } // apply the Miyaguchi-Preneel compression function


      for (var _i7 = 0; _i7 < 16; _i7++) {
        this.state.hash[_i7] ^= state[_i7] ^ block[_i7];
      }
    }
    /**
     * Finalize hash and return result
     *
     * @returns {string}
     */

  }, {
    key: "finalize",
    value: function finalize() {
      this.addPaddingISO7816(this.state.message.length < 32 ? 56 - this.state.message.length | 0 : 120 - this.state.message.length | 0);
      this.addLengthBits();
      this.process();
      return this.getStateHash();
    }
  }]);

  return Whirlpool;
}(_hasher32be__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]);

/* harmony default export */ __webpack_exports__["a"] = (Whirlpool);

/***/ }),
/* 13 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./src/hasher/hasher.mjs
var hasher = __webpack_require__(4);

// CONCATENATED MODULE: ./src/hasher/hasher8.mjs


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


/**
 * Hasher for 8 bit blocks
 * @interface
 */

var Hasher8 =
/*#__PURE__*/
function (_Hasher) {
  _inherits(Hasher8, _Hasher);

  /**
   * @param {Object} [options]
   */
  function Hasher8(options) {
    var _this;

    _classCallCheck(this, Hasher8);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Hasher8).call(this, options));
    /**
     * Size of unit = 1 byte
     * @type {number} unitSize
     */

    _this.unitSize = 1;
    /**
     * Size of block in bytes
     * @type {number}
     */

    _this.blockSizeInBytes = _this.blockSize * _this.unitSize;
    /**
     * Current block (only for speed optimization)
     * @private
     * @type {number[]}
     */

    _this.blockUnits = [];
    return _this;
  }
  /**
   * Process ready blocks
   */


  _createClass(Hasher8, [{
    key: "process",
    value: function process() {
      while (this.state.message.length >= this.blockSizeInBytes) {
        this.blockUnits = new Array(this.blockSizeInBytes);

        for (var i = 0; i < this.blockSizeInBytes; i++) {
          this.blockUnits[i] = this.state.message.charCodeAt(i) | 0;
        }

        this.state.message = this.state.message.substr(this.blockSizeInBytes);
        this.processBlock(this.blockUnits);
      }
    }
    /**
     * Process ready blocks
     *
     * @protected
     * @param {number[]} M
     */

  }, {
    key: "processBlock",
    value: function processBlock(M) {}
    /**
     * Get hash from state
     *
     * @protected
     * @param {number} [size=this.state.hash.length] - Limit hash size (in chunks)
     * @returns {string}
     */

  }, {
    key: "getStateHash",
    value: function getStateHash(size) {
      size = size || this.state.hash.length;
      var hash = '';

      for (var i = 0; i < size; i++) {
        hash += String.fromCharCode(this.state.hash[i] & 0xff);
      }

      return hash;
    }
  }]);

  return Hasher8;
}(hasher["a" /* default */]);

/* harmony default export */ var hasher8 = (Hasher8);
// CONCATENATED MODULE: ./src/hasher/md2.mjs


function md2_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { md2_typeof = function _typeof(obj) { return typeof obj; }; } else { md2_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return md2_typeof(obj); }

function md2_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function md2_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function md2_createClass(Constructor, protoProps, staticProps) { if (protoProps) md2_defineProperties(Constructor.prototype, protoProps); if (staticProps) md2_defineProperties(Constructor, staticProps); return Constructor; }

function md2_possibleConstructorReturn(self, call) { if (call && (md2_typeof(call) === "object" || typeof call === "function")) { return call; } return md2_assertThisInitialized(self); }

function md2_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = md2_getPrototypeOf(object); if (object === null) break; } return object; }

function md2_getPrototypeOf(o) { md2_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return md2_getPrototypeOf(o); }

function md2_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) md2_setPrototypeOf(subClass, superClass); }

function md2_setPrototypeOf(o, p) { md2_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return md2_setPrototypeOf(o, p); }


/**
 * Constants from Pi
 * @link https://github.com/e-sushi/MD2-S-box-creator
 * @type {number[]}
 */

var SBOX = [0x29, 0x2e, 0x43, 0xc9, 0xa2, 0xd8, 0x7c, 0x01, 0x3d, 0x36, 0x54, 0xa1, 0xec, 0xf0, 0x06, 0x13, 0x62, 0xa7, 0x05, 0xf3, 0xc0, 0xc7, 0x73, 0x8c, 0x98, 0x93, 0x2b, 0xd9, 0xbc, 0x4c, 0x82, 0xca, 0x1e, 0x9b, 0x57, 0x3c, 0xfd, 0xd4, 0xe0, 0x16, 0x67, 0x42, 0x6f, 0x18, 0x8a, 0x17, 0xe5, 0x12, 0xbe, 0x4e, 0xc4, 0xd6, 0xda, 0x9e, 0xde, 0x49, 0xa0, 0xfb, 0xf5, 0x8e, 0xbb, 0x2f, 0xee, 0x7a, 0xa9, 0x68, 0x79, 0x91, 0x15, 0xb2, 0x07, 0x3f, 0x94, 0xc2, 0x10, 0x89, 0x0b, 0x22, 0x5f, 0x21, 0x80, 0x7f, 0x5d, 0x9a, 0x5a, 0x90, 0x32, 0x27, 0x35, 0x3e, 0xcc, 0xe7, 0xbf, 0xf7, 0x97, 0x03, 0xff, 0x19, 0x30, 0xb3, 0x48, 0xa5, 0xb5, 0xd1, 0xd7, 0x5e, 0x92, 0x2a, 0xac, 0x56, 0xaa, 0xc6, 0x4f, 0xb8, 0x38, 0xd2, 0x96, 0xa4, 0x7d, 0xb6, 0x76, 0xfc, 0x6b, 0xe2, 0x9c, 0x74, 0x04, 0xf1, 0x45, 0x9d, 0x70, 0x59, 0x64, 0x71, 0x87, 0x20, 0x86, 0x5b, 0xcf, 0x65, 0xe6, 0x2d, 0xa8, 0x02, 0x1b, 0x60, 0x25, 0xad, 0xae, 0xb0, 0xb9, 0xf6, 0x1c, 0x46, 0x61, 0x69, 0x34, 0x40, 0x7e, 0x0f, 0x55, 0x47, 0xa3, 0x23, 0xdd, 0x51, 0xaf, 0x3a, 0xc3, 0x5c, 0xf9, 0xce, 0xba, 0xc5, 0xea, 0x26, 0x2c, 0x53, 0x0d, 0x6e, 0x85, 0x28, 0x84, 0x09, 0xd3, 0xdf, 0xcd, 0xf4, 0x41, 0x81, 0x4d, 0x52, 0x6a, 0xdc, 0x37, 0xc8, 0x6c, 0xc1, 0xab, 0xfa, 0x24, 0xe1, 0x7b, 0x08, 0x0c, 0xbd, 0xb1, 0x4a, 0x78, 0x88, 0x95, 0x8b, 0xe3, 0x63, 0xe8, 0x6d, 0xe9, 0xcb, 0xd5, 0xfe, 0x3b, 0x00, 0x1d, 0x39, 0xf2, 0xef, 0xb7, 0x0e, 0x66, 0x58, 0xd0, 0xe4, 0xa6, 0x77, 0x72, 0xf8, 0xeb, 0x75, 0x4b, 0x0a, 0x31, 0x44, 0x50, 0xb4, 0x8f, 0xed, 0x1f, 0x1a, 0xdb, 0x99, 0x8d, 0x33, 0x9f, 0x11, 0x83, 0x14];
/**
 * Calculates [MD2](https://tools.ietf.org/html/rfc1319) hash
 *
 * @example <caption>Calculates MD2 hash from string "message" - ES6 style</caption>
 * import Md2 from "crypto-api/src/hasher/md2";
 * import {toHex} from "crypto-api/src/encoder/hex";
 *
 * let hasher = new Md2();
 * hasher.update('message');
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates MD2 hash from UTF string "message" - ES6 style</caption>
 * import Md2 from "crypto-api/src/hasher/md2";
 * import {toHex} from "crypto-api/src/encoder/hex";
 * import {fromUtf} from "crypto-api/src/encoder/utf";
 *
 * let hasher = new Md2();
 * hasher.update(fromUtf('message'));
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates MD2 hash from string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   var hasher = CryptoApi.getHasher('md2');
 *   hasher.update('message');
 *   console.log(CryptoApi.encoder.toHex(hasher.finalize()));
 * </script>
 *
 * @example <caption>Calculates MD2 hash from UTF string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   console.log(CryptoApi.hash('md2', 'message'));
 * </script>
 */

var Md2 =
/*#__PURE__*/
function (_Hasher) {
  md2_inherits(Md2, _Hasher);

  /**
   * @param {Object} [options]
   * @param {number} [options.rounds=18] - Number of rounds (Must be greater than 0)
   */
  function Md2(options) {
    var _this;

    md2_classCallCheck(this, Md2);

    _this = md2_possibleConstructorReturn(this, md2_getPrototypeOf(Md2).call(this, options));
    _this.options.rounds = _this.options.rounds || 18;
    return _this;
  }
  /**
   * Reset hasher to initial state
   */


  md2_createClass(Md2, [{
    key: "reset",
    value: function reset() {
      _get(md2_getPrototypeOf(Md2.prototype), "reset", this).call(this);

      this.state.hash = new Array(48);
      this.state.checksum = new Array(16);
    }
    /**
     * Process ready blocks
     *
     * @protected
     * @ignore
     * @param {number[]} block - Block
     */

  }, {
    key: "processBlock",
    value: function processBlock(block) {
      // Append hash
      for (var i = 0; i < 16; i++) {
        this.state.hash[16 + i] = block[i] | 0;
        this.state.hash[32 + i] = block[i] ^ this.state.hash[i];
      } // Rounds


      var t = 0;

      for (var _i = 0; _i < this.options.rounds; _i++) {
        for (var j = 0; j < 48; j++) {
          t = this.state.hash[j] ^= SBOX[t];
        }

        t = t + _i & 0xff;
      } // Append checksum


      t = this.state.checksum[15] & 0xff;

      for (var _i2 = 0; _i2 < 16; _i2++) {
        t = this.state.checksum[_i2] ^= SBOX[block[_i2] ^ t];
      }
    }
    /**
     * Finalize hash and return result
     *
     * @returns {string}
     */

  }, {
    key: "finalize",
    value: function finalize() {
      this.addPaddingPKCS7(16 - (this.state.message.length & 0xf) | 0);
      this.process(); // Process checksum

      for (var i = 0; i < 16; i++) {
        this.state.message += String.fromCharCode(this.state.checksum[i]);
      }

      this.process(); // Return hash

      return this.getStateHash(16);
    }
  }]);

  return Md2;
}(hasher8);

/* harmony default export */ var md2 = __webpack_exports__["a"] = (Md2);

/***/ }),
/* 14 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _hasher32le__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _tools_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 // Transform constants

/** @type {number[]} */

var K = [0x00000000, 0x5a827999, 0x6ed9eba1, 0x8f1bbcdc];
/** @type {number[]} */

var ROT = [5, 11, 7, 15, 6, 13, 8, 14, 7, 12, 9, 11, 8, 15, 6, 12, 9, 14, 5, 13];
/** @type {number[]} */

var ROT2 = [10, 17, 25, 30];
/** @type {number[]} */

var IND = [18, 0, 1, 2, 3, 19, 4, 5, 6, 7, 16, 8, 9, 10, 11, 17, 12, 13, 14, 15, 22, 3, 6, 9, 12, 23, 15, 2, 5, 8, 20, 11, 14, 1, 4, 21, 7, 10, 13, 0, 26, 12, 5, 14, 7, 27, 0, 9, 2, 11, 24, 4, 13, 6, 15, 25, 8, 1, 10, 3, 30, 7, 2, 13, 8, 31, 3, 14, 9, 4, 28, 15, 10, 5, 0, 29, 11, 6, 1, 12];
/**
 * Calculates [HAS-160](https://www.randombit.net/has160.html) hash
 *
 * @example <caption>Calculates HAS-160 hash from string "message" - ES6 style</caption>
 * import Has160 from "crypto-api/src/hasher/has160";
 * import {toHex} from "crypto-api/src/encoder/hex";
 *
 * let hasher = new Has160();
 * hasher.update('message');
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates HAS-160 hash from UTF string "message" - ES6 style</caption>
 * import Has160 from "crypto-api/src/hasher/has160";
 * import {toHex} from "crypto-api/src/encoder/hex";
 * import {fromUtf} from "crypto-api/src/encoder/utf";
 *
 * let hasher = new Has160();
 * hasher.update(fromUtf('message'));
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates HAS-160 hash from string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   var hasher = CryptoApi.getHasher('has160');
 *   hasher.update('message');
 *   console.log(CryptoApi.encoder.toHex(hasher.finalize()));
 * </script>
 *
 * @example <caption>Calculates HAS-160 hash from UTF string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   console.log(CryptoApi.hash('has160', 'message'));
 * </script>
 */

var Has160 =
/*#__PURE__*/
function (_Hasher32le) {
  _inherits(Has160, _Hasher32le);

  /**
   * @param {Object} [options]
   * @param {number} [options.rounds=80] - Number of rounds (Can be from 1 to 80)
   */
  function Has160(options) {
    var _this;

    _classCallCheck(this, Has160);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Has160).call(this, options));
    _this.options.rounds = _this.options.rounds || 80;
    /**
     *  @private
     *  @ignore
     *  @type {number[]}
     */

    _this.W = new Array(32);
    return _this;
  }
  /**
   * Reset hasher to initial state
   */


  _createClass(Has160, [{
    key: "reset",
    value: function reset() {
      _get(_getPrototypeOf(Has160.prototype), "reset", this).call(this);

      this.state.hash = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];
    }
    /**
     * Process ready blocks
     *
     * @protected
     * @ignore
     * @param {number[]} block - Block
     */

  }, {
    key: "processBlock",
    value: function processBlock(block) {
      // Working variables
      var a = this.state.hash[0] | 0;
      var b = this.state.hash[1] | 0;
      var c = this.state.hash[2] | 0;
      var d = this.state.hash[3] | 0;
      var e = this.state.hash[4] | 0;

      for (var i = 0; i < 16; i++) {
        this.W[i] = block[i] | 0;
      }

      this.W[16] = this.W[0] ^ this.W[1] ^ this.W[2] ^ this.W[3] | 0;
      this.W[17] = this.W[4] ^ this.W[5] ^ this.W[6] ^ this.W[7] | 0;
      this.W[18] = this.W[8] ^ this.W[9] ^ this.W[10] ^ this.W[11] | 0;
      this.W[19] = this.W[12] ^ this.W[13] ^ this.W[14] ^ this.W[15] | 0;
      this.W[20] = this.W[3] ^ this.W[6] ^ this.W[9] ^ this.W[12] | 0;
      this.W[21] = this.W[2] ^ this.W[5] ^ this.W[8] ^ this.W[15] | 0;
      this.W[22] = this.W[1] ^ this.W[4] ^ this.W[11] ^ this.W[14] | 0;
      this.W[23] = this.W[0] ^ this.W[7] ^ this.W[10] ^ this.W[13] | 0;
      this.W[24] = this.W[5] ^ this.W[7] ^ this.W[12] ^ this.W[14] | 0;
      this.W[25] = this.W[0] ^ this.W[2] ^ this.W[9] ^ this.W[11] | 0;
      this.W[26] = this.W[4] ^ this.W[6] ^ this.W[13] ^ this.W[15] | 0;
      this.W[27] = this.W[1] ^ this.W[3] ^ this.W[8] ^ this.W[10] | 0;
      this.W[28] = this.W[2] ^ this.W[7] ^ this.W[8] ^ this.W[13] | 0;
      this.W[29] = this.W[3] ^ this.W[4] ^ this.W[9] ^ this.W[14] | 0;
      this.W[30] = this.W[0] ^ this.W[5] ^ this.W[10] ^ this.W[15] | 0;
      this.W[31] = this.W[1] ^ this.W[6] ^ this.W[11] ^ this.W[12] | 0; // Calculate hash

      for (var _i = 0; _i < this.options.rounds; _i++) {
        var t = Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateLeft */ "a"])(a, ROT[_i % 20]) + e + this.W[IND[_i]] + K[_i / 20 >> 0] | 0;

        if (_i < 20) {
          t = t + (b & c | ~b & d) | 0;
        } else if (_i < 40) {
          t = t + (b ^ c ^ d) | 0;
        } else if (_i < 60) {
          t = t + (c ^ (b | ~d)) | 0;
        } else {
          t = t + (b ^ c ^ d) | 0;
        }

        e = d;
        d = c;
        c = Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateLeft */ "a"])(b, ROT2[_i / 20 >> 0]) | 0;
        b = a;
        a = t;
      }

      this.state.hash[0] = this.state.hash[0] + a | 0;
      this.state.hash[1] = this.state.hash[1] + b | 0;
      this.state.hash[2] = this.state.hash[2] + c | 0;
      this.state.hash[3] = this.state.hash[3] + d | 0;
      this.state.hash[4] = this.state.hash[4] + e | 0;
    }
    /**
     * Finalize hash and return result
     *
     * @returns {string}
     */

  }, {
    key: "finalize",
    value: function finalize() {
      this.addPaddingISO7816(this.state.message.length < 56 ? 56 - this.state.message.length | 0 : 120 - this.state.message.length | 0);
      this.addLengthBits();
      this.process();
      return this.getStateHash();
    }
  }]);

  return Has160;
}(_hasher32le__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/* harmony default export */ __webpack_exports__["a"] = (Has160);

/***/ }),
/* 15 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return toBase64; });


var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
/**
 * Convert binary result of hash to Base64
 *
 * @param {string} raw
 * @returns {string}
 */

function toBase64(raw) {
  var str = '';
  var size = raw.length - raw.length % 3 | 0;
  var n = 0;

  for (var i = 0; i < size; i += 3) {
    n = raw.charCodeAt(i) << 16 | raw.charCodeAt(i + 1) << 8 | raw.charCodeAt(i + 2);
    str += chars.charAt(n >> 18) + chars.charAt(n >> 12 & 0x3f) + chars.charAt(n >> 6 & 0x3f) + chars.charAt(n & 0x3f);
  }

  if (raw.length - size === 2) {
    n = raw.charCodeAt(size) << 16 | raw.charCodeAt(size + 1) << 8;
    str += chars.charAt(n >> 18) + chars.charAt(n >> 12 & 0x3f) + chars.charAt(n >> 6 & 0x3f) + '=';
  } else if (raw.length - size === 1) {
    n = raw.charCodeAt(size) << 16;
    str += chars.charAt(n >> 18) + chars.charAt(n >> 12 & 0x3f) + '==';
  }

  return str;
}

/***/ }),
/* 16 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _hasher32le__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _tools_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 // Transform constants

/** @type {number[]} */

var S = [[3, 7, 11, 19], [3, 5, 9, 13], [3, 9, 11, 15]];
/** @type {number} */

var F = 0x00000000;
/** @type {number} */

var G = 0x5a827999;
/** @type {number} */

var H = 0x6ed9eba1;
/**
 * Calculates [MD4](https://tools.ietf.org/html/rfc1320) hash
 *
 * @example <caption>Calculates MD4 hash from string "message" - ES6 style</caption>
 * import Md4 from "crypto-api/src/hasher/md4";
 * import {toHex} from "crypto-api/src/encoder/hex";
 *
 * let hasher = new Md4();
 * hasher.update('message');
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates MD4 hash from UTF string "message" - ES6 style</caption>
 * import Md4 from "crypto-api/src/hasher/md4";
 * import {toHex} from "crypto-api/src/encoder/hex";
 * import {fromUtf} from "crypto-api/src/encoder/utf";
 *
 * let hasher = new Md4();
 * hasher.update(fromUtf('message'));
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates MD4 hash from string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   var hasher = CryptoApi.getHasher('md4');
 *   hasher.update('message');
 *   console.log(CryptoApi.encoder.toHex(hasher.finalize()));
 * </script>
 *
 * @example <caption>Calculates MD4 hash from UTF string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   console.log(CryptoApi.hash('md4', 'message'));
 * </script>
 */

var Md4 =
/*#__PURE__*/
function (_Hasher32le) {
  _inherits(Md4, _Hasher32le);

  function Md4() {
    _classCallCheck(this, Md4);

    return _possibleConstructorReturn(this, _getPrototypeOf(Md4).apply(this, arguments));
  }

  _createClass(Md4, [{
    key: "reset",

    /**
     * Reset hasher to initial state
     */
    value: function reset() {
      _get(_getPrototypeOf(Md4.prototype), "reset", this).call(this);

      this.state.hash = [0x67452301 | 0, 0xefcdab89 | 0, 0x98badcfe | 0, 0x10325476 | 0];
    }
    /**
     * @private
     * @ignore
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {number}
     */

  }, {
    key: "processBlock",

    /**
     * Process ready blocks
     *
     * @protected
     * @ignore
     * @param {number[]} block - Block
     */
    value: function processBlock(block) {
      // Working variables
      var a = this.state.hash[0] | 0;
      var b = this.state.hash[1] | 0;
      var c = this.state.hash[2] | 0;
      var d = this.state.hash[3] | 0; // Round 1

      a = Md4.CC(Md4.FF, F, a, b, c, d, block[0], S[0][0]);
      d = Md4.CC(Md4.FF, F, d, a, b, c, block[1], S[0][1]);
      c = Md4.CC(Md4.FF, F, c, d, a, b, block[2], S[0][2]);
      b = Md4.CC(Md4.FF, F, b, c, d, a, block[3], S[0][3]);
      a = Md4.CC(Md4.FF, F, a, b, c, d, block[4], S[0][0]);
      d = Md4.CC(Md4.FF, F, d, a, b, c, block[5], S[0][1]);
      c = Md4.CC(Md4.FF, F, c, d, a, b, block[6], S[0][2]);
      b = Md4.CC(Md4.FF, F, b, c, d, a, block[7], S[0][3]);
      a = Md4.CC(Md4.FF, F, a, b, c, d, block[8], S[0][0]);
      d = Md4.CC(Md4.FF, F, d, a, b, c, block[9], S[0][1]);
      c = Md4.CC(Md4.FF, F, c, d, a, b, block[10], S[0][2]);
      b = Md4.CC(Md4.FF, F, b, c, d, a, block[11], S[0][3]);
      a = Md4.CC(Md4.FF, F, a, b, c, d, block[12], S[0][0]);
      d = Md4.CC(Md4.FF, F, d, a, b, c, block[13], S[0][1]);
      c = Md4.CC(Md4.FF, F, c, d, a, b, block[14], S[0][2]);
      b = Md4.CC(Md4.FF, F, b, c, d, a, block[15], S[0][3]); // Round 2

      a = Md4.CC(Md4.GG, G, a, b, c, d, block[0], S[1][0]);
      d = Md4.CC(Md4.GG, G, d, a, b, c, block[4], S[1][1]);
      c = Md4.CC(Md4.GG, G, c, d, a, b, block[8], S[1][2]);
      b = Md4.CC(Md4.GG, G, b, c, d, a, block[12], S[1][3]);
      a = Md4.CC(Md4.GG, G, a, b, c, d, block[1], S[1][0]);
      d = Md4.CC(Md4.GG, G, d, a, b, c, block[5], S[1][1]);
      c = Md4.CC(Md4.GG, G, c, d, a, b, block[9], S[1][2]);
      b = Md4.CC(Md4.GG, G, b, c, d, a, block[13], S[1][3]);
      a = Md4.CC(Md4.GG, G, a, b, c, d, block[2], S[1][0]);
      d = Md4.CC(Md4.GG, G, d, a, b, c, block[6], S[1][1]);
      c = Md4.CC(Md4.GG, G, c, d, a, b, block[10], S[1][2]);
      b = Md4.CC(Md4.GG, G, b, c, d, a, block[14], S[1][3]);
      a = Md4.CC(Md4.GG, G, a, b, c, d, block[3], S[1][0]);
      d = Md4.CC(Md4.GG, G, d, a, b, c, block[7], S[1][1]);
      c = Md4.CC(Md4.GG, G, c, d, a, b, block[11], S[1][2]);
      b = Md4.CC(Md4.GG, G, b, c, d, a, block[15], S[1][3]); // Round 3

      a = Md4.CC(Md4.HH, H, a, b, c, d, block[0], S[2][0]);
      d = Md4.CC(Md4.HH, H, d, a, b, c, block[8], S[2][1]);
      c = Md4.CC(Md4.HH, H, c, d, a, b, block[4], S[2][2]);
      b = Md4.CC(Md4.HH, H, b, c, d, a, block[12], S[2][3]);
      a = Md4.CC(Md4.HH, H, a, b, c, d, block[2], S[2][0]);
      d = Md4.CC(Md4.HH, H, d, a, b, c, block[10], S[2][1]);
      c = Md4.CC(Md4.HH, H, c, d, a, b, block[6], S[2][2]);
      b = Md4.CC(Md4.HH, H, b, c, d, a, block[14], S[2][3]);
      a = Md4.CC(Md4.HH, H, a, b, c, d, block[1], S[2][0]);
      d = Md4.CC(Md4.HH, H, d, a, b, c, block[9], S[2][1]);
      c = Md4.CC(Md4.HH, H, c, d, a, b, block[5], S[2][2]);
      b = Md4.CC(Md4.HH, H, b, c, d, a, block[13], S[2][3]);
      a = Md4.CC(Md4.HH, H, a, b, c, d, block[3], S[2][0]);
      d = Md4.CC(Md4.HH, H, d, a, b, c, block[11], S[2][1]);
      c = Md4.CC(Md4.HH, H, c, d, a, b, block[7], S[2][2]);
      b = Md4.CC(Md4.HH, H, b, c, d, a, block[15], S[2][3]);
      this.state.hash = [this.state.hash[0] + a | 0, this.state.hash[1] + b | 0, this.state.hash[2] + c | 0, this.state.hash[3] + d | 0];
    }
    /**
     * Finalize hash and return result
     *
     * @returns {string}
     */

  }, {
    key: "finalize",
    value: function finalize() {
      this.addPaddingISO7816(this.state.message.length < 56 ? 56 - this.state.message.length | 0 : 120 - this.state.message.length | 0);
      this.addLengthBits();
      this.process();
      return this.getStateHash();
    }
  }], [{
    key: "FF",
    value: function FF(x, y, z) {
      return x & y | ~x & z;
    }
    /**
     * @private
     * @ignore
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {number}
     */

  }, {
    key: "GG",
    value: function GG(x, y, z) {
      return x & y | x & z | y & z;
    }
    /**
     * @private
     * @ignore
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {number}
     */

  }, {
    key: "HH",
    value: function HH(x, y, z) {
      return x ^ y ^ z;
    }
    /**
     * @private
     * @ignore
     * @param {function} f
     * @param {number} k
     * @param {number} a
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {number} m
     * @param {number} s
     * @returns {number}
     * @constructor
     */

  }, {
    key: "CC",
    value: function CC(f, k, a, x, y, z, m, s) {
      return Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateLeft */ "a"])(a + f(x, y, z) + m + k, s) | 0;
    }
  }]);

  return Md4;
}(_hasher32le__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/* harmony default export */ __webpack_exports__["a"] = (Md4);

/***/ }),
/* 17 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _hasher32be__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _tools_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 // Transform constants

/** @type {number[]} */

var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
/**
 * Calculates [SHA0](http://pages.saclay.inria.fr/pierre.karpman/fips180.pdf) hash
 *
 * @example <caption>Calculates SHA0 hash from string "message" - ES6 style</caption>
 * import Sha0 from "crypto-api/src/hasher/sha0";
 * import {toHex} from "crypto-api/src/encoder/hex";
 *
 * let hasher = new Sha0();
 * hasher.update('message');
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates SHA0 hash from UTF string "message" - ES6 style</caption>
 * import Sha0 from "crypto-api/src/hasher/sha0";
 * import {toHex} from "crypto-api/src/encoder/hex";
 * import {fromUtf} from "crypto-api/src/encoder/utf";
 *
 * let hasher = new Sha0();
 * hasher.update(fromUtf('message'));
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates SHA0 hash from string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   var hasher = CryptoApi.getHasher('sha0');
 *   hasher.update('message');
 *   console.log(CryptoApi.encoder.toHex(hasher.finalize()));
 * </script>
 *
 * @example <caption>Calculates SHA0 hash from UTF string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   console.log(CryptoApi.hash('sha0', 'message'));
 * </script>
 */

var Sha0 =
/*#__PURE__*/
function (_Hasher32be) {
  _inherits(Sha0, _Hasher32be);

  /**
   * @param {Object} [options]
   * @param {number} [options.rounds=80] - Number of rounds (Must be greater than 16)
   */
  function Sha0(options) {
    var _this;

    _classCallCheck(this, Sha0);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Sha0).call(this, options));
    _this.options.rounds = _this.options.rounds || 80;
    /**
     * Working variable (only for speed optimization)
     * @private
     * @ignore
     * @type {number[]}
     */

    _this.W = new Array(80);
    return _this;
  }
  /**
   * Reset hasher to initial state
   */


  _createClass(Sha0, [{
    key: "reset",
    value: function reset() {
      _get(_getPrototypeOf(Sha0.prototype), "reset", this).call(this);

      this.state.hash = [0x67452301 | 0, 0xefcdab89 | 0, 0x98badcfe | 0, 0x10325476 | 0, 0xc3d2e1f0 | 0];
    }
    /**
     * Process ready blocks
     *
     * @protected
     * @ignore
     * @param {number[]} block - Block
     */

  }, {
    key: "processBlock",
    value: function processBlock(block) {
      // Working variables
      var a = this.state.hash[0] | 0;
      var b = this.state.hash[1] | 0;
      var c = this.state.hash[2] | 0;
      var d = this.state.hash[3] | 0;
      var e = this.state.hash[4] | 0; // Calculate hash

      for (var i = 0; i < this.options.rounds; i++) {
        if (i < 16) {
          this.W[i] = block[i] | 0;
        } else {
          this.W[i] = this.W[i - 3] ^ this.W[i - 8] ^ this.W[i - 14] ^ this.W[i - 16] | 0;
        }

        var t = Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateLeft */ "a"])(a, 5) + e + this.W[i] + K[i / 20 >> 0] | 0;

        if (i < 20) {
          t = t + (b & c | ~b & d) | 0;
        } else if (i < 40) {
          t = t + (b ^ c ^ d) | 0;
        } else if (i < 60) {
          t = t + (b & c | b & d | c & d) | 0;
        } else {
          t = t + (b ^ c ^ d) | 0;
        }

        e = d;
        d = c;
        c = Object(_tools_tools__WEBPACK_IMPORTED_MODULE_1__[/* rotateLeft */ "a"])(b, 30) | 0;
        b = a;
        a = t;
      }

      this.state.hash[0] = this.state.hash[0] + a | 0;
      this.state.hash[1] = this.state.hash[1] + b | 0;
      this.state.hash[2] = this.state.hash[2] + c | 0;
      this.state.hash[3] = this.state.hash[3] + d | 0;
      this.state.hash[4] = this.state.hash[4] + e | 0;
    }
    /**
     * Finalize hash and return result
     *
     * @returns {string}
     */

  }, {
    key: "finalize",
    value: function finalize() {
      this.addPaddingISO7816(this.state.message.length < 56 ? 56 - this.state.message.length | 0 : 120 - this.state.message.length | 0);
      this.addLengthBits();
      this.process();
      return this.getStateHash();
    }
  }]);

  return Sha0;
}(_hasher32be__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/* harmony default export */ __webpack_exports__["a"] = (Sha0);

/***/ }),
/* 18 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fromArrayBuffer; });

/**
 * Convert ArrayBuffer to binary input for hasher
 *
 * @param {ArrayBuffer} buffer
 * @returns {string}
 */

function fromArrayBuffer(buffer) {
  var s = '';
  var bytes = new Uint8Array(buffer);

  for (var i = 0; i < bytes.length; i++) {
    s += String.fromCharCode(bytes[i]);
  }

  return s;
}

/***/ }),
/* 19 */,
/* 20 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";

/**
 * Calculates [HMAC](https://tools.ietf.org/html/rfc2104)
 *
 * @example <caption>Calculates HMAC-MD5 from string "message" with key "key" - ES6 style</caption>
 * import Md5 from "crypto-api/src/hasher/md5";
 * import Hmac from "crypto-api/src/mac/hmac";
 * import {toHex} from "crypto-api/src/encoder/hex";
 *
 * let hasher = new Md5();
 * let hmac = new Hmac('key', hasher);
 * hmac.update('message');
 * console.log(toHex(hmac.finalize()));
 *
 * @example <caption>Calculates HMAC-MD5 from UTF string "message" with UTF key "key" - ES6 style</caption>
 * import Md5 from "crypto-api/src/hasher/md5";
 * import Hmac from "crypto-api/src/mac/hmac";
 * import {toHex} from "crypto-api/src/encoder/hex";
 * import {fromUtf} from "crypto-api/src/encoder/utf";
 *
 * let hasher = new Md5();
 * let hmac = new Hmac(fromUtf('key'), hasher);
 * hmac.update(fromUtf('message'));
 * console.log(toHex(hmac.finalize()));
 *
 * @example <caption>Calculates HMAC-MD5 from string "message" with key "key" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   var hasher = CryptoApi.getHasher('md5');
 *   var hmac = CryptoApi.getHmac('key', hasher);
 *   hmac.update('message');
 *   console.log(CryptoApi.encoder.toHex(hmac.finalize()));
 * </script>
 *
 * @example <caption>Calculates HMAC-MD5 from UTF string "message" with UTF key "key" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   var hasher = CryptoApi.getHasher('md5');
 *   console.log(CryptoApi.hmac('key', 'message', hasher));
 * </script>
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Hmac =
/*#__PURE__*/
function () {
  /**
   *
   * @param {string} key
   * @param {Hasher} hasher
   */
  function Hmac(key, hasher) {
    _classCallCheck(this, Hmac);

    if (key.length > hasher.blockSizeInBytes) {
      hasher.update(key);
      key = hasher.finalize();
      hasher.reset();
    }

    for (var i = key.length; i < hasher.blockSizeInBytes; i++) {
      key += "\x00";
    }
    /**
     * @type {string}
     * @ignore
     */


    this.oPad = '';

    for (var _i = 0; _i < key.length; _i++) {
      hasher.update(String.fromCharCode(0x36 ^ key.charCodeAt(_i)));
      this.oPad += String.fromCharCode(0x5c ^ key.charCodeAt(_i));
    }
    /**
     * @type {Hasher}
     * @ignore
     */


    this.hasher = hasher;
  }
  /**
   * Update message from binary string
   *
   * @param {string} message
   */


  _createClass(Hmac, [{
    key: "update",
    value: function update(message) {
      this.hasher.update(message);
    }
    /**
     * Finalize hmac and return result
     *
     * @returns {string}
     */

  }, {
    key: "finalize",
    value: function finalize() {
      var hash = this.hasher.finalize();
      this.hasher.reset();
      this.hasher.update(this.oPad);
      this.hasher.update(hash);
      return this.hasher.finalize();
    }
  }]);

  return Hmac;
}();

/* harmony default export */ __webpack_exports__["a"] = (Hmac);

/***/ }),
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hasher_has160__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var _hasher_md2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _hasher_md4__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var _hasher_md5__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var _hasher_ripemd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
/* harmony import */ var _hasher_sha0__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(17);
/* harmony import */ var _hasher_sha1__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11);
/* harmony import */ var _hasher_sha256__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7);
/* harmony import */ var _hasher_sha512__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6);
/* harmony import */ var _hasher_snefru__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9);
/* harmony import */ var _hasher_whirlpool__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(12);
/* harmony import */ var _encoder_utf__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(1);
/* harmony import */ var _encoder_array_buffer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(18);
/* harmony import */ var _encoder_hex__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(2);
/* harmony import */ var _encoder_base64__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(15);
/* harmony import */ var _mac_hmac__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(20);


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

















/**
 * Main class for ES5 compatibility.
 * Please use subclasses of {@link Hasher} for ES6
 */

var CryptoApi =
/*#__PURE__*/
function () {
  /**
   * @ignore
   */
  function CryptoApi() {
    _classCallCheck(this, CryptoApi);

    /** @type {{}} */
    this.encoder = {};
    /** @type {fromUtf} */

    this.encoder.fromUtf = _encoder_utf__WEBPACK_IMPORTED_MODULE_11__[/* fromUtf */ "a"];
    /** @type {fromArrayBuffer} */

    this.encoder.fromArrayBuffer = _encoder_array_buffer__WEBPACK_IMPORTED_MODULE_12__[/* fromArrayBuffer */ "a"];
    /** @type {toHex} */

    this.encoder.toHex = _encoder_hex__WEBPACK_IMPORTED_MODULE_13__[/* toHex */ "a"];
    /** @type {toBase64} */

    this.encoder.toBase64 = _encoder_base64__WEBPACK_IMPORTED_MODULE_14__[/* toBase64 */ "a"];
  }
  /**
   * Get hasher by alias
   *
   * @param {string} name
   * @param {Object} options
   * @returns {Hasher}
   */


  _createClass(CryptoApi, [{
    key: "getHasher",
    value: function getHasher(name, options) {
      options = options || {};

      switch (name) {
        case 'has160':
          return new _hasher_has160__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"](options);

        case 'md2':
          return new _hasher_md2__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"](options);

        case 'md4':
          return new _hasher_md4__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"](options);

        case 'md5':
          return new _hasher_md5__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"](options);

        case 'ripemd128':
          options = Object.assign({}, {
            length: 128
          }, options);
          return new _hasher_ripemd__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"](options);

        case 'ripemd':
        case 'ripemd160':
          options = Object.assign({}, {
            length: 160
          }, options);
          return new _hasher_ripemd__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"](options);

        case 'ripemd256':
          options = Object.assign({}, {
            length: 256
          }, options);
          return new _hasher_ripemd__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"](options);

        case 'ripemd320':
          options = Object.assign({}, {
            length: 320
          }, options);
          return new _hasher_ripemd__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"](options);

        case 'sha0':
          return new _hasher_sha0__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"](options);

        case 'sha1':
          return new _hasher_sha1__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"](options);

        case 'sha224':
          options = Object.assign({}, {
            length: 224
          }, options);
          return new _hasher_sha256__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"](options);

        case 'sha256':
          options = Object.assign({}, {
            length: 256
          }, options);
          return new _hasher_sha256__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"](options);

        case 'sha384':
          options = Object.assign({}, {
            length: 384
          }, options);
          return new _hasher_sha512__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"](options);

        case 'sha512':
          options = Object.assign({}, {
            length: 512
          }, options);
          return new _hasher_sha512__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"](options);

        case 'sha512/224':
          options = Object.assign({}, {
            length: 224
          }, options);
          return new _hasher_sha512__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"](options);

        case 'sha512/256':
          options = Object.assign({}, {
            length: 256
          }, options);
          return new _hasher_sha512__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"](options);

        case 'snefru':
        case 'snefru128':
        case 'snefru128/8':
          options = Object.assign({}, {
            length: 128
          }, options);
          return new _hasher_snefru__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"](options);

        case 'snefru256':
        case 'snefru256/8':
          options = Object.assign({}, {
            length: 256
          }, options);
          return new _hasher_snefru__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"](options);

        case 'snefru128/2':
          options = Object.assign({}, {
            length: 128,
            rounds: 2
          }, options);
          return new _hasher_snefru__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"](options);

        case 'snefru256/4':
          options = Object.assign({}, {
            length: 256,
            rounds: 4
          }, options);
          return new _hasher_snefru__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"](options);

        case 'whirlpool':
          return new _hasher_whirlpool__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"](options);

        case 'whirlpool-0':
          options = Object.assign({}, {
            type: '0'
          }, options);
          return new _hasher_whirlpool__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"](options);

        case 'whirlpool-t':
          options = Object.assign({}, {
            type: 't'
          }, options);
          return new _hasher_whirlpool__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"](options);
      }
    }
    /**
     * Hash UTF message and return result in hex
     *
     * @param {string} name
     * @param {string} message
     * @param {Object} options
     * @returns {string}
     */

  }, {
    key: "hash",
    value: function hash(name, message, options) {
      options = options || {};
      var hasher = this.getHasher(name, options);
      hasher.update(Object(_encoder_utf__WEBPACK_IMPORTED_MODULE_11__[/* fromUtf */ "a"])(message));
      return Object(_encoder_hex__WEBPACK_IMPORTED_MODULE_13__[/* toHex */ "a"])(hasher.finalize());
    }
    /**
     * Get HMAC instance
     *
     * @param {string} key
     * @param {Hasher} hasher
     * @returns {Hmac}
     */

  }, {
    key: "getHmac",
    value: function getHmac(key, hasher) {
      return new _mac_hmac__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"](key, hasher);
    }
    /**
     * HMAC with UTF key from UTF message and return result in hex
     *
     * @param {string} key
     * @param {string} message
     * @param {Hasher} hasher
     * @returns {string}
     */

  }, {
    key: "hmac",
    value: function hmac(key, message, hasher) {
      var mac = this.getHmac(Object(_encoder_utf__WEBPACK_IMPORTED_MODULE_11__[/* fromUtf */ "a"])(key), hasher);
      mac.update(Object(_encoder_utf__WEBPACK_IMPORTED_MODULE_11__[/* fromUtf */ "a"])(message));
      return Object(_encoder_hex__WEBPACK_IMPORTED_MODULE_13__[/* toHex */ "a"])(mac.finalize());
    }
  }]);

  return CryptoApi;
}();

CryptoApi = new CryptoApi();
/* harmony default export */ __webpack_exports__["default"] = (CryptoApi);

/***/ })
/******/ ])["default"];
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('qiniu-js')) :
    typeof define === 'function' && define.amd ? define(['exports', 'qiniu-js'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.QiniuWebUploader = {}, global.qiniu));
})(this, (function (exports, qiniu) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var qiniu__namespace = /*#__PURE__*/_interopNamespace(qiniu);

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol, Iterator */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
        return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    var UploadError = /** @class */ (function (_super) {
        __extends(UploadError, _super);
        function UploadError(message, code) {
            var _this = _super.call(this, message) || this;
            _this.code = code;
            _this.name = 'UploadError';
            return _this;
        }
        return UploadError;
    }(Error));
    /** @class */ ((function (_super) {
        __extends(TokenError, _super);
        function TokenError(message) {
            var _this = _super.call(this, message) || this;
            _this.name = 'TokenError';
            return _this;
        }
        return TokenError;
    })(Error));

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    var sparkMd5 = {exports: {}};

    sparkMd5.exports;

    var hasRequiredSparkMd5;

    function requireSparkMd5 () {
    	if (hasRequiredSparkMd5) return sparkMd5.exports;
    	hasRequiredSparkMd5 = 1;
    	(function (module, exports) {
    		(function (factory) {
    		    {
    		        // Node/CommonJS
    		        module.exports = factory();
    		    }
    		}(function (undefined$1) {

    		    /*
    		     * Fastest md5 implementation around (JKM md5).
    		     * Credits: Joseph Myers
    		     *
    		     * @see http://www.myersdaily.org/joseph/javascript/md5-text.html
    		     * @see http://jsperf.com/md5-shootout/7
    		     */

    		    /* this function is much faster,
    		      so if possible we use it. Some IEs
    		      are the only ones I know of that
    		      need the idiotic second function,
    		      generated by an if clause.  */
    		    var hex_chr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

    		    function md5cycle(x, k) {
    		        var a = x[0],
    		            b = x[1],
    		            c = x[2],
    		            d = x[3];

    		        a += (b & c | ~b & d) + k[0] - 680876936 | 0;
    		        a  = (a << 7 | a >>> 25) + b | 0;
    		        d += (a & b | ~a & c) + k[1] - 389564586 | 0;
    		        d  = (d << 12 | d >>> 20) + a | 0;
    		        c += (d & a | ~d & b) + k[2] + 606105819 | 0;
    		        c  = (c << 17 | c >>> 15) + d | 0;
    		        b += (c & d | ~c & a) + k[3] - 1044525330 | 0;
    		        b  = (b << 22 | b >>> 10) + c | 0;
    		        a += (b & c | ~b & d) + k[4] - 176418897 | 0;
    		        a  = (a << 7 | a >>> 25) + b | 0;
    		        d += (a & b | ~a & c) + k[5] + 1200080426 | 0;
    		        d  = (d << 12 | d >>> 20) + a | 0;
    		        c += (d & a | ~d & b) + k[6] - 1473231341 | 0;
    		        c  = (c << 17 | c >>> 15) + d | 0;
    		        b += (c & d | ~c & a) + k[7] - 45705983 | 0;
    		        b  = (b << 22 | b >>> 10) + c | 0;
    		        a += (b & c | ~b & d) + k[8] + 1770035416 | 0;
    		        a  = (a << 7 | a >>> 25) + b | 0;
    		        d += (a & b | ~a & c) + k[9] - 1958414417 | 0;
    		        d  = (d << 12 | d >>> 20) + a | 0;
    		        c += (d & a | ~d & b) + k[10] - 42063 | 0;
    		        c  = (c << 17 | c >>> 15) + d | 0;
    		        b += (c & d | ~c & a) + k[11] - 1990404162 | 0;
    		        b  = (b << 22 | b >>> 10) + c | 0;
    		        a += (b & c | ~b & d) + k[12] + 1804603682 | 0;
    		        a  = (a << 7 | a >>> 25) + b | 0;
    		        d += (a & b | ~a & c) + k[13] - 40341101 | 0;
    		        d  = (d << 12 | d >>> 20) + a | 0;
    		        c += (d & a | ~d & b) + k[14] - 1502002290 | 0;
    		        c  = (c << 17 | c >>> 15) + d | 0;
    		        b += (c & d | ~c & a) + k[15] + 1236535329 | 0;
    		        b  = (b << 22 | b >>> 10) + c | 0;

    		        a += (b & d | c & ~d) + k[1] - 165796510 | 0;
    		        a  = (a << 5 | a >>> 27) + b | 0;
    		        d += (a & c | b & ~c) + k[6] - 1069501632 | 0;
    		        d  = (d << 9 | d >>> 23) + a | 0;
    		        c += (d & b | a & ~b) + k[11] + 643717713 | 0;
    		        c  = (c << 14 | c >>> 18) + d | 0;
    		        b += (c & a | d & ~a) + k[0] - 373897302 | 0;
    		        b  = (b << 20 | b >>> 12) + c | 0;
    		        a += (b & d | c & ~d) + k[5] - 701558691 | 0;
    		        a  = (a << 5 | a >>> 27) + b | 0;
    		        d += (a & c | b & ~c) + k[10] + 38016083 | 0;
    		        d  = (d << 9 | d >>> 23) + a | 0;
    		        c += (d & b | a & ~b) + k[15] - 660478335 | 0;
    		        c  = (c << 14 | c >>> 18) + d | 0;
    		        b += (c & a | d & ~a) + k[4] - 405537848 | 0;
    		        b  = (b << 20 | b >>> 12) + c | 0;
    		        a += (b & d | c & ~d) + k[9] + 568446438 | 0;
    		        a  = (a << 5 | a >>> 27) + b | 0;
    		        d += (a & c | b & ~c) + k[14] - 1019803690 | 0;
    		        d  = (d << 9 | d >>> 23) + a | 0;
    		        c += (d & b | a & ~b) + k[3] - 187363961 | 0;
    		        c  = (c << 14 | c >>> 18) + d | 0;
    		        b += (c & a | d & ~a) + k[8] + 1163531501 | 0;
    		        b  = (b << 20 | b >>> 12) + c | 0;
    		        a += (b & d | c & ~d) + k[13] - 1444681467 | 0;
    		        a  = (a << 5 | a >>> 27) + b | 0;
    		        d += (a & c | b & ~c) + k[2] - 51403784 | 0;
    		        d  = (d << 9 | d >>> 23) + a | 0;
    		        c += (d & b | a & ~b) + k[7] + 1735328473 | 0;
    		        c  = (c << 14 | c >>> 18) + d | 0;
    		        b += (c & a | d & ~a) + k[12] - 1926607734 | 0;
    		        b  = (b << 20 | b >>> 12) + c | 0;

    		        a += (b ^ c ^ d) + k[5] - 378558 | 0;
    		        a  = (a << 4 | a >>> 28) + b | 0;
    		        d += (a ^ b ^ c) + k[8] - 2022574463 | 0;
    		        d  = (d << 11 | d >>> 21) + a | 0;
    		        c += (d ^ a ^ b) + k[11] + 1839030562 | 0;
    		        c  = (c << 16 | c >>> 16) + d | 0;
    		        b += (c ^ d ^ a) + k[14] - 35309556 | 0;
    		        b  = (b << 23 | b >>> 9) + c | 0;
    		        a += (b ^ c ^ d) + k[1] - 1530992060 | 0;
    		        a  = (a << 4 | a >>> 28) + b | 0;
    		        d += (a ^ b ^ c) + k[4] + 1272893353 | 0;
    		        d  = (d << 11 | d >>> 21) + a | 0;
    		        c += (d ^ a ^ b) + k[7] - 155497632 | 0;
    		        c  = (c << 16 | c >>> 16) + d | 0;
    		        b += (c ^ d ^ a) + k[10] - 1094730640 | 0;
    		        b  = (b << 23 | b >>> 9) + c | 0;
    		        a += (b ^ c ^ d) + k[13] + 681279174 | 0;
    		        a  = (a << 4 | a >>> 28) + b | 0;
    		        d += (a ^ b ^ c) + k[0] - 358537222 | 0;
    		        d  = (d << 11 | d >>> 21) + a | 0;
    		        c += (d ^ a ^ b) + k[3] - 722521979 | 0;
    		        c  = (c << 16 | c >>> 16) + d | 0;
    		        b += (c ^ d ^ a) + k[6] + 76029189 | 0;
    		        b  = (b << 23 | b >>> 9) + c | 0;
    		        a += (b ^ c ^ d) + k[9] - 640364487 | 0;
    		        a  = (a << 4 | a >>> 28) + b | 0;
    		        d += (a ^ b ^ c) + k[12] - 421815835 | 0;
    		        d  = (d << 11 | d >>> 21) + a | 0;
    		        c += (d ^ a ^ b) + k[15] + 530742520 | 0;
    		        c  = (c << 16 | c >>> 16) + d | 0;
    		        b += (c ^ d ^ a) + k[2] - 995338651 | 0;
    		        b  = (b << 23 | b >>> 9) + c | 0;

    		        a += (c ^ (b | ~d)) + k[0] - 198630844 | 0;
    		        a  = (a << 6 | a >>> 26) + b | 0;
    		        d += (b ^ (a | ~c)) + k[7] + 1126891415 | 0;
    		        d  = (d << 10 | d >>> 22) + a | 0;
    		        c += (a ^ (d | ~b)) + k[14] - 1416354905 | 0;
    		        c  = (c << 15 | c >>> 17) + d | 0;
    		        b += (d ^ (c | ~a)) + k[5] - 57434055 | 0;
    		        b  = (b << 21 |b >>> 11) + c | 0;
    		        a += (c ^ (b | ~d)) + k[12] + 1700485571 | 0;
    		        a  = (a << 6 | a >>> 26) + b | 0;
    		        d += (b ^ (a | ~c)) + k[3] - 1894986606 | 0;
    		        d  = (d << 10 | d >>> 22) + a | 0;
    		        c += (a ^ (d | ~b)) + k[10] - 1051523 | 0;
    		        c  = (c << 15 | c >>> 17) + d | 0;
    		        b += (d ^ (c | ~a)) + k[1] - 2054922799 | 0;
    		        b  = (b << 21 |b >>> 11) + c | 0;
    		        a += (c ^ (b | ~d)) + k[8] + 1873313359 | 0;
    		        a  = (a << 6 | a >>> 26) + b | 0;
    		        d += (b ^ (a | ~c)) + k[15] - 30611744 | 0;
    		        d  = (d << 10 | d >>> 22) + a | 0;
    		        c += (a ^ (d | ~b)) + k[6] - 1560198380 | 0;
    		        c  = (c << 15 | c >>> 17) + d | 0;
    		        b += (d ^ (c | ~a)) + k[13] + 1309151649 | 0;
    		        b  = (b << 21 |b >>> 11) + c | 0;
    		        a += (c ^ (b | ~d)) + k[4] - 145523070 | 0;
    		        a  = (a << 6 | a >>> 26) + b | 0;
    		        d += (b ^ (a | ~c)) + k[11] - 1120210379 | 0;
    		        d  = (d << 10 | d >>> 22) + a | 0;
    		        c += (a ^ (d | ~b)) + k[2] + 718787259 | 0;
    		        c  = (c << 15 | c >>> 17) + d | 0;
    		        b += (d ^ (c | ~a)) + k[9] - 343485551 | 0;
    		        b  = (b << 21 | b >>> 11) + c | 0;

    		        x[0] = a + x[0] | 0;
    		        x[1] = b + x[1] | 0;
    		        x[2] = c + x[2] | 0;
    		        x[3] = d + x[3] | 0;
    		    }

    		    function md5blk(s) {
    		        var md5blks = [],
    		            i; /* Andy King said do it this way. */

    		        for (i = 0; i < 64; i += 4) {
    		            md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
    		        }
    		        return md5blks;
    		    }

    		    function md5blk_array(a) {
    		        var md5blks = [],
    		            i; /* Andy King said do it this way. */

    		        for (i = 0; i < 64; i += 4) {
    		            md5blks[i >> 2] = a[i] + (a[i + 1] << 8) + (a[i + 2] << 16) + (a[i + 3] << 24);
    		        }
    		        return md5blks;
    		    }

    		    function md51(s) {
    		        var n = s.length,
    		            state = [1732584193, -271733879, -1732584194, 271733878],
    		            i,
    		            length,
    		            tail,
    		            tmp,
    		            lo,
    		            hi;

    		        for (i = 64; i <= n; i += 64) {
    		            md5cycle(state, md5blk(s.substring(i - 64, i)));
    		        }
    		        s = s.substring(i - 64);
    		        length = s.length;
    		        tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    		        for (i = 0; i < length; i += 1) {
    		            tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
    		        }
    		        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
    		        if (i > 55) {
    		            md5cycle(state, tail);
    		            for (i = 0; i < 16; i += 1) {
    		                tail[i] = 0;
    		            }
    		        }

    		        // Beware that the final length might not fit in 32 bits so we take care of that
    		        tmp = n * 8;
    		        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
    		        lo = parseInt(tmp[2], 16);
    		        hi = parseInt(tmp[1], 16) || 0;

    		        tail[14] = lo;
    		        tail[15] = hi;

    		        md5cycle(state, tail);
    		        return state;
    		    }

    		    function md51_array(a) {
    		        var n = a.length,
    		            state = [1732584193, -271733879, -1732584194, 271733878],
    		            i,
    		            length,
    		            tail,
    		            tmp,
    		            lo,
    		            hi;

    		        for (i = 64; i <= n; i += 64) {
    		            md5cycle(state, md5blk_array(a.subarray(i - 64, i)));
    		        }

    		        // Not sure if it is a bug, however IE10 will always produce a sub array of length 1
    		        // containing the last element of the parent array if the sub array specified starts
    		        // beyond the length of the parent array - weird.
    		        // https://connect.microsoft.com/IE/feedback/details/771452/typed-array-subarray-issue
    		        a = (i - 64) < n ? a.subarray(i - 64) : new Uint8Array(0);

    		        length = a.length;
    		        tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    		        for (i = 0; i < length; i += 1) {
    		            tail[i >> 2] |= a[i] << ((i % 4) << 3);
    		        }

    		        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
    		        if (i > 55) {
    		            md5cycle(state, tail);
    		            for (i = 0; i < 16; i += 1) {
    		                tail[i] = 0;
    		            }
    		        }

    		        // Beware that the final length might not fit in 32 bits so we take care of that
    		        tmp = n * 8;
    		        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
    		        lo = parseInt(tmp[2], 16);
    		        hi = parseInt(tmp[1], 16) || 0;

    		        tail[14] = lo;
    		        tail[15] = hi;

    		        md5cycle(state, tail);

    		        return state;
    		    }

    		    function rhex(n) {
    		        var s = '',
    		            j;
    		        for (j = 0; j < 4; j += 1) {
    		            s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
    		        }
    		        return s;
    		    }

    		    function hex(x) {
    		        var i;
    		        for (i = 0; i < x.length; i += 1) {
    		            x[i] = rhex(x[i]);
    		        }
    		        return x.join('');
    		    }

    		    // In some cases the fast add32 function cannot be used..
    		    if (hex(md51('hello')) !== '5d41402abc4b2a76b9719d911017c592') ;

    		    // ---------------------------------------------------

    		    /**
    		     * ArrayBuffer slice polyfill.
    		     *
    		     * @see https://github.com/ttaubert/node-arraybuffer-slice
    		     */

    		    if (typeof ArrayBuffer !== 'undefined' && !ArrayBuffer.prototype.slice) {
    		        (function () {
    		            function clamp(val, length) {
    		                val = (val | 0) || 0;

    		                if (val < 0) {
    		                    return Math.max(val + length, 0);
    		                }

    		                return Math.min(val, length);
    		            }

    		            ArrayBuffer.prototype.slice = function (from, to) {
    		                var length = this.byteLength,
    		                    begin = clamp(from, length),
    		                    end = length,
    		                    num,
    		                    target,
    		                    targetArray,
    		                    sourceArray;

    		                if (to !== undefined$1) {
    		                    end = clamp(to, length);
    		                }

    		                if (begin > end) {
    		                    return new ArrayBuffer(0);
    		                }

    		                num = end - begin;
    		                target = new ArrayBuffer(num);
    		                targetArray = new Uint8Array(target);

    		                sourceArray = new Uint8Array(this, begin, num);
    		                targetArray.set(sourceArray);

    		                return target;
    		            };
    		        })();
    		    }

    		    // ---------------------------------------------------

    		    /**
    		     * Helpers.
    		     */

    		    function toUtf8(str) {
    		        if (/[\u0080-\uFFFF]/.test(str)) {
    		            str = unescape(encodeURIComponent(str));
    		        }

    		        return str;
    		    }

    		    function utf8Str2ArrayBuffer(str, returnUInt8Array) {
    		        var length = str.length,
    		           buff = new ArrayBuffer(length),
    		           arr = new Uint8Array(buff),
    		           i;

    		        for (i = 0; i < length; i += 1) {
    		            arr[i] = str.charCodeAt(i);
    		        }

    		        return returnUInt8Array ? arr : buff;
    		    }

    		    function arrayBuffer2Utf8Str(buff) {
    		        return String.fromCharCode.apply(null, new Uint8Array(buff));
    		    }

    		    function concatenateArrayBuffers(first, second, returnUInt8Array) {
    		        var result = new Uint8Array(first.byteLength + second.byteLength);

    		        result.set(new Uint8Array(first));
    		        result.set(new Uint8Array(second), first.byteLength);

    		        return returnUInt8Array ? result : result.buffer;
    		    }

    		    function hexToBinaryString(hex) {
    		        var bytes = [],
    		            length = hex.length,
    		            x;

    		        for (x = 0; x < length - 1; x += 2) {
    		            bytes.push(parseInt(hex.substr(x, 2), 16));
    		        }

    		        return String.fromCharCode.apply(String, bytes);
    		    }

    		    // ---------------------------------------------------

    		    /**
    		     * SparkMD5 OOP implementation.
    		     *
    		     * Use this class to perform an incremental md5, otherwise use the
    		     * static methods instead.
    		     */

    		    function SparkMD5() {
    		        // call reset to init the instance
    		        this.reset();
    		    }

    		    /**
    		     * Appends a string.
    		     * A conversion will be applied if an utf8 string is detected.
    		     *
    		     * @param {String} str The string to be appended
    		     *
    		     * @return {SparkMD5} The instance itself
    		     */
    		    SparkMD5.prototype.append = function (str) {
    		        // Converts the string to utf8 bytes if necessary
    		        // Then append as binary
    		        this.appendBinary(toUtf8(str));

    		        return this;
    		    };

    		    /**
    		     * Appends a binary string.
    		     *
    		     * @param {String} contents The binary string to be appended
    		     *
    		     * @return {SparkMD5} The instance itself
    		     */
    		    SparkMD5.prototype.appendBinary = function (contents) {
    		        this._buff += contents;
    		        this._length += contents.length;

    		        var length = this._buff.length,
    		            i;

    		        for (i = 64; i <= length; i += 64) {
    		            md5cycle(this._hash, md5blk(this._buff.substring(i - 64, i)));
    		        }

    		        this._buff = this._buff.substring(i - 64);

    		        return this;
    		    };

    		    /**
    		     * Finishes the incremental computation, reseting the internal state and
    		     * returning the result.
    		     *
    		     * @param {Boolean} raw True to get the raw string, false to get the hex string
    		     *
    		     * @return {String} The result
    		     */
    		    SparkMD5.prototype.end = function (raw) {
    		        var buff = this._buff,
    		            length = buff.length,
    		            i,
    		            tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    		            ret;

    		        for (i = 0; i < length; i += 1) {
    		            tail[i >> 2] |= buff.charCodeAt(i) << ((i % 4) << 3);
    		        }

    		        this._finish(tail, length);
    		        ret = hex(this._hash);

    		        if (raw) {
    		            ret = hexToBinaryString(ret);
    		        }

    		        this.reset();

    		        return ret;
    		    };

    		    /**
    		     * Resets the internal state of the computation.
    		     *
    		     * @return {SparkMD5} The instance itself
    		     */
    		    SparkMD5.prototype.reset = function () {
    		        this._buff = '';
    		        this._length = 0;
    		        this._hash = [1732584193, -271733879, -1732584194, 271733878];

    		        return this;
    		    };

    		    /**
    		     * Gets the internal state of the computation.
    		     *
    		     * @return {Object} The state
    		     */
    		    SparkMD5.prototype.getState = function () {
    		        return {
    		            buff: this._buff,
    		            length: this._length,
    		            hash: this._hash.slice()
    		        };
    		    };

    		    /**
    		     * Gets the internal state of the computation.
    		     *
    		     * @param {Object} state The state
    		     *
    		     * @return {SparkMD5} The instance itself
    		     */
    		    SparkMD5.prototype.setState = function (state) {
    		        this._buff = state.buff;
    		        this._length = state.length;
    		        this._hash = state.hash;

    		        return this;
    		    };

    		    /**
    		     * Releases memory used by the incremental buffer and other additional
    		     * resources. If you plan to use the instance again, use reset instead.
    		     */
    		    SparkMD5.prototype.destroy = function () {
    		        delete this._hash;
    		        delete this._buff;
    		        delete this._length;
    		    };

    		    /**
    		     * Finish the final calculation based on the tail.
    		     *
    		     * @param {Array}  tail   The tail (will be modified)
    		     * @param {Number} length The length of the remaining buffer
    		     */
    		    SparkMD5.prototype._finish = function (tail, length) {
    		        var i = length,
    		            tmp,
    		            lo,
    		            hi;

    		        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
    		        if (i > 55) {
    		            md5cycle(this._hash, tail);
    		            for (i = 0; i < 16; i += 1) {
    		                tail[i] = 0;
    		            }
    		        }

    		        // Do the final computation based on the tail and length
    		        // Beware that the final length may not fit in 32 bits so we take care of that
    		        tmp = this._length * 8;
    		        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
    		        lo = parseInt(tmp[2], 16);
    		        hi = parseInt(tmp[1], 16) || 0;

    		        tail[14] = lo;
    		        tail[15] = hi;
    		        md5cycle(this._hash, tail);
    		    };

    		    /**
    		     * Performs the md5 hash on a string.
    		     * A conversion will be applied if utf8 string is detected.
    		     *
    		     * @param {String}  str The string
    		     * @param {Boolean} [raw] True to get the raw string, false to get the hex string
    		     *
    		     * @return {String} The result
    		     */
    		    SparkMD5.hash = function (str, raw) {
    		        // Converts the string to utf8 bytes if necessary
    		        // Then compute it using the binary function
    		        return SparkMD5.hashBinary(toUtf8(str), raw);
    		    };

    		    /**
    		     * Performs the md5 hash on a binary string.
    		     *
    		     * @param {String}  content The binary string
    		     * @param {Boolean} [raw]     True to get the raw string, false to get the hex string
    		     *
    		     * @return {String} The result
    		     */
    		    SparkMD5.hashBinary = function (content, raw) {
    		        var hash = md51(content),
    		            ret = hex(hash);

    		        return raw ? hexToBinaryString(ret) : ret;
    		    };

    		    // ---------------------------------------------------

    		    /**
    		     * SparkMD5 OOP implementation for array buffers.
    		     *
    		     * Use this class to perform an incremental md5 ONLY for array buffers.
    		     */
    		    SparkMD5.ArrayBuffer = function () {
    		        // call reset to init the instance
    		        this.reset();
    		    };

    		    /**
    		     * Appends an array buffer.
    		     *
    		     * @param {ArrayBuffer} arr The array to be appended
    		     *
    		     * @return {SparkMD5.ArrayBuffer} The instance itself
    		     */
    		    SparkMD5.ArrayBuffer.prototype.append = function (arr) {
    		        var buff = concatenateArrayBuffers(this._buff.buffer, arr, true),
    		            length = buff.length,
    		            i;

    		        this._length += arr.byteLength;

    		        for (i = 64; i <= length; i += 64) {
    		            md5cycle(this._hash, md5blk_array(buff.subarray(i - 64, i)));
    		        }

    		        this._buff = (i - 64) < length ? new Uint8Array(buff.buffer.slice(i - 64)) : new Uint8Array(0);

    		        return this;
    		    };

    		    /**
    		     * Finishes the incremental computation, reseting the internal state and
    		     * returning the result.
    		     *
    		     * @param {Boolean} raw True to get the raw string, false to get the hex string
    		     *
    		     * @return {String} The result
    		     */
    		    SparkMD5.ArrayBuffer.prototype.end = function (raw) {
    		        var buff = this._buff,
    		            length = buff.length,
    		            tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    		            i,
    		            ret;

    		        for (i = 0; i < length; i += 1) {
    		            tail[i >> 2] |= buff[i] << ((i % 4) << 3);
    		        }

    		        this._finish(tail, length);
    		        ret = hex(this._hash);

    		        if (raw) {
    		            ret = hexToBinaryString(ret);
    		        }

    		        this.reset();

    		        return ret;
    		    };

    		    /**
    		     * Resets the internal state of the computation.
    		     *
    		     * @return {SparkMD5.ArrayBuffer} The instance itself
    		     */
    		    SparkMD5.ArrayBuffer.prototype.reset = function () {
    		        this._buff = new Uint8Array(0);
    		        this._length = 0;
    		        this._hash = [1732584193, -271733879, -1732584194, 271733878];

    		        return this;
    		    };

    		    /**
    		     * Gets the internal state of the computation.
    		     *
    		     * @return {Object} The state
    		     */
    		    SparkMD5.ArrayBuffer.prototype.getState = function () {
    		        var state = SparkMD5.prototype.getState.call(this);

    		        // Convert buffer to a string
    		        state.buff = arrayBuffer2Utf8Str(state.buff);

    		        return state;
    		    };

    		    /**
    		     * Gets the internal state of the computation.
    		     *
    		     * @param {Object} state The state
    		     *
    		     * @return {SparkMD5.ArrayBuffer} The instance itself
    		     */
    		    SparkMD5.ArrayBuffer.prototype.setState = function (state) {
    		        // Convert string to buffer
    		        state.buff = utf8Str2ArrayBuffer(state.buff, true);

    		        return SparkMD5.prototype.setState.call(this, state);
    		    };

    		    SparkMD5.ArrayBuffer.prototype.destroy = SparkMD5.prototype.destroy;

    		    SparkMD5.ArrayBuffer.prototype._finish = SparkMD5.prototype._finish;

    		    /**
    		     * Performs the md5 hash on an array buffer.
    		     *
    		     * @param {ArrayBuffer} arr The array buffer
    		     * @param {Boolean}     [raw] True to get the raw string, false to get the hex one
    		     *
    		     * @return {String} The result
    		     */
    		    SparkMD5.ArrayBuffer.hash = function (arr, raw) {
    		        var hash = md51_array(new Uint8Array(arr)),
    		            ret = hex(hash);

    		        return raw ? hexToBinaryString(ret) : ret;
    		    };

    		    return SparkMD5;
    		})); 
    	} (sparkMd5, sparkMd5.exports));
    	return sparkMd5.exports;
    }

    var sparkMd5Exports = requireSparkMd5();
    var SparkMD5 = /*@__PURE__*/getDefaultExportFromCjs(sparkMd5Exports);

    function calculateFileHash(file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            var _a;
                            var spark = new SparkMD5.ArrayBuffer();
                            spark.append((_a = e.target) === null || _a === void 0 ? void 0 : _a.result);
                            resolve(spark.end());
                        };
                        reader.onerror = reject;
                        reader.readAsArrayBuffer(file);
                    })];
            });
        });
    }

    var QiniuWebUploader = /** @class */ (function () {
        function QiniuWebUploader(options) {
            this.options = options;
        }
        /**
         * 基础上传方法
         * @param file
         * @param params
         * @param onProgress
         * @returns
         */
        QiniuWebUploader.prototype.upload = function (file, params, onProgress) {
            return __awaiter(this, void 0, void 0, function () {
                var hash_1, config, observable_1, error_1;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, calculateFileHash(file)];
                        case 1:
                            hash_1 = _a.sent();
                            config = __assign({ useCdnDomain: true }, params.config);
                            observable_1 = qiniu__namespace.upload(file, params.key, params.token, params.putExtra, config);
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    var subscription = observable_1.subscribe({
                                        next: function (res) {
                                            if (onProgress) {
                                                onProgress({
                                                    progress: res.total.percent,
                                                    speed: res.total.speed
                                                });
                                            }
                                        },
                                        error: function (err) {
                                            reject(new UploadError(err.message || '上传失败', 'UPLOAD_FAILED'));
                                        },
                                        complete: function (res) {
                                            resolve({
                                                url: "".concat(_this.options.domain, "/").concat(params.key),
                                                key: params.key,
                                                hash: hash_1,
                                                size: file.size,
                                                ext: file.type,
                                                etag: res.hash
                                            });
                                        }
                                    });
                                    // 添加超时控制
                                    if (params.timeout) {
                                        setTimeout(function () {
                                            subscription.unsubscribe();
                                            reject(new UploadError('上传超时', 'UPLOAD_TIMEOUT'));
                                        }, params.timeout);
                                    }
                                })];
                        case 2:
                            error_1 = _a.sent();
                            throw new UploadError(error_1.message || '上传失败', 'UPLOAD_FAILED');
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
          * 批量上传文件
          * @param files 文件列表
          * @param params 上传参数
          * @param onProgress 进度回调，返回总体进度
          * @returns 上传结果，包含成功和失败的文件信息
          */
        QiniuWebUploader.prototype.uploadFiles = function (files, params, onProgress) {
            return __awaiter(this, void 0, void 0, function () {
                var result, totalFiles, completedFiles, concurrency, i, batch, uploadPromises;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = {
                                success: [],
                                failed: []
                            };
                            totalFiles = files.length;
                            completedFiles = 0;
                            concurrency = params.concurrency || 3;
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < files.length)) return [3 /*break*/, 4];
                            batch = files.slice(i, i + concurrency);
                            uploadPromises = batch.map(function (file) { return __awaiter(_this, void 0, void 0, function () {
                                var hash, ext, key, uploadResult, error_2;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 3, , 4]);
                                            return [4 /*yield*/, calculateFileHash(file)];
                                        case 1:
                                            hash = _a.sent();
                                            ext = file.name.split('.').pop() || '';
                                            key = params.generateKey ?
                                                params.generateKey(file) :
                                                "".concat(hash, ".").concat(ext);
                                            return [4 /*yield*/, this.upload(file, __assign(__assign({}, params), { key: key }))];
                                        case 2:
                                            uploadResult = _a.sent();
                                            result.success.push(uploadResult);
                                            completedFiles++;
                                            // 更新总进度
                                            onProgress === null || onProgress === void 0 ? void 0 : onProgress({
                                                total: totalFiles,
                                                current: completedFiles
                                            });
                                            return [3 /*break*/, 4];
                                        case 3:
                                            error_2 = _a.sent();
                                            result.failed.push({
                                                file: file,
                                                error: new UploadError(error_2.message || '上传失败', 'UPLOAD_FAILED')
                                            });
                                            completedFiles++;
                                            // 更新总进度
                                            onProgress === null || onProgress === void 0 ? void 0 : onProgress({
                                                total: totalFiles,
                                                current: completedFiles
                                            });
                                            return [3 /*break*/, 4];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); });
                            // 等待当前批次完成
                            return [4 /*yield*/, Promise.all(uploadPromises)];
                        case 2:
                            // 等待当前批次完成
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i += concurrency;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/, result];
                    }
                });
            });
        };
        return QiniuWebUploader;
    }());

    exports.QiniuWebUploader = QiniuWebUploader;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=qiniu-web.js.map

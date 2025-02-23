'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var qiniu = require('qiniu');
require('fs');
require('crypto');

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

function getFileExtension(filePath) {
    var match = filePath.match(/\.([a-zA-Z0-9]+)$/);
    return match ? ".".concat(match[1]) : '.png';
}

var QiniuNodeUploader = /** @class */ (function () {
    function QiniuNodeUploader(options) {
    }
    /**
     * 文件上传（表单方式）
     * @param filePath 文件路径
     * @param key 文件名
     * @param onProgress 上传进度回调
     */
    QiniuNodeUploader.prototype.upload = function (filePath, params, onProgress) {
        return __awaiter(this, void 0, void 0, function () {
            var config, formUploader, putExtra;
            return __generator(this, function (_a) {
                config = new qiniu__namespace.conf.Config();
                formUploader = new qiniu__namespace.form_up.FormUploader(config);
                putExtra = new qiniu__namespace.form_up.PutExtra();
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        formUploader.putFile(params.token, params.key, filePath, putExtra, function (err, body, info) {
                            if (err) {
                                return reject(new UploadError(err.message, 'UPLOAD_FAILED'));
                            }
                            if (info.statusCode === 200) {
                                var extension = getFileExtension(params.key);
                                resolve({
                                    uri: "qiniu://".concat(body.bucket, "/").concat(params.key),
                                    url: "".concat(params.url, "/").concat(params.key),
                                    key: params.key,
                                    hash: body.hash,
                                    size: body.size,
                                    etag: body.etag,
                                    ext: extension
                                });
                            }
                            else {
                                reject(new UploadError(body.error, 'UPLOAD_FAILED'));
                            }
                        });
                    })];
            });
        });
    };
    /**
     * 字节数组上传（表单方式）
     * @param bytes 字节数组
     * @param key 文件名
     * @param onProgress 上传进度回调
     */
    QiniuNodeUploader.prototype.formUploadBytes = function (bytes, params, onProgress) {
        return __awaiter(this, void 0, void 0, function () {
            var config, formUploader, putExtra;
            return __generator(this, function (_a) {
                config = new qiniu__namespace.conf.Config();
                formUploader = new qiniu__namespace.form_up.FormUploader(config);
                putExtra = new qiniu__namespace.form_up.PutExtra();
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        formUploader.put(params.token, params.key, bytes, putExtra, function (err, body, info) {
                            if (err) {
                                reject(new UploadError(err.message, 'UPLOAD_FAILED'));
                                return;
                            }
                            if (info.statusCode === 200) {
                                var extension = getFileExtension(params.key);
                                resolve({
                                    uri: "qiniu://".concat(body.bucket, "/").concat(params.key),
                                    url: "".concat(params.url, "/").concat(params.key),
                                    key: params.key,
                                    hash: body.hash,
                                    size: body.size,
                                    etag: body.etag,
                                    ext: extension
                                });
                            }
                            else {
                                reject(new UploadError(body.error, 'UPLOAD_FAILED'));
                            }
                        });
                    })];
            });
        });
    };
    /**
     * 数据流上传（表单方式）
     * @param stream 可读流
     * @param key 文件名
     * @param onProgress 上传进度回调
     */
    QiniuNodeUploader.prototype.formUploadStream = function (stream, params, onProgress) {
        return __awaiter(this, void 0, void 0, function () {
            var config, formUploader, putExtra;
            return __generator(this, function (_a) {
                config = new qiniu__namespace.conf.Config();
                formUploader = new qiniu__namespace.form_up.FormUploader(config);
                putExtra = new qiniu__namespace.form_up.PutExtra();
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        formUploader.putStream(params.token, params.key, stream, putExtra, function (err, body, info) {
                            if (err) {
                                reject(new UploadError(err.message, 'UPLOAD_FAILED'));
                                return;
                            }
                            if (info.statusCode === 200) {
                                var extension = getFileExtension(params.key);
                                resolve({
                                    uri: "qiniu://".concat(body.bucket, "/").concat(params.key),
                                    url: "".concat(params.url, "/").concat(params.key),
                                    key: params.key,
                                    hash: body.hash,
                                    size: body.size,
                                    etag: body.etag,
                                    ext: extension
                                });
                            }
                            else {
                                reject(new UploadError(body.error, 'UPLOAD_FAILED'));
                            }
                        });
                    })];
            });
        });
    };
    /**
     * 文件分片上传（断点续传）
     * @param filePath 本地文件路径
     * @param key 文件名
     * @param onProgress 上传进度回调
     */
    QiniuNodeUploader.prototype.resumeUpload = function (filePath, params, onProgress) {
        return __awaiter(this, void 0, void 0, function () {
            var config, resumeUploader, putExtra;
            return __generator(this, function (_a) {
                config = new qiniu__namespace.conf.Config();
                resumeUploader = new qiniu__namespace.resume_up.ResumeUploader(config);
                putExtra = new qiniu__namespace.resume_up.PutExtra();
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        resumeUploader.putFile(params.token, params.key, filePath, putExtra, function (err, body, info) {
                            if (err) {
                                reject(new UploadError(err.message, 'UPLOAD_FAILED'));
                                return;
                            }
                            if (info.statusCode === 200) {
                                var extension = getFileExtension(params.key);
                                resolve({
                                    uri: "qiniu://".concat(body.bucket, "/").concat(params.key),
                                    url: "".concat(params.url, "/").concat(params.key),
                                    key: params.key,
                                    hash: body.hash,
                                    size: body.size,
                                    etag: body.etag,
                                    ext: extension
                                });
                            }
                            else {
                                reject(new UploadError(body.error, 'UPLOAD_FAILED'));
                            }
                        });
                    })];
            });
        });
    };
    /**
     * 数据流分片上传（断点续传）
     * @param stream 可读流
     * @param key 文件名
     * @param onProgress 上传进度回调
     */
    QiniuNodeUploader.prototype.resumeUploadStream = function (stream, params, onProgress) {
        return __awaiter(this, void 0, void 0, function () {
            var config, resumeUploader, putExtra, readableStreamLen;
            return __generator(this, function (_a) {
                config = new qiniu__namespace.conf.Config();
                resumeUploader = new qiniu__namespace.resume_up.ResumeUploader(config);
                putExtra = new qiniu__namespace.resume_up.PutExtra();
                readableStreamLen = 2000;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        resumeUploader.putStream(params.token, params.key, stream, readableStreamLen, putExtra, function (err, body, info) {
                            if (err) {
                                reject(new UploadError(err.message, 'UPLOAD_FAILED'));
                                return;
                            }
                            if (info.statusCode === 200) {
                                var extension = getFileExtension(params.key);
                                resolve({
                                    uri: "qiniu://".concat(body.bucket, "/").concat(params.key),
                                    url: "".concat(params.url, "/").concat(params.key),
                                    key: params.key,
                                    hash: body.hash,
                                    size: body.size,
                                    etag: body.etag,
                                    ext: extension
                                });
                            }
                            else {
                                reject(new UploadError(body.error, 'UPLOAD_FAILED'));
                            }
                        });
                    })];
            });
        });
    };
    return QiniuNodeUploader;
}());

exports.QiniuNodeUploader = QiniuNodeUploader;
//# sourceMappingURL=qiniu-node.js.map

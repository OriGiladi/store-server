"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    errorLogger: function() {
        return errorLogger;
    },
    requestLogger: function() {
        return requestLogger;
    }
});
const _winston = /*#__PURE__*/ _interop_require_default(require("winston"));
const _expresswinston = /*#__PURE__*/ _interop_require_default(require("express-winston"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const requestLogger = _expresswinston.default.logger({
    transports: [
        new _winston.default.transports.File({
            filename: 'request.log'
        })
    ],
    format: _winston.default.format.json()
});
const errorLogger = _expresswinston.default.errorLogger({
    transports: [
        new _winston.default.transports.File({
            filename: 'error.log'
        })
    ],
    format: _winston.default.format.json()
});

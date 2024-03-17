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
    DEVELOPMENT_TOKEN_SECRET_KEY: function() {
        return DEVELOPMENT_TOKEN_SECRET_KEY;
    },
    PRODUCTION_TOKEN_SECRET_KEY: function() {
        return PRODUCTION_TOKEN_SECRET_KEY;
    },
    NODE_ENV: function() {
        return NODE_ENV;
    },
    SALT: function() {
        return SALT;
    },
    allowedOrigins: function() {
        return allowedOrigins;
    },
    role: function() {
        return role;
    },
    tokenExpiry: function() {
        return tokenExpiry;
    }
});
const _dotenv = /*#__PURE__*/ _interop_require_wildcard(require("dotenv"));
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
_dotenv.config();
const DEVELOPMENT_TOKEN_SECRET_KEY = process.env.DEVELOPMENT_TOKEN_SECRET_KEY;
const PRODUCTION_TOKEN_SECRET_KEY = process.env.PRODUCTION_TOKEN_SECRET_KEY;
const NODE_ENV = process.env.NODE_ENV;
const SALT = process.env.SALT;
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:3000',
    'https://harmonious-duckanoo-86463d.netlify.app',
    'https://dev--funny-lollipop-a5d339.netlify.app'
];
const role = {
    user: "USER",
    admin: "ADMIN"
};
const tokenExpiry = '30m';

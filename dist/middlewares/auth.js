"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "authMiddleware", {
    enumerable: true,
    get: function() {
        return authMiddleware;
    }
});
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
const _constants = require("../utils/constants");
const _unauthorize = require("../errors/unauthorize");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const authMiddleware = async (req, res, next)=>{
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) throw new _unauthorize.Unauthorize('Authorization required');
    const userJwt = authorization.replace('Bearer ', '');
    let payload;
    try {
        payload = _jsonwebtoken.default.verify(userJwt, _constants.NODE_ENV === 'dev' ? _constants.DEVELOPMENT_TOKEN_SECRET_KEY : _constants.NODE_ENV === 'production' ? _constants.DEVELOPMENT_TOKEN_SECRET_KEY : "foreign environment");
        req.user = payload;
    } catch (error) {
        req.user = {
            error: "Authorization required!"
        };
    }
    next();
};

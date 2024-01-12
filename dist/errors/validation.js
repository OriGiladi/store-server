"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ValidationError", {
    enumerable: true,
    get: function() {
        return ValidationError;
    }
});
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
class ValidationError extends Error {
    constructor(message){
        super(message);
        _define_property(this, "statusCode", void 0);
        this.name = 'ValidationError';
        this.statusCode = 403;
    }
}

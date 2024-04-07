"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Unauthorize", {
    enumerable: true,
    get: function() {
        return Unauthorize;
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
class Unauthorize extends Error {
    constructor(message){
        super(message);
        _define_property(this, "statusCode", void 0);
        this.name = 'Unauthorize';
        this.statusCode = 401;
    }
}

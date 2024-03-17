"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ValidateRegistration", {
    enumerable: true,
    get: function() {
        return ValidateRegistration;
    }
});
const _validation = require("../errors/validation");
const ValidateRegistration = async (req, res, next)=>{
    const email = req.body.email;
    const password = req.body.password;
    const emailRegex = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$');
    if (!emailRegex.test(email) || password.length < 8) {
        return new _validation.ValidationError('Incorrect email or password');
    }
    next();
};

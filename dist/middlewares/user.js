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
const _usermodel = require("../models/user.model");
const _validation = require("../errors/validation");
const _notfounderror = require("../errors/not-found-error");
const doesUserExist = async (req, res, next)=>{
    if (req.params.id) {
        const { id } = req.params;
        const id_regex = new RegExp('^' + id + '$', 'i');
        if (!_usermodel.UserModel.findById(id_regex)) throw new _notfounderror.NotFoundError('No such User');
    }
    next();
};
const ValidateRegistration = async (req, res, next)=>{
    const email = req.body.email;
    const password = req.body.password;
    const emailRegex = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$');
    console.log(email, password);
    if (!emailRegex.test(email) || password.length < 8) {
        return new _validation.ValidationError('Incorrect email or password');
    }
    next();
};

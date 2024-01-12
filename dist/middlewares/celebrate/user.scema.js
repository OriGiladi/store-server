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
    createUserSchema: function() {
        return createUserSchema;
    },
    getUsersSchema: function() {
        return getUsersSchema;
    },
    loginCheckSchema: function() {
        return loginCheckSchema;
    }
});
const _celebrate = require("celebrate");
const createUserSchema = {
    body: _celebrate.Joi.object({
        firstName: _celebrate.Joi.string().required(),
        lastName: _celebrate.Joi.string().required(),
        email: _celebrate.Joi.string().required(),
        password: _celebrate.Joi.string().required(),
        image: _celebrate.Joi.string().required()
    })
};
const getUsersSchema = {
    body: _celebrate.Joi.object({
        firstName: _celebrate.Joi.string().required(),
        lastName: _celebrate.Joi.string().required(),
        email: _celebrate.Joi.string().required(),
        password: _celebrate.Joi.string().required()
    })
};
const loginCheckSchema = {
    body: _celebrate.Joi.object({
        email: _celebrate.Joi.string().required(),
        password: _celebrate.Joi.string().required()
    })
};

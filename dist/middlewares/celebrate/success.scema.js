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
    createSuccessSchema: function() {
        return createSuccessSchema;
    },
    getSuccessSchema: function() {
        return getSuccessSchema;
    }
});
const _celebrate = require("celebrate");
const createSuccessSchema = {
    body: _celebrate.Joi.object({
        message: _celebrate.Joi.string().required(),
        user_id: _celebrate.Joi.string().required()
    })
};
const getSuccessSchema = {
    body: _celebrate.Joi.object({
        id: _celebrate.Joi.string().required()
    })
};

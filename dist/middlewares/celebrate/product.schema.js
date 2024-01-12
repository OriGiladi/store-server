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
    createProductSchema: function() {
        return createProductSchema;
    },
    getProductSchema: function() {
        return getProductSchema;
    }
});
const _celebrate = require("celebrate");
const createProductSchema = {
    body: _celebrate.Joi.object({
        name: _celebrate.Joi.string().required(),
        price: _celebrate.Joi.string().required(),
        description: _celebrate.Joi.string().required(),
        image: _celebrate.Joi.string()
    })
};
const getProductSchema = {
    body: _celebrate.Joi.object({})
};

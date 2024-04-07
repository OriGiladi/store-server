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
    },
    rateProductSchema: function() {
        return rateProductSchema;
    }
});
const _celebrate = require("celebrate");
const createProductSchema = {
    body: _celebrate.Joi.object({
        name: _celebrate.Joi.string().required(),
        price: _celebrate.Joi.string().required(),
        description: _celebrate.Joi.string().required(),
        image: _celebrate.Joi.string().required()
    })
};
const getProductSchema = {
    body: _celebrate.Joi.object({})
};
const rateProductSchema = {
    body: _celebrate.Joi.object({
        ratings: _celebrate.Joi.array().items(_celebrate.Joi.object({
            user: _celebrate.Joi.string().required(),
            rating: _celebrate.Joi.number().required().min(1).max(5)
        }))
    })
};

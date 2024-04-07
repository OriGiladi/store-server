"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _notfounderror = require("../errors/not-found-error");
const _unauthorize = require("../errors/unauthorize");
const _cast = require("../errors/cast");
const _validation = require("../errors/validation");
const errorHandler = (error, req, res)=>{
    if (error instanceof _notfounderror.NotFoundError || error instanceof _unauthorize.Unauthorize || error instanceof _cast.CastError || error instanceof _unauthorize.Unauthorize || error instanceof _validation.ValidationError) {
        return res.status(error.statusCode || 500).send({
            message: `handler: ${error.message}`
        });
    }
    // const { statusCode = 500, message, name } = error;
    // res.status(statusCode).send({
    //     message: statusCode === 500
    //         ? `handler!: ${name}: ${message}` 
    //         : `handler!: ${message}`,
    // });
    console.log("error:", error);
};
const _default = errorHandler;

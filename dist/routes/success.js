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
const _express = require("express");
const _successcontroller = require("../controllers/success.controller");
const _celebrate = require("celebrate");
const _successscema = require("../middlewares/celebrate/success.scema");
const successRouter = (0, _express.Router)();
successRouter.get('/', (0, _celebrate.celebrate)(_successscema.getSuccessSchema), _successcontroller.getSuccessMsg);
successRouter.post('/', (0, _celebrate.celebrate)(_successscema.createSuccessSchema), _successcontroller.createSuccessMsg);
const _default = successRouter;

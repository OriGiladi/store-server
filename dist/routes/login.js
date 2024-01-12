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
const _usercontroller = require("../controllers/user.controller");
const _celebrate = require("celebrate");
const _userscema = require("../middlewares/celebrate/user.scema");
const loginRouter = (0, _express.Router)();
loginRouter.post('/', (0, _celebrate.celebrate)(_userscema.loginCheckSchema), _usercontroller.loginCheck);
const _default = loginRouter;

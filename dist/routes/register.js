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
const _user = require("../middlewares/user");
const _celebrate = require("celebrate");
const _userscema = require("../middlewares/celebrate/user.scema");
const registerRouter = (0, _express.Router)();
registerRouter.post('/', (0, _celebrate.celebrate)(_userscema.createUserSchema), _user.ValidateRegistration, _usercontroller.createUser);
const _default = registerRouter;

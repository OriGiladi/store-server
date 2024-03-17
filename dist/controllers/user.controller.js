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
    createUser: function() {
        return createUser;
    },
    passwordChange: function() {
        return passwordChange;
    },
    loginCheck: function() {
        return loginCheck;
    },
    isSuchUser: function() {
        return isSuchUser;
    },
    getUsers: function() {
        return getUsers;
    }
});
const _usermodel = require("../models/user.model");
const _adminmodel = require("../models/admin.model");
const _bcrypt = /*#__PURE__*/ _interop_require_default(require("bcrypt"));
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
const _constants = require("../utils/constants");
const _unauthorize = require("../errors/unauthorize");
const _notfounderror = require("../errors/not-found-error");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const createUser = (req, res, next)=>{
    const { firstName, lastName, email, password, image } = req.body;
    _bcrypt.default.genSalt(Number(_constants.SALT)).then((salt)=>{
        return _bcrypt.default.hash(password, salt);
    }).then((hash)=>{
        _usermodel.UserModel.create({
            firstName,
            lastName,
            email,
            password: hash,
            image
        }).then((user)=>{
            const mySecret = _constants.DEVELOPMENT_TOKEN_SECRET_KEY;
            const userJwt = _jsonwebtoken.default.sign({
                id: user.id
            }, mySecret, {
                expiresIn: _constants.tokenExpiry
            });
            return res.send({
                message: 'Registering Succesful!',
                userJwt: userJwt
            });
        }).catch((error)=>{
            console.log(error);
            next(error);
        });
    }).catch((err)=>console.error(err.message));
};
const passwordChange = (req, res, next)=>{
    const { email, password } = req.body;
    const filter = {
        email: email
    };
    _bcrypt.default.genSalt(Number(_constants.SALT)).then((salt)=>{
        return _bcrypt.default.hash(password, salt);
    }).then((hashedPassword)=>{
        const changes = {
            $set: {
                password: hashedPassword
            }
        };
        _usermodel.UserModel.updateOne(filter, changes).then(()=>{
            return res.send({
                message: 'The password change was done succesfully!',
                password: password
            });
        }).catch((error)=>{
            console.log(error);
            next(error);
        });
    }).catch((err)=>console.error(err.message));
};
const loginCheck = async (req, res, next)=>{
    const { email, password } = req.body;
    try {
        const user = await _usermodel.UserModel.findOne({
            email
        });
        if (!user) throw new _notfounderror.NotFoundError("There is no such user");
        const isPasswordValid = await _bcrypt.default.compare(password, user.password);
        if (isPasswordValid) {
            const mySecret = _constants.DEVELOPMENT_TOKEN_SECRET_KEY;
            const admin = await _adminmodel.AdminModel.find({
                userId: user.id
            });
            let userJwt = undefined;
            if (admin[0] === undefined) {
                userJwt = _jsonwebtoken.default.sign({
                    id: user.id,
                    userRole: _constants.role.user
                }, mySecret, {
                    expiresIn: _constants.tokenExpiry
                });
                return res.send({
                    message: 'Logging Succesful!',
                    userJwt: userJwt
                });
            }
            userJwt = _jsonwebtoken.default.sign({
                id: user.id,
                userRole: _constants.role.admin
            }, mySecret, {
                expiresIn: _constants.tokenExpiry
            });
            return res.send({
                message: 'Logging Succesful for admin!',
                userJwt: userJwt
            });
        } else {
            throw new _unauthorize.Unauthorize("You are not authorize to log in!");
        }
    } catch (error) {
        next(error);
    }
};
const isSuchUser = async (req, res)=>{
    const { email } = req.body;
    const user = await _usermodel.UserModel.findOne({
        email
    });
    if (user) {
        return res.send(true);
    } else {
        return res.send(false);
    }
};
const getUsers = (req, res, next)=>{
    _usermodel.UserModel.find({}).then((users)=>{
        res.send({
            data: users
        });
    }).catch((error)=>next(error));
};

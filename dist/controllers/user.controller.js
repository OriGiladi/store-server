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
    loginCheck: function() {
        return loginCheck;
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
    console.log(req.body);
    const { firstName, lastName, email, password, image } = req.body;
    _bcrypt.default.genSalt(_constants.SALT).then((salt)=>{
        console.log(firstName, lastName, email, password, image);
        return _bcrypt.default.hash(password, salt);
    }).then((hash)=>{
        _usermodel.UserModel.create({
            firstName,
            lastName,
            email,
            password: hash,
            image
        }).then((user)=>{
            // const tokens = generateTokens(user)
            const mySecret = _constants.TOKEN_SECRET_KEY;
            const myToken = _jsonwebtoken.default.sign({
                id: user.id
            }, mySecret);
            return res.send({
                message: 'Registering Succesful!',
                token: myToken
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
            // const tokens = generateTokens(user)
            //const mySecret = temp_TOKEN_SECRET_KEY as string 
            const mySecret = _constants.TOKEN_SECRET_KEY;
            const myToken = _jsonwebtoken.default.sign({
                id: user.id
            }, mySecret);
            const admin = await _adminmodel.AdminModel.find({
                userId: user.id
            });
            if (admin[0] === undefined) {
                return res.send({
                    message: 'Logging Succesful!',
                    token: myToken
                });
            }
            return res.send({
                message: 'Logging Succesfulfor admin!',
                token: myToken,
                admin: true
            });
        } else {
            console.log('login fun not ok');
            throw new _unauthorize.Unauthorize("You are not authorize to log in!");
        }
    } catch (error) {
        next(error);
    }
};
const getUsers = (req, res, next)=>{
    _usermodel.UserModel.find({}).then((users)=>{
        res.send({
            data: users
        });
    }).catch((error)=>next(error));
};

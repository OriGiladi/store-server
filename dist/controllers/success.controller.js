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
    createSuccessMsg: function() {
        return createSuccessMsg;
    },
    getSuccessMsg: function() {
        return getSuccessMsg;
    }
});
const _suceesmodule = require("../models/sucees.module");
const _unauthorize = require("../errors/unauthorize");
const createSuccessMsg = (req, res, next)=>{
    const { message, user_id } = req.body;
    _suceesmodule.SuccessModel.create({
        message,
        user_id
    }).then((user)=>{
        res.status(201).send({
            data: user
        });
    }).catch((error)=>{
        next(error);
    });
};
const getSuccessMsg = (req, res, next)=>{
    _suceesmodule.SuccessModel.findById(req.body.id).populate('user_id').then((msg)=>{
        console.log(msg);
        if (msg !== null) res.send({
            data: msg.message
        });
        else {
            throw new _unauthorize.Unauthorize("No Message");
        }
    }).catch((error)=>{
        next(error);
    });
};

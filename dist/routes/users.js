"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, // usersRouter.get('/:id', doesNoteExist, getNoteById);
// usersRouter.delete('/', deleteAllNotes);
// usersRouter.delete('/:id', doesNoteExist, deleteNoteByTitle);
"default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = require("express");
const _usercontroller = require("../controllers/user.controller");
// import doesNoteExist from "../middlewares/notes";
const usersRouter = (0, _express.Router)();
usersRouter.post('/', _usercontroller.createUser);
usersRouter.get('/', _usercontroller.getUsers);
const _default = usersRouter;

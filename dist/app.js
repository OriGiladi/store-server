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
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _mongoose = /*#__PURE__*/ _interop_require_default(require("mongoose"));
const _cors = /*#__PURE__*/ _interop_require_default(require("cors"));
const _bodyparser = /*#__PURE__*/ _interop_require_default(require("body-parser"));
const _usermodel = require("./models/user.model");
const _auth = require("./middlewares/auth");
const _routes = /*#__PURE__*/ _interop_require_default(require("./routes"));
const _errorhandler = /*#__PURE__*/ _interop_require_default(require("./middlewares/error-handler"));
const _celebrate = require("celebrate");
const _logger = require("./middlewares/logger.js");
const _admin = /*#__PURE__*/ _interop_require_default(require("./routes/admin"));
const _constants = require("./utils/constants");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const app = (0, _express.default)();
// const DB_URI_NOTES: string = 'mongodb://127.0.0.1:27017/store-db';
const DB_URI_NOTES = 'mongodb+srv://origiladi8:lGgXh0W9XqXHmQOE@wristwonders.6eiln8f.mongodb.net/?retryWrites=true&w=majority&appName=WristWonders';
_mongoose.default.connect(DB_URI_NOTES).then(()=>{
    console.log('Successfully connected to MongoDB');
}).catch((error)=>{
    console.error('Error connecting to MongoDB', error.message);
    process.exit(1);
});
app.use(_logger.requestLogger);
app.use(_bodyparser.default.urlencoded({
    extended: true
}));
app.use(_bodyparser.default.json());
app.use((0, _cors.default)({
    origin: _constants.allowedOrigins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}));
app.use(_routes.default);
app.use(_auth.authMiddleware); // middleware to check token (authentication)
app.use('/users/me', async (req, res)=>{
    const { id } = res.locals.user;
    const user = await _usermodel.UserModel.findById(id);
    // error handling
    res.send(user);
});
app.use(_admin.default);
app.use(_logger.errorLogger); // winstons error logger middleware
app.use((0, _celebrate.errors)()); // celecbrate middleware
app.use(_errorhandler.default); // error handler middleware
const _default = app;

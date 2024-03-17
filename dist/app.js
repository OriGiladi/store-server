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
const _admin = /*#__PURE__*/ _interop_require_default(require("./routes/admin"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const { errorLogger, requestLogger } = require('./middlewares/logger.js');
const app = (0, _express.default)();
const DB_URI_NOTES = 'mongodb://127.0.0.1:27017/store-db';
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:3000'
]; // TODO: move it to const
_mongoose.default.connect(DB_URI_NOTES).then(()=>{
    console.log('Successfully connected to MongoDB');
}).catch((error)=>{
    console.error('Error connecting to MongoDB', error.message);
    process.exit(1);
});
app.use(requestLogger);
app.use(_bodyparser.default.urlencoded({
    extended: true
}));
app.use(_bodyparser.default.json());
app.use((0, _cors.default)({
    origin: allowedOrigins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}));
app.use(_routes.default);
app.use(_auth.authMiddleware); // middleware to check token (authentication)
app.use('/users/me', async (req, res)=>{
    const { id } = req.user;
    const user = await _usermodel.UserModel.findById(id);
    // error handling
    res.send(user);
});
app.use(_admin.default);
app.use(errorLogger); // winstons error logger middleware
app.use((0, _celebrate.errors)()); // celecbrate middleware
app.use(_errorhandler.default); // error handler middleware
const _default = app;

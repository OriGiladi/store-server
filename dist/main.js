"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _app = /*#__PURE__*/ _interop_require_default(require("./app"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const PORT = 3000;
function main() {
    try {
        _app.default.listen(PORT, ()=>{
            console.log(`server started at http://localhost ${PORT}`);
        });
    } catch (err) {
        console.log(`server failed at http://localhost ${PORT}`, err);
    }
}
main();

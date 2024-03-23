import app from "./app";
const PORT = 3000;
function main() {
    try {
        app.listen(PORT, () => {
            console.log(`server started at http://localhost ${PORT}`);
        });
    }
    catch (err) {
        console.log(`server failed at http://localhost ${PORT}`, err);
    }
}
main();
//# sourceMappingURL=main.js.map
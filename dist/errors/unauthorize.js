export class Unauthorize extends Error {
    constructor(message) {
        super(message);
        this.name = 'Unauthorize';
        this.statusCode = 401;
    }
}
//# sourceMappingURL=unauthorize.js.map
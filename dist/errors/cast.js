export class CastError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CastError';
        this.statusCode = 500;
        this.message = 'Wrong Credentials';
    }
}
//# sourceMappingURL=cast.js.map
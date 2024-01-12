export class CastError extends Error{
    statusCode: number;
    constructor(message: string) {
        super(message)
        this.name = 'CastError';
        this.statusCode = 500;
        this.message = 'Wrong Credentials'
    }

}
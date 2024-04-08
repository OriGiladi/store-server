export class BadRequest extends Error{
    statusCode: number;
    constructor(message: string) {
        super(message)
        this.name = 'Bad Request';
        this.statusCode = 400;
    }

}
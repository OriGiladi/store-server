export class Unauthorize extends Error{
    statusCode: number;
    constructor(message: string) {
        super(message)
        this.name = 'Unauthorize';
        this.statusCode = 401;
    }

}
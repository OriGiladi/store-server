import { Request, Response } from 'express';
import { NotFoundError } from '../errors/not-found-error';
import { Unauthorize } from '../errors/unauthorize';
import { CastError } from '../errors/cast';
import { ValidationError } from '../errors/validation';

const errorHandler = (
    error: Error,
    req: Request,
    res: Response
) => {
    if (error instanceof NotFoundError || error instanceof Unauthorize || error instanceof CastError || error instanceof Unauthorize || error instanceof ValidationError) {
        return res.status(error.statusCode).send({ message:`handler: ${error.message }` });
    }
    const { statusCode = 500, message, name } = error;
    res.status(statusCode).send({
        message: statusCode === 500
       ?`handler!: ${name}: ${message}` // ? 'An error occurred on the server'
        : `handler!: ${message}`,
    });
};

export default errorHandler;

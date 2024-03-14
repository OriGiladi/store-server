import { Request, Response } from 'express';
import { NotFoundError } from '../errors/not-found-error';
import { Unauthorize } from '../errors/unauthorize';
import { CastError } from '../errors/cast';
import { ValidationError } from '../errors/validation';

interface CustomError extends Error {
    statusCode?: number;
}

const errorHandler = (
    error: CustomError, // Use CustomError type here
    req: Request,
    res: Response
) => {
    if (error instanceof NotFoundError || error instanceof Unauthorize || error instanceof CastError || error instanceof Unauthorize || error instanceof ValidationError) {
        return res.status(error.statusCode || 500).send({ message: `handler: ${error.message}` });
    }
    const { statusCode = 500, message, name } = error;
    res.status(statusCode).send({
        message: statusCode === 500
            ? `handler!: ${name}: ${message}` 
            : `handler!: ${message}`,
    });
};

export default errorHandler;

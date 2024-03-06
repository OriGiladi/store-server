import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../errors/validation";


export const ValidateRegistration = async (req: Request, res: Response, next: NextFunction) => {
        const email  = req.body.email;
        const password  = req.body.password;
        // const emailRegex = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')
        const emailRegex = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$');

        if (!emailRegex.test(email) || password.length < 8) 
        {
            return new ValidationError('Incorrect email or password')
        }
            
    next(); 
}


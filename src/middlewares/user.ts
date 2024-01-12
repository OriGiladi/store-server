import { UserModel } from "../models/user.model";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../errors/validation";
import { NotFoundError } from "../errors/not-found-error";
const doesUserExist = async (req: Request, res: Response, next: NextFunction) => {

    if (req.params.id) {
        const { id } = req.params;
        const id_regex: RegExp = new RegExp('^' + id + '$', 'i')
        if (!UserModel.findById( id_regex )) 
        throw new NotFoundError('No such User');
    }
    next();
}
export const ValidateRegistration = async (req: Request, res: Response, next: NextFunction) => {
        const email  = req.body.email;
        const password  = req.body.password;
        const emailRegex = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')
        console.log(email, password)

        if (!emailRegex.test(email) || password.length < 8) 
        {
            return new ValidationError('Incorrect email or password')
        }
            
    next(); 
}


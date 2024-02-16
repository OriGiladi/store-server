import {User, UserModel} from '../models/user.model'
import { AdminModel } from '../models/admin.model';
import { Request, Response, NextFunction} from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { DEVELOPMENT_TOKEN_SECRET_KEY,NODE_ENV, SALT } from '../utils/constants';
import { Unauthorize } from '../errors/unauthorize';
import { NotFoundError } from '../errors/not-found-error';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
    const {firstName, lastName, email, password, image} = req.body
    bcrypt
    .genSalt(Number(SALT as string))
    .then(salt => {
        return bcrypt.hash(password, salt)
    })
    .then(hash => {
        UserModel.create({firstName, lastName, email, password: hash, image})
        .then((user) => {
            const mySecret = DEVELOPMENT_TOKEN_SECRET_KEY as string
            const myToken: string | undefined = jwt.sign({id: user.id}, mySecret, { expiresIn: '10m' })
            return res.send({message: 'Registering Succesful!',token: myToken});
        })
        .catch((error) => {
            console.log(error)
            next(error)
        }
        );
    })
    .catch(err => console.error(err.message))
}
export const passwordChange = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    const filter = {email: email}
    bcrypt
    .genSalt(Number(SALT as string))
    .then(salt => {
        return bcrypt.hash(password, salt)
    })
    .then(hashedPassword => {
        const changes = {
            $set: {
                password: hashedPassword
            },
        };
        UserModel.updateOne( filter, changes)
        .then((user) => {
            return res.send({message: 'The password change was done succesfully!', password: password});
        })
        .catch((error) => {
            console.log(error)
            next(error)
        }
        );
    })
    .catch(err => console.error(err.message))
}


export const loginCheck = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) throw new NotFoundError("There is no such user")

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            const mySecret = DEVELOPMENT_TOKEN_SECRET_KEY as string 
            const admin = await AdminModel.find({userId: user.id})
            let userJwt: string | undefined = undefined
            if(admin[0] === undefined){
                userJwt = jwt.sign({id: user.id, userRole: "USER"}, mySecret, { expiresIn: '10m' }) // TODO: get the roles and expiresIn from an enum in utils
                return res.send({message: 'Logging Succesful!',userJwt: userJwt});
            }
            userJwt = jwt.sign({id: user.id, userRole: "ADMIN"}, mySecret, { expiresIn: '10m' }) // TODO: get the roles and expiresIn from an enum in utils
            return res.send({message: 'Logging Succesful for admin!',userJwt: userJwt});
        } else {
            throw new Unauthorize("You are not authorize to log in!")
        }
            
    } catch (error) {
        next(error)
    }
};

export const isSuchUser = async (req: Request, res: Response, next: NextFunction) => { 
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
        return res.send(true);
    } else {
        return res.send(false);
    }
}

export const getUsers = (req: Request, res: Response, next: NextFunction) => { 
    UserModel.find({})
    .then((users) => {
    res.send({data: users})
    })
    .catch((error) => next(error));
}

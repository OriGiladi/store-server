import {User, UserModel} from '../models/user.model'
import { TokenModel } from '../models/token.model';
import { AdminModel } from '../models/admin.model';
import { Request, Response, NextFunction} from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET_KEY, NODE_ENV, SALT } from '../utils/constants';
import { Unauthorize } from '../errors/unauthorize';
import { NotFoundError } from '../errors/not-found-error';

// function generateTokens(user){
//     const mySecret = temp_TOKEN_SECRET_KEY as string 
//     const myRefresh_Secret = temp_REFRESH_TOKEN_SECRET_KEY as string 

//     const myToken: string | undefined = jwt.sign({id: user.id}, mySecret, { expiresIn: '10m' })
//     const myRefreshToken: string | undefined = jwt.sign({id: user.id}, myRefresh_Secret)

//     TokenModel.create({myRefreshToken})
//     return { accessToken: myToken, refreshToken: myRefreshToken }
// } 

export const createUser = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    const {firstName, lastName, email, password, image} = req.body
    bcrypt
    .genSalt(SALT as number)
    .then(salt => {
        console.log(firstName, lastName, email, password, image)
        return bcrypt.hash(password, salt)
    })
    .then(hash => {
        UserModel.create({firstName, lastName, email, password: hash, image})
        .then((user) => {
            // const tokens = generateTokens(user)
            const mySecret = TOKEN_SECRET_KEY as string
            const myToken: string | undefined = jwt.sign({id: user.id}, mySecret)
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


export const loginCheck = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) throw new NotFoundError("There is no such user")

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            // const tokens = generateTokens(user)
            //const mySecret = temp_TOKEN_SECRET_KEY as string 
            const mySecret = TOKEN_SECRET_KEY as string 
            const myToken: string | undefined = jwt.sign({id: user.id}, mySecret)
            const admin = await AdminModel.find({userId: user.id})
            if(admin[0] === undefined){
                return res.send({message: 'Logging Succesful!',token: myToken});
            }
            return res.send({message: 'Logging Succesfulfor admin!',token: myToken, admin: true});
        } else {
            console.log('login fun not ok')
            throw new Unauthorize("You are not authorize to log in!")
        }
            
    } catch (error) {
        next(error)
    }
};


export const getUsers = (req: Request, res: Response, next: NextFunction) => { 
    UserModel.find({})
    .then((users) => {
    res.send({data: users})
    })
    .catch((error) => next(error));
}

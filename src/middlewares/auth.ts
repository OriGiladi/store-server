import jwt, { Secret } from 'jsonwebtoken'
import { DEVELOPMENT_TOKEN_SECRET_KEY, PRODUCTION_TOKEN_SECRET_KEY, NODE_ENV } from '../utils/constants';
import { Request, Response, NextFunction } from "express";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

  const { authorization } = req.headers; 
    if (!authorization || !authorization.startsWith('Bearer ')) {
        res.locals.user  = {error: "Authorization required!"}
        return next();
    }

    
  const userJwt = authorization.replace('Bearer ', ''); 
    let payload: string | jwt.JwtPayload;
    try {

            payload = jwt.verify(
            userJwt,
            NODE_ENV === 'dev' ? (DEVELOPMENT_TOKEN_SECRET_KEY as Secret) : 
            NODE_ENV === 'production' ? (PRODUCTION_TOKEN_SECRET_KEY as Secret) :
            "foreign environment" 
            );
          //  req.user = payload;
          res.locals.user = payload;
        } catch (error) {
            res.locals.user  = {error: "Authorization required!"}
        }
        next();
}; 

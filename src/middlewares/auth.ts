import jwt, { Secret } from 'jsonwebtoken'
import { DEVELOPMENT_TOKEN_SECRET_KEY, PRODUCTION_TOKEN_SECRET_KEY, NODE_ENV } from '../utils/constants';
import { Request, Response, NextFunction } from "express";
import { Unauthorize } from '../errors/unauthorize';
import { TokenModel } from '../models/token.model';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

  const { authorization } = req.headers; 
    if (!authorization || !authorization.startsWith('Bearer ')) 
      throw new Unauthorize('Authorization required')
    
  const token = authorization.replace('Bearer ', ''); 
    
    let payload: string | jwt.JwtPayload;

    try {

            payload = jwt.verify(
            token,
            NODE_ENV === 'dev' ? (DEVELOPMENT_TOKEN_SECRET_KEY as Secret) : 
            NODE_ENV === 'production' ? (DEVELOPMENT_TOKEN_SECRET_KEY as Secret) :
            "foreign environment"
            );
        } catch (error) {
          throw new Unauthorize('Authorization required!')
        }

        req.user = payload;
        next();
}; 

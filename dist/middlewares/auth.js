import jwt from 'jsonwebtoken';
import { DEVELOPMENT_TOKEN_SECRET_KEY, PRODUCTION_TOKEN_SECRET_KEY, NODE_ENV } from '../utils/constants';
export const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        res.locals.user = { error: "Authorization required!" };
        return next();
    }
    const userJwt = authorization.replace('Bearer ', '');
    let payload;
    try {
        payload = jwt.verify(userJwt, NODE_ENV === 'dev' ? DEVELOPMENT_TOKEN_SECRET_KEY :
            NODE_ENV === 'production' ? PRODUCTION_TOKEN_SECRET_KEY :
                "foreign environment");
        res.locals.user = payload;
    }
    catch (error) {
        res.locals.user = { error: "Authorization required!" };
    }
    next();
};
//# sourceMappingURL=auth.js.map
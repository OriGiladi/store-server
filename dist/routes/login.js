import { Router } from "express";
import { isSuchUser, loginCheck, passwordChange } from '../controllers/user.controller';
const loginRouter = Router();
import { celebrate } from 'celebrate';
import { loginSchema, emailSchema } from "../middlewares/celebrate/user.scema";
loginRouter.post('/', celebrate(loginSchema), loginCheck);
loginRouter.patch('/', celebrate(loginSchema), passwordChange);
loginRouter.post('/isSuchUser', celebrate(emailSchema), isSuchUser);
export default loginRouter;
//# sourceMappingURL=login.js.map
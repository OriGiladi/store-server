import { Router} from "express";
import { loginCheck, passwordChange} from '../controllers/user.controller'
const loginRouter: Router = Router();

import { celebrate, Joi } from 'celebrate';
import { loginCheckSchema} from "../middlewares/celebrate/user.scema";

loginRouter.post('/', celebrate(loginCheckSchema), loginCheck)
loginRouter.patch('/', celebrate(loginCheckSchema), passwordChange)



export default loginRouter; 
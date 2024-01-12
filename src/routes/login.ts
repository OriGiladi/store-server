import { Router} from "express";
import { loginCheck} from '../controllers/user.controller'
const loginRouter: Router = Router();

import { celebrate, Joi } from 'celebrate';
import { loginCheckSchema} from "../middlewares/celebrate/user.scema";

loginRouter.post('/', celebrate(loginCheckSchema), loginCheck)



export default loginRouter; 
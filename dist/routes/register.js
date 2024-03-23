import { Router } from "express";
import { createUser } from '../controllers/user.controller';
import { ValidateRegistration } from "../middlewares/user";
import { celebrate } from 'celebrate';
import { createUserSchema } from "../middlewares/celebrate/user.scema";
const registerRouter = Router();
registerRouter.post('/', celebrate(createUserSchema), ValidateRegistration, createUser);
export default registerRouter;
//# sourceMappingURL=register.js.map
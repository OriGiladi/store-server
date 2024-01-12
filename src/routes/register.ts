
import { Router} from "express";
import {createUser, getUsers} from '../controllers/user.controller'
import { ValidateRegistration } from "../middlewares/user";
import { celebrate, Joi } from 'celebrate';
import { createUserSchema, getUsersSchema} from "../middlewares/celebrate/user.scema";

const registerRouter: Router = Router();
registerRouter.post('/',celebrate(createUserSchema), ValidateRegistration, createUser)
// registerRouter.post('/', createUser)

// registerRouter.get('/', celebrate(getUsersSchema), getUsers)


export default registerRouter; 

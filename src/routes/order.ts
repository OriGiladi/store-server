import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import { createOrder, getOrdersOfUser } from '../controllers/order.controllers';
import { createOrderSchema, getOrdersOfUserSchema } from '../middlewares/celebrate/order.schema';


const orderRouter: Router = Router();

orderRouter.post('/',celebrate(createOrderSchema),  createOrder)
orderRouter.get('/:user',celebrate(getOrdersOfUserSchema),  getOrdersOfUser)

export default orderRouter; 
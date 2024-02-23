import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import { createOrder } from '../controllers/order.controllers';
import { createOrderSchema } from '../middlewares/celebrate/order.schema';


const orderRouter: Router = Router();

orderRouter.post('/',celebrate(createOrderSchema),  createOrder)

export default orderRouter; 
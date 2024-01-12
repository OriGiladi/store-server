import { Router} from "express";

import { celebrate, Joi } from 'celebrate';
import { createProductSchema, getProductSchema } from "../middlewares/celebrate/product.schema";
import { getAllProducts, getSingleProduct } from "../controllers/product.controller";

const productRouter: Router = Router();

productRouter.get('/',celebrate(getProductSchema),  getAllProducts)
productRouter.get('/:id',celebrate(getProductSchema),  getSingleProduct)


export default productRouter; 
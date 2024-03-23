import { Router } from "express";
import { celebrate } from 'celebrate';
import { getProductSchema, rateProductSchema } from "../middlewares/celebrate/product.schema";
import { getAllProducts, getSingleProduct, rateProduct } from "../controllers/product.controller";
const productRouter = Router();
productRouter.get('/', celebrate(getProductSchema), getAllProducts);
productRouter.get('/:id', celebrate(getProductSchema), getSingleProduct);
productRouter.patch('/rate/:id', celebrate(rateProductSchema), rateProduct);
export default productRouter;
//# sourceMappingURL=product.js.map
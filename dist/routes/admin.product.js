import { Router } from "express";
import { celebrate } from 'celebrate';
import { createProductSchema, getProductSchema } from "../middlewares/celebrate/product.schema";
import { createProduct, deleteProduct, editProduct } from "../controllers/product.controller";
const crudProductRouter = Router();
crudProductRouter.post('/', celebrate(createProductSchema), createProduct);
crudProductRouter.delete('/:id', celebrate(getProductSchema), deleteProduct);
crudProductRouter.patch('/:id', celebrate(createProductSchema), editProduct);
export default crudProductRouter;
//# sourceMappingURL=admin.product.js.map
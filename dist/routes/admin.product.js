"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = require("express");
const _celebrate = require("celebrate");
const _productschema = require("../middlewares/celebrate/product.schema");
const _productcontroller = require("../controllers/product.controller");
// import { getAllProducts, getSingleProduct } from "../controllers/product.controller";
const crudProductRouter = (0, _express.Router)();
crudProductRouter.post('/', (0, _celebrate.celebrate)(_productschema.createProductSchema), _productcontroller.createProduct);
crudProductRouter.delete('/:id', (0, _celebrate.celebrate)(_productschema.getProductSchema), _productcontroller.deleteProduct);
crudProductRouter.patch('/:id', (0, _celebrate.celebrate)(_productschema.createProductSchema), _productcontroller.editProduct);
const _default = crudProductRouter;

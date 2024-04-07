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
const productRouter = (0, _express.Router)();
productRouter.get('/', (0, _celebrate.celebrate)(_productschema.getProductSchema), _productcontroller.getAllProducts);
productRouter.get('/:id', (0, _celebrate.celebrate)(_productschema.getProductSchema), _productcontroller.getSingleProduct);
productRouter.patch('/rate/:id', (0, _celebrate.celebrate)(_productschema.rateProductSchema), _productcontroller.rateProduct);
const _default = productRouter;

import { Router } from "express";
import express from 'express';
import crudProductRouter from "./admin.product";
const adminRouter = Router();
const logPath = (req, res, next) => {
    console.log(req.url);
    console.log(req.method);
    next();
};
adminRouter.use(express.json());
adminRouter.use(logPath);
adminRouter.use('/product', crudProductRouter);
export default adminRouter;
//# sourceMappingURL=admin.js.map
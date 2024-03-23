import { Router } from "express";
import express from 'express';
import productRouter from "./product";
import loginRouter from "./login";
import registerRouter from "./register";
import orderRouter from "./order";
const indexRouter = Router();
const logPath = (req, res, next) => {
    console.log(req.url);
    console.log(req.method);
    next();
};
indexRouter.use(express.json());
indexRouter.use(logPath);
indexRouter.use('/product', productRouter);
indexRouter.use('/login', loginRouter);
indexRouter.use('/order', orderRouter);
indexRouter.use('/register', registerRouter);
export default indexRouter;
//# sourceMappingURL=index.js.map
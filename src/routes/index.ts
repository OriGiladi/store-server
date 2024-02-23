import { Router, Request, Response, NextFunction } from "express";
import express, { Application } from 'express';
import productRouter from "./product";
import loginRouter from "./login";
import registerRouter from "./register";
import orderRouter from "./order";

const indexRouter: Router = Router();

const logPath = (req: Request, res: Response, next: NextFunction) => { // Middleware to log every requests url path
    console.log(req.url)
    console.log(req.method)
    next()
}
indexRouter.use(express.json())
indexRouter.use(logPath)

indexRouter.use('/product', productRouter)
indexRouter.use('/login', loginRouter)
indexRouter.use('/order', orderRouter)

indexRouter.use('/register', registerRouter)

export default indexRouter;
import { Router, Request, Response, NextFunction } from "express";
import express, { Application } from 'express';
import crudProductRouter from "./admin.product";


const adminRouter: Router = Router();

const logPath = (req: Request, res: Response, next: NextFunction) => { // Middleware to log every requests url path
    console.log(req.url)
    console.log(req.method)
    next()
}
adminRouter.use(express.json())
adminRouter.use(logPath)

adminRouter.use('/product', crudProductRouter)


export default adminRouter;
import { Router } from "express";
import { captureOrder, createOrder } from "../controllers/paypal.controller";

const paymentRouter: Router = Router();
paymentRouter.post('/create-order', createOrder)
paymentRouter.post('/capture-order', captureOrder)

export default paymentRouter;
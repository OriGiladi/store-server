import { OrderModel } from "../models/order.model";
import { ProductModel } from "../models/product.model";
import { UserModel } from "../models/user.model";
import { Request, Response, NextFunction} from "express";


export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { order, user, createdAt } = req.body
    let isUserIdValid = true;
    let isProductIdValid = true;
    const searchedUser = await UserModel.findOne({ _id: user });  
        if(!searchedUser) isUserIdValid = false;
    for (let i = 0; i < order.length; i++) {
        const product = await ProductModel.findOne({ _id:  order[i].product })
        if(!product) isProductIdValid = false;
    }
    if(!isUserIdValid || !isProductIdValid) return res.send({message: 'Invalid user or product id!'})
    OrderModel.create({ order, user, createdAt})
    .then(() => {
        return res.send({message: 'Successful!'});
    })
    .catch((error) => {
        console.log(error)
        next(error)
    });
}

export const getOrdersOfUser = (req: Request, res: Response, next: NextFunction) => { 
    const { user } = req.params
    OrderModel.find({ user })
    .then((orders) => {
    res.send({data: orders})
    })
    .catch((error) => next(error));
}
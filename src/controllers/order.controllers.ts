import { OrderModel } from "../models/order.model";
import { ProductModel } from "../models/product.model";
import { UserModel } from "../models/user.model";
import { Request, Response, NextFunction} from "express";

// export const getAllProducts= (req: Request, res: Response, next: NextFunction) => { 
//     ProductModel.find({_id: id})
//     .then((products) => {
//     res.send({data: products})
//     })
//     .catch((error) => next(error));
// }

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { order } = req.body
    let isUserIdValid = true;
    let isProductIdValid = true;
    for (let i = 0; i < order.length; i++) {
        const user = await UserModel.findOne({ _id: order[i].user });  
        if(!user) isUserIdValid = false;
        const product = await ProductModel.findOne({ _id:  order[i].product })
        if(!product) isProductIdValid = false;
    }
    if(!isUserIdValid || !isProductIdValid) return res.send({message: 'Invalid user or product id!'})
    OrderModel.create({ order})
    .then(() => {
        return res.send({message: 'Successful!'});
    })
    .catch((error) => {
        console.log(error)
        next(error)
    });
}
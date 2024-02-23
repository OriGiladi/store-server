import { ProductModel } from "../models/product.model";
import { Request, Response, NextFunction} from "express";

export const getAllProducts= (req: Request, res: Response, next: NextFunction) => { 
    ProductModel.find({})
    .then((products) => {
    res.send({data: products})
    })
    .catch((error) => next(error));
}

export const getSingleProduct= (req: Request, res: Response, next: NextFunction) => { 
    const {id} = req.params
    ProductModel.findById(id)
    .then((product) => {
    res.send({data: product})
    })
    .catch((error) => next(error));
}  

export const rateProduct = (req: Request, res: Response, next: NextFunction) => {
    const { ratings } = req.body
    const { id } = req.params
    const filter = {_id: id}
    const changes = {
        $set: {
            ratings: ratings,
        },
    };
    ProductModel.updateOne(filter, changes)
    .then((product) => {
        return res.send({message: 'Succesful!', product: product});
    })
    .catch((error) => {
        console.log(error)
        next(error)
    });
}

export const createProduct = (req: Request, res: Response, next: NextFunction) => {
    const {name, price, description, image} = req.body
    ProductModel.create({name, price, description, image })
    .then((product) => {
        return res.send({message: 'Succesful!'});
    })
    .catch((error) => {
        console.log(error)
        next(error)
    });
}

export const deleteProduct = (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params

    ProductModel.findByIdAndDelete(id)
    .then((product) => {
    res.send({data: product})
    })
    .catch((error) => next(error));
}

export const editProduct = (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params
    const filter = {_id: id}
    const {name, price, description, image} = req.body

    const changes = {
        $set: {
            name: name,
            price: price,
            description: description,
            image: image
        },
    };

    ProductModel.updateOne(filter, changes)
    .then((product) => {
        return res.send({message: 'Succesful!'});
    })
    .catch((error) => {
        console.log(error)
        next(error)
    });
}
import { ProductModel } from "../models/product.model";
export const getAllProducts = (req, res, next) => {
    ProductModel.find({})
        .then((products) => {
        res.send({ data: products });
    })
        .catch((error) => next(error));
};
export const getSingleProduct = (req, res, next) => {
    const { id } = req.params;
    ProductModel.findById(id)
        .then((product) => {
        res.send({ data: product });
    })
        .catch((error) => next(error));
};
export const rateProduct = (req, res, next) => {
    const { ratings } = req.body;
    const { id } = req.params;
    const filter = { _id: id };
    const changes = {
        $set: {
            ratings: ratings,
        },
    };
    ProductModel.updateOne(filter, changes)
        .then((product) => {
        return res.send({ message: 'Succesfully!', product: product });
    })
        .catch((error) => {
        console.log(error);
        next(error);
    });
};
export const createProduct = (req, res, next) => {
    const { name, price, description, image } = req.body;
    ProductModel.create({ name, price, description, image })
        .then(() => {
        return res.send({ message: 'Succesful!' });
    })
        .catch((error) => {
        console.log(error);
        next(error);
    });
};
export const deleteProduct = (req, res, next) => {
    const { id } = req.params;
    ProductModel.findByIdAndDelete(id)
        .then((product) => {
        res.send({ data: product });
    })
        .catch((error) => next(error));
};
export const editProduct = (req, res, next) => {
    const { id } = req.params;
    const filter = { _id: id };
    const { name, price, description, image } = req.body;
    const changes = {
        $set: {
            name: name,
            price: price,
            description: description,
            image: image
        },
    };
    ProductModel.updateOne(filter, changes)
        .then(() => {
        return res.send({ message: 'Succesfully!' });
    })
        .catch((error) => {
        console.log(error);
        next(error);
    });
};
//# sourceMappingURL=product.controller.js.map
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getAllProducts: function() {
        return getAllProducts;
    },
    getSingleProduct: function() {
        return getSingleProduct;
    },
    rateProduct: function() {
        return rateProduct;
    },
    createProduct: function() {
        return createProduct;
    },
    deleteProduct: function() {
        return deleteProduct;
    },
    editProduct: function() {
        return editProduct;
    }
});
const _productmodel = require("../models/product.model");
const getAllProducts = (req, res, next)=>{
    _productmodel.ProductModel.find({}).then((products)=>{
        res.send({
            data: products
        });
    }).catch((error)=>next(error));
};
const getSingleProduct = (req, res, next)=>{
    const { id } = req.params;
    _productmodel.ProductModel.findById(id).then((product)=>{
        res.send({
            data: product
        });
    }).catch((error)=>next(error));
};
const rateProduct = (req, res, next)=>{
    const { ratings } = req.body;
    const { id } = req.params;
    const filter = {
        _id: id
    };
    const changes = {
        $set: {
            ratings: ratings
        }
    };
    _productmodel.ProductModel.updateOne(filter, changes).then((product)=>{
        return res.send({
            message: 'Succesfully!',
            product: product
        });
    }).catch((error)=>{
        console.log(error);
        next(error);
    });
};
const createProduct = (req, res, next)=>{
    const { name, price, description, image } = req.body;
    _productmodel.ProductModel.create({
        name,
        price,
        description,
        image
    }).then(()=>{
        return res.send({
            message: 'Succesful!'
        });
    }).catch((error)=>{
        console.log(error);
        next(error);
    });
};
const deleteProduct = (req, res, next)=>{
    const { id } = req.params;
    _productmodel.ProductModel.findByIdAndDelete(id).then((product)=>{
        res.send({
            data: product
        });
    }).catch((error)=>next(error));
};
const editProduct = (req, res, next)=>{
    const { id } = req.params;
    const filter = {
        _id: id
    };
    const { name, price, description, image } = req.body;
    const changes = {
        $set: {
            name: name,
            price: price,
            description: description,
            image: image
        }
    };
    _productmodel.ProductModel.updateOne(filter, changes).then(()=>{
        return res.send({
            message: 'Succesfully!'
        });
    }).catch((error)=>{
        console.log(error);
        next(error);
    });
};

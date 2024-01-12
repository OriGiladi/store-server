import mongoose, { Document, Schema } from "mongoose";

export interface Product extends Document {
    name: string,
    price: string,
    description: string,
    image: string
}


const ProductSchema = new Schema<Product>({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        unique: false
    },
    price: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 30,
        unique: false
    },
    description: {
        type: String,
        minlength: 1,
        maxlength: 30,
        unique: false
    },
    image: {
        type: String,
        minlength: 2,
        unique: false
    },
});

export const ProductModel = mongoose.model<Product>('Product', ProductSchema);


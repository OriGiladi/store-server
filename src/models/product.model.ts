import mongoose, { Document, Schema } from "mongoose";

export interface Product extends Document {
    name: string,
    price: string,
    description: string,
    image: string,
    ratings: {  
        user: mongoose.Types.ObjectId,
        rating: number
    } []
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
        maxlength: 400,
        unique: false
    },
    image: {
        type: String,
        minlength: 2,
        unique: false
    },
    ratings: [
        {
            user: { type: Schema.Types.ObjectId, ref: 'User' }, 
            rating: { type: Number, min: 1, max: 5 } 
        }
    ],
});

export const ProductModel = mongoose.model<Product>('Product', ProductSchema);


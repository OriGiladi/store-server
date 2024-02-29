import mongoose, { Document, Schema } from "mongoose";

export interface Order extends Document {
    order: {
        product: mongoose.Types.ObjectId;
        quantity: number,
        
    } [],
    user: mongoose.Types.ObjectId;
    createdAt: Date
}

const OrderSchema = new Schema<Order>({
    order: [{
        product: { 
            type: Schema.Types.ObjectId, 
            ref: 'Product' 
        },
        quantity: {
            type: Number,
            required: true,
            unique: false,
            minlength: 1,
            maxlength: 4
        }, 
    }],
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    createdAt: {
        type: Date,
        required: true,
        unique: false,
    }
});

export const OrderModel = mongoose.model<Order>('Order', OrderSchema);


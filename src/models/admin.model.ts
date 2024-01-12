import mongoose, { Document, Schema } from "mongoose";

export interface Admin extends Document {
    userId: string
}


const AdminSchema = new Schema<Admin>({
    userId: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 70,
        unique: true
    }
});

export const AdminModel = mongoose.model<Admin>('Admin', AdminSchema);


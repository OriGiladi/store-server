import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    image: string;
}


const UserSchema = new Schema<User>({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        unique: false
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        unique: false
    },
    email: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    }
});

export const UserModel = mongoose.model<User>('User', UserSchema);


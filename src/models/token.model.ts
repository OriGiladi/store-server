import mongoose, { Document, Schema } from "mongoose";

export interface Token extends Document {
    refreshToken: string;
}


const TokenSchema = new Schema<Token>({
    refreshToken: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 70,
        unique: true
    }
});

export const TokenModel = mongoose.model<Token>('Token', TokenSchema);


import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
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
export const UserModel = mongoose.model('User', UserSchema);
//# sourceMappingURL=user.model.js.map
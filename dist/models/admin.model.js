import mongoose, { Schema } from "mongoose";
const AdminSchema = new Schema({
    userId: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 70,
        unique: true
    }
});
export const AdminModel = mongoose.model('Admin', AdminSchema);
//# sourceMappingURL=admin.model.js.map
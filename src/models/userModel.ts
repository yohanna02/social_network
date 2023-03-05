import mongoose from "mongoose";
import { UserI } from "../interface/userInterface";

export interface UserModel extends UserI, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<UserI>({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

export default mongoose.model<UserModel>("user", userSchema);
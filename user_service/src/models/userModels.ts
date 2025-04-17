import mongoose from "mongoose";
import { User } from "../types/UserTypes";
import { Schema } from "mongoose";

const UserSchema = new Schema<User>({
    name: {
        type: String,
        required: true
    },
    // lastName: {
    //     type: String,
    //     required: true
    // },
    // userName: {
    //     type: String,
    //     required: true
    // },
    // email: {
    //     type: String,
    //     required: true
    // },
    // fecha_nacimiento: {
    //     type: Number,
    //     required: true
    // },
    // password: {
    //     type: String,
    //     required: true
    // },
    // avatar: {
    //     type: String,
    //     required: false
    // }

})
export const UserModel = mongoose.model<User>("User", UserSchema)
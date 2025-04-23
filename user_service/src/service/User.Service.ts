import { UserModel } from "../models/userModels";
import { IUserRepository, User } from "../types/UserTypes";
import { hashPassword } from "../utils/hash-pas";
import { Types } from "mongoose";
import mongoose from "mongoose";
export class UserService implements IUserRepository {

    async createUser(user: User): Promise<User> {
        const hashedPassword = await hashPassword(user.password);
        const userToSave = new UserModel({
            ...user,
            password: hashedPassword,
        });

        return await userToSave.save();
    }

    async findByID(id: string | Types.ObjectId): Promise<User | null> {
        return await UserModel.findById(id).exec();
    }
    async findByEmail(email: string): Promise<User | null> {
        return await UserModel.findOne({ email });
    }
    async findByUserName(userName: string): Promise<User | null> {
        return await UserModel.findOne({ userName });
    }

    async deleteUser(id: string): Promise<void> {
        await UserModel.findByIdAndDelete(id);
    }
}
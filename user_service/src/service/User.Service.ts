import { UserModel } from "../models/userModels";
import { IUserRepository, User } from "../types/UserTypes";
import { hashPassword } from "../utils/hash-pas";
export class UserService implements IUserRepository {

    async createUser(user: User): Promise<User> {
        const hashedPassword = await hashPassword(user.password);
        const userToSave = new UserModel({
            ...user,
            password: hashedPassword,
        });

        return await userToSave.save();
    }

    async findUserById(id: string): Promise<User | null> {
        return await UserModel.findById(id).exec();
    }

    async deleteUser(id: string): Promise<void> {
        await UserModel.findByIdAndDelete(id);
    }
}
import { UserModel } from "../models/userModels";
import { IUserRepository, User } from "../types/UserTypes";

const db = ['hola']
export class UserService implements IUserRepository {
    // async createUser(user: User): Promise<User> {
    //     const newUser = new UserModel(user);
    //     return await newUser.save();
    // }

    async findUser(): Promise<User[]> {
        return db as unknown as User[]; // Cast to User[] to match return type
    }

    // async findUserById(id: string): Promise<User | null> {
    //     return await UserModel.findById(id).exec();
    // }

    // async deleteUser(id: string): Promise<void> {
    //     await UserModel.findByIdAndDelete(id);
    // }
}
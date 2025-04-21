import { authModel } from "../models/user.auth";
import { AuthUser, IAuthRepository } from "../types/auth-types";
import bcrypt from "bcrypt";
import { hashPassword } from "../utils/hash-pas";

export class AuthService implements IAuthRepository {
    async createUser(user: AuthUser): Promise<AuthUser> {
        const hashedPassword = await hashPassword(user.password);
        const authSave = new authModel({
            ...user,
            password: hashedPassword,
        });
        await authSave.save();
        return authSave;
    }
    async findUser(email: string, password: string): Promise<AuthUser | null> {
        const user = await authModel.findOne({ email });
        return user
    }

    async logout(): Promise<void> {

    }

}
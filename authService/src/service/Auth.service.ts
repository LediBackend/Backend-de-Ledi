import { authModel } from "../models/user.auth";
import { IAuthRepository } from "../types/auth-types";
import bcrypt from "bcrypt";
import { hashPassword } from "../utils/hash-pas";
import { save_user } from "../utils/getUserDates";

// export class AuthService implements IAuthRepository {

//     async findEmail(email: string): Promise<AuthUser | null> {
//         const user = await authModel.findOne({ email });
//         return user
//     }

//     async login(email: string, password: string): Promise<void> | null {
//         const user = save_user(email, password)
//         return user
//     }

// }
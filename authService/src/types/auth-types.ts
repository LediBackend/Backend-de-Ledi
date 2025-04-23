import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export interface AuthUser {
    userName: string,
    name: string,
    lastName: string,
    email: string,
    date_user: Date,
    rol: string,
    avatar?: string,
    preference?: {
        category: string[],
        lenguaje: string
    }

}

export interface IAuthRepository {
    // createUser(user: AuthUser): Promise<AuthUser>;
    // findUser(idUser: String): Promise<AuthUser | null>;

}
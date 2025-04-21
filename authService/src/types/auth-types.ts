import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export interface AuthUser {
    id(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, id: any): unknown;
    email: string;
    password: string;
}
export interface IAuthRepository {
    createUser(user: AuthUser): Promise<AuthUser>;
    findUser(email: string, password: string): Promise<AuthUser | null>;
    logout(): Promise<void>;

}
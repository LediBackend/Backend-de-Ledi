export interface AuthUser {
    email: string;
    password: string;
}
export interface IAuthRepository {
    createUser(user: AuthUser): Promise<AuthUser>;
    findUser(email: string): Promise<AuthUser | null>;
}
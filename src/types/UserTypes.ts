//dates of user
export interface User {
    userName: string,
    name: string,
    lastName: string,
    email: string,
    password: string,
    date_user: Date,
    rol?: string,
    avatar?: string,
    preference?: {
        category: string[],
        lenguaje: string
    }
}

// funciones del usuario
export interface IUserRepository {
    // findUser(): Promise<User[]>
    createUser(user: User): Promise<User>;

    findByID(id: any): Promise<User | null>

    findByEmail(email: string): Promise<User | null>
    findByUserName(user: string): Promise<User | null>
    // updateUSer(id: string, User: Partial<User>): Promise<User | null>;
    // deleteUser(id: string): Promise<void>
}
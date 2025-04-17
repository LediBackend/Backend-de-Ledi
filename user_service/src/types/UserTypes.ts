//dates of user
export interface User {
    id: string,
    // userName: string,
    name: string,
    // lastName: string,
    // email: string,
    // fecha_nacimiento: number,
    // password: string,
    // avatar?: string
}

// funciones del usuario
export interface IUserRepository {
    // createUser(user: User): Promise<User>,
    findUser(): Promise<User[]>
    // findByID(id: string): Promise<User | null>
    // updateUSer(id: string, User: Partial<User>): Promise<User | null>;
    // deleteUser(id: string): Promise<void>
}
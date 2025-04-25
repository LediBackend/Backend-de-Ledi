import { genSalt, hash } from "bcrypt";


export async function hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10); // Número de rondas
    const hashed = await hash(password, salt);
    return hashed;
}

import { Request, Response } from "express";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}
import { AuthService } from "../service/Auth.service";
import { generarJWT } from "../helpers/generJWT";

const authService = new AuthService();

declare module "express-session" {
    interface SessionData {
        token?: any;
    }
}

export const postAuth = async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const result = await authService.createUser(user);
        res.status(201).json({ msg: 'User created successfully', result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error', error: (error as Error).message });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const result = await authService.findUser(email, password);

        if (!result) {
            res.status(401).json({ msg: 'Credenciales incorrectas' });
        } else {
            console.log(result.id)
            const id = result.id
            const token = await generarJWT(id);
            req.session.token = token;
            console.log(token)
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                maxAge: 3600000,
            });
            console.log(res.cookie)
            res.status(200).json({
                msg: 'Authentication successful',
                token,
            });
        }


    } catch (error) {
        console.error("Error en /login:", error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
}

export const getMeCtrl = async (req: Request, res: Response): Promise<void> => {
    try {

        res.status(200).json({ msg: 'hola' });

    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }

}
export const logout = async (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "error closing session" });
        }
        res.clearCookie("connect.sid");
        res.clearCookie('token');

        return res.json({ message: "Session closed successfully" });
    });
}
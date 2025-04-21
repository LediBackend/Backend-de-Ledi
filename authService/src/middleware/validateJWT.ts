import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'tu_clave_secreta'; // Debes almacenar esto de manera segura

// Middleware para validar JWT
export const validateJWT = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token || typeof token !== 'string') {
        res.status(403).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(token as string, SECRET_KEY, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: 'Token inválido' });
        }

        req.user = decoded;
        next();
    });
};


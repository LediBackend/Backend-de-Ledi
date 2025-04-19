import { body, validationResult, ValidationChain } from 'express-validator';

export const validateUser: ValidationChain[] = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Debe ser un correo electrónico válido'),
    body('password')
        .trim()
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres')
];


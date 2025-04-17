import express from 'express';
import { forwardRequest } from '../utils/forwardRequest';

export const gatewayRouter = express.Router();

// Por ejemplo, redirigir a un microservicio de usuarios
gatewayRouter.use('/users', (req, res) => {
    forwardRequest(req, res, 'http://localhost:3400');
});

// Redirigir a un microservicio de productos
gatewayRouter.use('/products', (req, res) => {
    forwardRequest(req, res, 'http://localhost:4002');
});

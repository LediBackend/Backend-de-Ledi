import express from 'express';
import { forwardRequest } from '../utils/forwardRequest';

export const gatewayRouter = express.Router();

//  registro
gatewayRouter.use('/register', (req, res) => {
    forwardRequest(req, res, 'http://localhost:3402');
});
//login
gatewayRouter.use('/login', (req, res) => {
    forwardRequest(req, res, 'http://localhost:3403');
});

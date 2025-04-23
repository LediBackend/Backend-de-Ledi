import express from 'express';
import { forwardRequest } from '../utils/forwardRequest';
import { validateJWT } from '../middleware/validateJWT';

export const gatewayRouter = express.Router();

//  registro
gatewayRouter.use('/register', (req, res) => {
    forwardRequest(req, res, 'http://localhost:3402');
});
//login
gatewayRouter.use('/login', (req, res) => {
    forwardRequest(req, res, 'http://localhost:3403');
});
//logout
gatewayRouter.use('/logout', (req, res) => {
    forwardRequest(req, res, 'http://localhost:3403');
});
// get user
gatewayRouter.use('/getUser', validateJWT, (req, res) => {
    forwardRequest(req, res, 'http://localhost:3403');
});


import express from 'express';
import { forwardRequest } from '../utils/forwardRequest';
import { forwardPostRequest } from '../utils/forwardPostRequest';

export const gatewayRouter = express.Router();

// Por ejemplo, redirigir a un microservicio de usuarios
gatewayRouter.use('/register', (req, res) => {
    forwardRequest(req, res, 'http://localhost:3402');
});

// Redirigir a un microservicio de login
gatewayRouter.use('/login', (req, res) => {
    forwardRequest(req, res, 'http://localhost:3403');
});
// Redirigir a un microservicio de obtener usuario
gatewayRouter.use('/getUser',
    (req, res) => {
        forwardRequest(req, res, 'http://localhost:3403');
    });
// Redirigir a un microservicio de logout
gatewayRouter.use('/logout',
    (req, res) => {
        forwardRequest(req, res, 'http://localhost:3403');
    });

// Redirigir a un microservicio de libros para obtener todos los libros
gatewayRouter.use("/Books/getBooks", (req, res) => {
    forwardRequest(req, res, "http://localhost:4668");
});
// Redirigir a un microservicio de libros para obtener un libro por ID
gatewayRouter.use("/Books/:id", (req, res) => {
    forwardRequest(req, res, "http://localhost:4668");
})
//create a book 
gatewayRouter.use("/Books/create", (req, res) => {
    forwardPostRequest(req, res, "http://localhost:4668");
});
gatewayRouter.use("/Books/delete/:id", (req, res) => {
    forwardRequest(req, res, "http://localhost:4668");
})
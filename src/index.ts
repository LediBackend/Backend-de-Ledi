import express from 'express';
import cors from 'cors';
import { gatewayRouter } from './routes/gateway.routes';
import { logger } from './middleware/logger';
import session from 'express-session';

const app = express();
const PORT = 3000;

app.use(cors({
    credentials: true,
}));
app.use(express.json());
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: "mi_clave_secreta",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 3600000, // 1 hora
            httpOnly: true,
            secure: false, // true si usás HTTPS
        },
    })
);
app.use('/api', gatewayRouter);

app.listen(PORT, () => {
    console.log(`API Gateway running on http://localhost:${PORT}`);
});

import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import connectDB from './db/database'
import * as dotenv from "dotenv";
dotenv.config();
import ENV from "./config/env";
import { authRoutes } from "./routes/auth.routes";
const app: Application = express();
connectDB()
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

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
app.use(cors({
  origin: 'http://localhost:3000', // o tu frontend
  credentials: true
}));
app.use(authRoutes)

app.listen(Number(ENV.PORT), () => {
  console.log(` Servidor corriendo en el puerto ${ENV.PORT}`);
});

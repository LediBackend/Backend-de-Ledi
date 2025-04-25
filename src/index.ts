import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from './db/db'
import * as dotenv from "dotenv";
dotenv.config();
import ENV from "./config/env";
// import separatorConsole from "./utils/consoleSeparator";

import { userRoutes } from "./routes/userService.routes"
const app = express();
connectDB()
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(userRoutes)


app.listen(Number(ENV.PORT), () => {
  console.log(` Servidor corriendo en el puerto ${ENV.PORT}`);
});

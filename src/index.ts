import cors from "cors";
import morgan from "morgan";
import express from "express";
import fs from "fs";
import path from "path";
import ENV from "./config/env";
import routerBooks from "./routers/books.route";
import routerContentBooks from "./routers/contentBook.route";
import connections from "./db/conecctions";
import chalk from "chalk";

const app = express();

const fileUpload = path.join(__dirname, "./uploads");
if (!fs.existsSync(fileUpload)) {
  fs.mkdirSync(fileUpload, { recursive: true });
}

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("./src/uploads"));
app.use(routerBooks);
app.use(routerContentBooks);

app.listen(ENV.PORT, async () => {
  await connections();
  console.log();
  console.log(chalk.green(`server is Running on http://localhost:${ENV.PORT}`));
  console.log();
});

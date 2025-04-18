import express from "express";
import cors from "cors";
import morgan from "morgan";
import ENV from "../conf/env";
import router from "./routers/recommendations.route";
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(router);

app.listen(ENV.PORT, () => {
  console.log(`server activated in http://localhost:${ENV.PORT}`);
});

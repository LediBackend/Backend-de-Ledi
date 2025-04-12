import express from "express";
import cors from "cors";
import morgan from "morgan";

import ENV from "./config/env";
import separatorConsole from "./utils/consoleSeparator";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.listen(ENV.PORT, () => {
  separatorConsole(`server running on port: ${ENV.PORT}`);
});

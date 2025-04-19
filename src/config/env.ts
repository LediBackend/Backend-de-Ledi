import * as dotenv from "dotenv";
dotenv.config();

type Env = {
  PORT: string | undefined;
  URL_DB: string | undefined;
  CLOUD_NAME: string | undefined;
  API_KEY: string | undefined;
  API_SECRET: string | undefined;
};

const ENV: Env = {
  PORT: process.env.PORT,
  URL_DB: process.env.URL_DB,
  CLOUD_NAME: process.env.CLOUD_NAME,
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET,
};

export default ENV;

import mongoose, { Connection } from "mongoose";
import ENV from "../config/env";
import chalk from "chalk";

const url: string | undefined = ENV.URL_DB;

const connections = async (): Promise<Connection> => {
  if (!url) {
    throw new Error("Database URL is not defined in the environment variables.");
  }

  try {
    await mongoose.connect(url, { serverSelectionTimeoutMS: 30000, connectTimeoutMS: 30000 });

    console.log();
    console.log(chalk.magenta("database successfully connected"));
    console.log();

    return mongoose.connection;
  } catch (error) {
    console.log();
    console.error(chalk.red("Error en la conexión de la base de datos"));
    console.log();
    console.log(error);
    console.log();

    throw error;
  }
};

export default connections;

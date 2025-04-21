import { v2 as cloudinary } from "cloudinary";
import ENV from "../config/env";
import chalk from "chalk";

cloudinary.config({
  cloud_name: ENV.CLOUD_NAME,
  api_key: ENV.API_KEY,
  api_secret: ENV.API_SECRET,
});

export async function eliminarImagen(publicId: string) {
  try {
    const resultado = await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log();
    console.error(chalk.red("Error en la utilidad: eliminarImagen"));
    console.log();
    console.log(error);
    console.log();
  }
}

import ENV from "../config/env";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: ENV.CLOUD_NAME,
  api_key: ENV.API_KEY,
  api_secret: ENV.API_SECRET, // Click 'View API Keys' above to copy your API secret
});

interface UploadResult {
  url: string; // URL del archivo subido
  public_id: string; // ID público del archivo subido
}

const uploadFile = async (filePath: string): Promise<UploadResult> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "books", // Carpeta en Cloudinary para organizar los archivos (opcional)
      resource_type: "raw", // Especifica "raw" para subir archivos como .pdf, .txt, .docx, etc.
    });
    return result;
  } catch (error) {
    console.error("Error al subir el archivo a Cloudinary:", error);
    throw error;
  }
};

export default uploadFile;

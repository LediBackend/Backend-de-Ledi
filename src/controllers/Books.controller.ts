import { Request, Response } from "express";
import Book from "../models/books.model";
import chalk from "chalk";
import fs from "fs";
import FormData from "form-data";
import axios from "axios";
import Pages from "../models/pages.model";
import uploadFile from "../utils/upload.asset";

const getBooks: (a: Request, b: Response) => void = async (req, res) => {
  try {
    const result = await Book.find();

    if (result.length === 0) res.status(404).json({ msg: "no hay libros para mostrar " });

    res.status(200).json({ result });
  } catch (error) {
    console.log();
    console.error(chalk.red("Error en el el controlador: getBooks"));
    console.log();
    console.log(error);
    console.log();
  }
};

const createBooks: (a: Request, b: Response) => void = async (req, res) => {
  try {
    const { title, author, descriptions, category, available } = req.body;

    const files = req.files?.file;
    if (!files) return res.status(400).json({ msg: "Falta cargar el archivo necesario." });
    if (
      !files ||
      (Array.isArray(files) ? files.length === 0 : files.size === 0) ||
      (Array.isArray(files) ? !files[0].tempFilePath : !files.tempFilePath)
    ) {
      return res.status(400).json({ error: "El archivo está vacío o no se subió correctamente" });
    }

    const formData = new FormData();

    if (!Array.isArray(files) && files.tempFilePath) {
      formData.append("file", fs.createReadStream(files.tempFilePath), {
        filename: files.name,

        contentType: files.mimetype,
      });
    } else if (Array.isArray(files) && files[0]?.tempFilePath) {
      formData.append("file", fs.createReadStream(files[0].tempFilePath), {
        filename: files[0].name,

        contentType: files[0].mimetype,
      });
    }

    interface ResponseData {
      pages: string[][];
    }

    const response = await axios.post<ResponseData>("http://localhost:5000/process", formData, {
      headers: formData.getHeaders(),
    });

    const containerText = response.data.pages;

    const textoArray = containerText.map((pagina, indice) => {
      return `Página ${indice + 1}:\n${pagina.join(" ")}`;
    });

    const filePath = Array.isArray(files) ? files[0]?.tempFilePath : files?.tempFilePath;
    if (!filePath) {
      throw new Error("No se pudo determinar el archivo temporal para subir.");
    }

    const result = await uploadFile(filePath);

    const public_id = result.public_id;
    const secure_url = result.url; // Adjust based on the actual property name in the response

    const savedPages = await Promise.all(
      textoArray.map(async (content) => {
        const newPage = new Pages({ content });
        const savedPage = await newPage.save();
        return savedPage;
      })
    );

    const newBook = new Book({
      title,
      author: "645c16a5b0d2c3e1a3f7e93b",
      descriptions,
      category,
      available,
      url: secure_url,
      idDocument: public_id,
      pages: savedPages.map((page) => page._id),
    });

    await newBook.save();

    if (!Array.isArray(files) && files?.tempFilePath) {
      fs.unlink(files.tempFilePath, (err) => {
        if (err) console.error("Error al eliminar el archivo temporal:", err);
      });
    } else if (Array.isArray(files) && files[0]?.tempFilePath) {
      fs.unlink(files[0].tempFilePath, (err) => {
        if (err) console.error("Error al eliminar el archivo temporal:", err);
      });
    }

    res.status(200).json({ msg: "Libro publicado con éxito:" });
  } catch (error) {
    console.error("Error creating or saving the book:", error);
  }
};

const getBooksById: (a: Request, b: Response) => void = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id).populate({
      path: "pages",
      select: "-__v -_id",
    });
    if (!book) {
      console.log("Libro no encontrado.");
      return null;
    }
    console.log("Libro con sus páginas:", book);
    res.status(200).json({ book });
  } catch (error) {
    console.error("Error al obtener el libro con sus páginas:", error);
    throw error; // Opcional: lanzar el error para manejarlo en otro lugar
  }
};

export { getBooks, createBooks, getBooksById };

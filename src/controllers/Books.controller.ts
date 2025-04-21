import { Request, Response } from "express";
import Book from "../models/books.model";
import chalk from "chalk";
import path from "path";
import { UploadedFile } from "express-fileupload";
import { PropCreateBooks, Result } from "../types/typesBooks";
import ContentBook from "../models/content.books.model";
import { subirImagen } from "../utils/uploadCorverImage";
import fs from "fs";

const getBooks: (a: Request, b: Response) => void = async (req, res) => {
  try {
    const result = await Book.find();

    if (result.length === 0) return res.status(404).json({ msg: "no hay libros para mostrar " });

    res.status(200).json(result);
  } catch (error) {
    console.log();
    console.error(chalk.red("Error en el controlador: getBooks"));
    console.log();
    console.log(error);
    console.log();
  }
};

const createBooks: (a: Request, b: Response) => void = async (req, res) => {
  try {
    const { title, author, descriptions, category, available }: PropCreateBooks = req.body;

    const file: UploadedFile | UploadedFile[] | undefined = req.files?.file;
    const img: UploadedFile | UploadedFile[] | undefined = req.files?.img;

    if (Array.isArray(file)) return res.status(400).json({ msg: "Solo se permite subir un archivo " });
    if (Array.isArray(img)) return res.status(400).json({ msg: "Solo se permite subir una imagen de portada" });

    if (!file || undefined) return res.status(404).json({ msg: "se requiere un documento conteniendo el Libro a Publicar" });
    if (!img || undefined) return res.status(404).json({ msg: "se requiere Imagen de Portada Para poder publicar el libro " });

    const newRoute = path.join(__dirname, "../uploads", file.name);

    await file.mv(newRoute);

    const newContentBook = new ContentBook({ path: newRoute });

    await newContentBook.save();

    const result = await subirImagen(img.tempFilePath);
    const url = result?.secure_url;
    const id = result?.public_id;

    const newBook = new Book({
      title,
      author,
      descriptions,
      category,
      available,
      idUser: "680325b80b5fa8b0d2e058a1",
      pathBooks: newContentBook._id,
      coverImage: { url_secura: url, id_image: id },
    });

    await newBook.save();

    fs.unlinkSync(img.tempFilePath);

    res.status(200).json({ msg: "libro subido correctamente" });
  } catch (error) {
    console.log();
    console.error(chalk.red("Error en el controlador: createBookss"));
    console.log();
    console.log(error);
    console.log();
  }
};

const getBooksById: (a: Request, b: Response) => void = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id).populate({ path: "pathBooks", select: "-__v -_id" }).select("-__v");

    if (!book) return res.status(404).json({ msg: "El libro no existe." });

    res.status(200).json(book);
  } catch (error) {
    console.log();
    console.error(chalk.red("Error en el controlador: getBooksById"));
    console.log();
    console.log(error);
    console.log();
  }
};

const deleteBooks: (a: Request, b: Response) => void = async (req, res) => {
  try {
    const id: string = req.params.id;

    const book = await Book.findById(id);

    if (!book) return res.status(404).json({ msg: "El libro no existe." });

    await ContentBook.findByIdAndDelete(book.pathBooks);

    await Book.findByIdAndDelete(id);

    res.status(200).json({ msg: "Se elimino correctamente el libro " });
  } catch (error) {
    console.log();
    console.error(chalk.red("Error en el controlador: deleteBooks"));
    console.log();
    console.log(error);
    console.log();
  }
};

// const updateBooks: (a: Request, b: Response) => void = async (req, res) => {
//   try {
//     const { title, author, descriptions, category, available }: PropCreateBooks = req.body;

//     const file: UploadedFile | UploadedFile[] | undefined = req.files?.file;

//     if (Array.isArray(file)) return res.status(400).json({ msg: "Solo se permite subir un archivo a la vez." });

//     if (!file) return res.status(404).json({ msg: "no hay archivo subido" });

//     const newRoute = path.join(__dirname, "../uploads", file.name);

//     await file.mv(newRoute);

//     const newContainerBook = new ContainerBook({ Path: newRoute });

//     await newContainerBook.save();

//     const newBook = new Book({
//       title,
//       author,
//       descriptions,
//       category,
//       available,
//       idUser: "680325b80b5fa8b0d2e058a1",
//       pathBooks: newContainerBook._id,
//     });

//     await newBook.save();

//     res.status(200).json({ msg: "libro subido correctamente" });
//   } catch (error) {
//     console.log();
//     console.error(chalk.red("Error en el controlador: updateBooks"));
//     console.log();
//     console.log(error);
//     console.log();
//   }
// };

export { getBooks, createBooks, getBooksById, deleteBooks };

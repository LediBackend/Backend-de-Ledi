import { Request, Response } from "express";
import { PropBooks } from "../types/typesBooks";
import { formatter } from "../utils/textFormatter";
import { subirImagen } from "../utils/uploadCorverImage";
import { from } from "form-data";
import Book from "../models/books.model";
import chalk from "chalk";
import ContentBook from "../models/content.books.model";
import fs from "fs";
import path from "path";

const getBooks: (a: Request, b: Response) => void = async (req, res) => {
  try {
    const result = await Book.find();

    if (result.length === 0) return res.status(404).json({ msg: "no hay libros para mostrar " });

    res.status(200).json(result);
  } catch (error) {
    console.error(chalk.red("Error en el controlador: getBooks"));
  }
};

const createBooks: (a: Request, b: Response) => void = async (req, res) => {
  try {
    const files = req.files as { [key: string]: Express.Multer.File[] };
    const { title, author, descriptions, category, available, language, idUser }: PropBooks = req.body;

    const img = files.img[0];
    const file = files.file[0];

    console.log(file.path);
    console.log(img.path);

    if (!file) return res.status(400).json({ msg: "Faltan archivos de texto con el contenido del libro" });
    if (!img) return res.status(400).json({ msg: "Faltan archivos de la portada del libro " });

    const textFormat = formatter(title);
    const nameFormat = formatter(author);

    const BookExist = await Book.findOne({ title: textFormat, author: nameFormat });
    if (BookExist) return res.status(400).json({ msg: "El libro ya existe" });

    const result = await subirImagen(img.path);
    if (!result) return res.status(400).json({ msg: "Error al subir la imagen" });

    const newContentBook = new ContentBook({ path: file.path });

    const newBook = new Book({
      title: textFormat,
      author: nameFormat,
      descriptions,
      category,
      available,
      idUser,
      pathBooks: newContentBook._id,
      coverImage: {
        id_image: result.public_id,
        url_secura: result.secure_url,
      },
      language,
    });

    console.log(newBook);
    console.log(newContentBook);
  } catch (error) {
    console.log();
    console.error(chalk.red("Error en el controlador: createBooks"));
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
    res.status(500).json({
      msg: "Ocurrió un error al intentar eliminar el libro.",
      error: error instanceof Error ? error.message : error,
    });
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

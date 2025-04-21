import Book from "../models/books.model";
import { Request, Response } from "express";
import chalk from "chalk";
import ContentBook from "../models/content.books.model";

const getContentBooksById: (a: Request, b: Response) => void = async (req, res) => {
  try {
    const id: string = req.params.id;
    const book = await Book.findById(id).populate("pathBooks");
    if (!book) return res.status(404).json({ msg: "no hay libro para mostrar" });
    const content = book?.pathBooks;
    const contentBook = await ContentBook.findById(content);
    if (!contentBook) return res.status(404).json({ msg: "no hay contenido del libro" });

    res.sendFile(contentBook?.path);
  } catch (error) {
    console.log();
    console.error(chalk.red("Error en el controlador: getContainerBooksById"));
    console.log();
    console.log(error);
    console.log();
  }
};

export default getContentBooksById;

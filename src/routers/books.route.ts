import { Router } from "express";
import { createBooks, deleteBooks, getBooks, getBooksById } from "../controllers/Books.controller";

const routerBooks = Router();

routerBooks.get("/Books/getBooks", getBooks);
routerBooks.post("/Books/create", createBooks);
routerBooks.get("/Books/:id", getBooksById);
routerBooks.delete("/Books/delete/:id", deleteBooks);

export default routerBooks;

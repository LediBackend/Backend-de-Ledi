import { Router } from "express";
import { createBooks, deleteBooks, getBooks, getBooksById } from "../controllers/Books.controller";

const routerBooks = Router();

routerBooks.get("/Books", getBooks);
routerBooks.post("/Books", createBooks);
routerBooks.get("/Books/:id", getBooksById);
routerBooks.delete("/Books/:id", deleteBooks);

export default routerBooks;

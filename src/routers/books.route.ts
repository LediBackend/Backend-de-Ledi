import { Router } from "express";
import { createBooks, deleteBooks, getBooks, getBooksById } from "../controllers/Books.controller";
import upload from "../middleware/stotage";
const routerBooks = Router();

routerBooks.get("/Books", getBooks);
routerBooks.post(
  "/Books",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "img", maxCount: 1 },
  ]),
  createBooks
);
routerBooks.get("/Books/:id", getBooksById);
routerBooks.delete("/Books/delete/:id", deleteBooks);

export default routerBooks;

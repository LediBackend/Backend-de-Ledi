import { Router } from "express";
import getContentBooksById from "../controllers/ContentBooks.controller";

const routerContentBooks = Router();

routerContentBooks.get("/book/content/:id", getContentBooksById);

export default routerContentBooks;

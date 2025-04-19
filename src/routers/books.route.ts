import { Router } from "express";
import { createBooks, getBooks, getBooksById } from "../controllers/Books.controller";

const router = Router();

router.get("/Books", getBooks);
router.post("/Books", createBooks);
router.get("/Books/:id", getBooksById);

export default router;

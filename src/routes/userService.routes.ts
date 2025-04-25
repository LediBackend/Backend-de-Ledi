import { Router } from "express";
import { registerValidation } from "../validations/user.validations";

import { createUsers, getByEmail, getById } from "../controllers/user.controllers";

export const userRoutes = Router();

userRoutes.post("/register", registerValidation, createUsers);
userRoutes.get("/user/:id", getById);
userRoutes.post("/user/", getByEmail);

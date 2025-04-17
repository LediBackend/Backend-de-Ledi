import { Router } from "express";
import { createUsers } from "../controllers/user.controllers";

export const userRoutes = Router();

userRoutes.get("/user", createUsers);

import { Router } from "express";
import { validateUser } from "../validations/user.validations";

import { createUsers } from "../controllers/user.controllers";
import { checkValidationErrors } from "../middlewares/express-validator";

export const userRoutes = Router();

userRoutes.post("/user", createUsers);

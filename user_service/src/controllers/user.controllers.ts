import { UserService } from "../service/UserService";
import { Request, Response } from "express";
import { User } from "../types/UserTypes";

// initialize the user service
const userService = new UserService();
export const createUsers = (req: Request, res: Response) => {
    try {
        const users = req.body;
        const result = userService.createUser(users)
        if (!result) {
            console.log('yes')
        } else {
            console.log('User creation failed')
        }
        res.status(201).json({ message: "User created successfully", result });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "An error occurred", error });
    }
}
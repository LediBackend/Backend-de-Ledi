import { UserService } from "../service/UserService";
import { Request, Response } from "express";

// initialize the user service
const userService = new UserService();

export const createUsers = async (req: Request, res: Response) => {
    // try {
    //     const newUser = req.body;
    //     console.log(newUser);
    //     const result = await userService.createUser(newUser);

    //     res.status(201).json(result);
    // } catch (error) {

    //     res.status(500).json({ message: "An error occurred", error });
    // }
    const result = await userService.findUser();
    res.status(200).json(result);
}
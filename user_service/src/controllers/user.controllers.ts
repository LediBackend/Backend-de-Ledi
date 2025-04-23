import { UserService } from "../service/User.Service";
import { Request, Response } from "express";
import { save_user } from "../utils/authPost";
interface UserRequestParams {
    id: string;
}

// initialize the user service
const userService = new UserService();
export const createUsers = async (req: Request<UserRequestParams>, res: Response) => {
    try {
        const users = req.body;
        const findEmail = await userService.findByEmail(users.email);
        const findUser = await userService.findByUserName(users.userName)
        if (!findEmail && !findUser) {
            const result = await userService.createUser(users)
            res.status(201).json({ msg: "User create ", result })
        }
        if (findEmail) {
            res.status(302).json({ msg: 'the email is used' })
        }
        if (findUser) {
            res.status(302).json({ msg: 'the userName is used' })
        }




    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "An error occurred", error });
    }
}
export const getById = async (req: Request, res: Response) => {
    const userId = req.params.id;
    if (!userId) {
        res.status(400).json({ message: "User ID header is missing" });
        return;
    }
    const result = await userService.findByID(userId);
    if (!result) {
        res.status(401).json({ msg: 'the user not fund' })
    } else {
        console.log(result)
        res.status(200).json({ msg: 'the user', result })
    }
}
export const getByEmail = async (req: Request, res: Response) => {
    const email = req.body.email
    if (!email) {
        res.status(400).json({ message: "User ID header is missing" });
        return;
    }
    const result = await userService.findByEmail(email);
    if (!result) {
        res.status(401).json({ msg: 'the user not fund' })
    } else {
        console.log(result)
        res.status(200).json({ msg: 'the user', result })
    }

}

import { Request, Response } from "express";

type SendRecommendation = (req: Request, res: Response) => void;

export { SendRecommendation };

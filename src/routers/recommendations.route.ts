import { Router } from "express";
import { sendRecommendation } from "../controllers/recommendations.controller";

const routerRecommendations = Router();

routerRecommendations.get("/Recommendations", sendRecommendation);

export default routerRecommendations;

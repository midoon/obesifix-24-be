import express from "express";
import authMiddelware from "../middleware/jwt_middleware.js";
import { recomendationFood } from "../controller/ml_controller.js";

const mlRouter = express.Router();

mlRouter.get("/recomendation/:userId", authMiddelware, recomendationFood);
export default mlRouter;

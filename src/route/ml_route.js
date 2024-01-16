import express from "express";
import authMiddelware from "../middleware/jwt_middleware.js";

import {
  predictFoodNutrition,
  recomendationFood,
} from "../controller/ml_controller.js";
import upload from "../middleware/multer_middleware.js";
import errorFIleMiddleware from "../middleware/errorFile_middleware.js";

const mlRouter = express.Router();

mlRouter.get("/recomendation/:userId", authMiddelware, recomendationFood);
mlRouter.post(
  "/prediction",
  authMiddelware,
  upload.single("image"),
  errorFIleMiddleware,
  predictFoodNutrition
);
export default mlRouter;

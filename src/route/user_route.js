import express from "express";
import decodeTokenFirebase from "../middleware/firebase_middleware.js";
import { register } from "../controller/user_controller.js";
const userRouter = express.Router();

userRouter.post("/register", register);

export default userRouter;

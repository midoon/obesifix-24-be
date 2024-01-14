import express from "express";
import decodeTokenFirebase from "../middleware/firebase_middleware.js";
import { login, register } from "../controller/user_controller.js";
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login/authjwt", login);

export default userRouter;

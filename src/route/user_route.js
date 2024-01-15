import express from "express";
import decodeTokenFirebase from "../middleware/firebase_middleware.js";
import {
  getUser,
  login,
  loginWithGoogle,
  refresfhToken,
  register,
  updateUser,
} from "../controller/user_controller.js";
import authMiddelware from "../middleware/jwt_middleware.js";
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/refresh", refresfhToken);
userRouter.post("/login/authjwt", login);
userRouter.post("/login/google", decodeTokenFirebase, loginWithGoogle);
userRouter.get("/user/:userId", authMiddelware, getUser);
userRouter.put("/user/:userId", authMiddelware, updateUser);
export default userRouter;

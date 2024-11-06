import { Router } from "express";
import { handleUserLogin, handleUserSingup } from "../controllers/user";

const userRouter = Router();

userRouter.post("/", handleUserSingup);
userRouter.post("/login", handleUserLogin);

export default userRouter;

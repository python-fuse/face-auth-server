import authController from "../controllers/auth.controller";
import { Router } from "express";
import upload from "../middleware/uploadHandler";

const authRouter = Router();

authRouter.post("/register", upload.single("file"), authController.register);
authRouter.post("/login", upload.single("file"), authController.login);

export default authRouter;

import { Router } from "express";
import userController from "../controllers/user.controller";
import upload from "../middleware/uploadHandler";

const router = Router();
router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
router.post("/", upload.single("file"), userController.createUser);

router.post("/verify", upload.single("file"), userController.verifyUser);

router.delete("/:id", userController.deleteUser);

export default router;
